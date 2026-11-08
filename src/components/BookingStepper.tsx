"use client";

import React, { useEffect, useState } from "react";
import { carModels, chauffeurFeePerDay, deliveryLocations, findCar } from "../lib/data";
import {
  addDays,
  bookingMessage,
  computeQuote,
  formatDay,
  formatFCFA,
  toInputDate,
  openWhatsApp,
  whatsappUrl,
  type BookingForm,
} from "../lib/booking";

interface BookingStepperProps {
  initialCar?: string;
  /** "compact" is the home-page widget: no contact-details step. */
  variant?: "full" | "compact";
}

type StepKey = "dates" | "pickup" | "car" | "contact" | "summary";

const stepLabels: Record<StepKey, string> = {
  dates: "Dates",
  pickup: "Retrait ou livraison",
  car: "Véhicule",
  contact: "Vos coordonnées",
  summary: "Résumé",
};

function validate(step: StepKey, form: BookingForm, today: string): string | null {
  switch (step) {
    case "dates":
      if (!form.pickupDate || !form.dropoffDate) return "Choisissez vos dates de départ et de retour.";
      if (today && form.pickupDate < today) return "La date de départ ne peut pas être dans le passé.";
      if (form.dropoffDate <= form.pickupDate) return "La date de retour doit être après la date de départ.";
      return null;
    case "pickup":
      if (!form.pickupOption) return "Indiquez si vous récupérez la voiture ou si nous la livrons.";
      if (form.pickupOption === "delivery" && !form.deliveryLocation) return "Choisissez le lieu de livraison.";
      return null;
    case "car":
      return findCar(form.car) ? null : "Choisissez un véhicule.";
    case "contact":
      if (form.name.trim().length < 2) return "Indiquez votre nom.";
      if (form.phone.replace(/\D/g, "").length < 8) return "Indiquez un numéro de téléphone valide.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return "L'adresse email n'est pas valide.";
      return null;
    default:
      return null;
  }
}

export default function BookingStepper({ initialCar, variant = "full" }: BookingStepperProps) {
  const compact = variant === "compact";
  const steps: StepKey[] = compact
    ? ["dates", "pickup", "car", "summary"]
    : ["dates", "pickup", "car", "contact", "summary"];

  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({
    pickupDate: "",
    dropoffDate: "",
    pickupOption: "",
    deliveryLocation: "",
    car: findCar(initialCar)?.name ?? "",
    chauffeur: false,
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  // Computed after mount: the page is prerendered, so "today" must come from the visitor's clock.
  const [today, setToday] = useState("");
  useEffect(() => setToday(toInputDate(new Date())), []);
  const step = steps[stepIndex];
  const quote = computeQuote(form);
  const selectedCar = findCar(form.car);

  const update = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setError(null);
    setForm((f) => {
      const nextForm = { ...f, [key]: value };
      // Keep the return date valid when the departure date moves past it.
      if (key === "pickupDate" && nextForm.dropoffDate && nextForm.dropoffDate <= String(value)) {
        nextForm.dropoffDate = "";
      }
      return nextForm;
    });
  };

  const next = () => {
    const msg = validate(step, form, today);
    if (msg) return setError(msg);
    setError(null);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const back = () => {
    setError(null);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== "summary") return next();
    const firstInvalid = steps.findIndex((s) => validate(s, form, today));
    if (firstInvalid !== -1) {
      setStepIndex(firstInvalid);
      return setError(validate(steps[firstInvalid], form, today));
    }
    openWhatsApp(whatsappUrl(bookingMessage(form, quote)));
  };

  const labelCls = `font-semibold text-gray-700 flex flex-col gap-1.5 ${compact ? "text-sm" : ""}`;
  const showQuote = !!selectedCar && quote.days > 0;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white border border-orange-100 w-full ${
        compact ? "rounded-xl p-4 sm:p-5" : "rounded-2xl shadow-xl p-5 sm:p-8 mt-4"
      }`}
    >
      {/* Progress */}
      <ol className="flex gap-1.5 mb-4" aria-label="Étapes de la réservation">
        {steps.map((s, i) => (
          <li
            key={s}
            aria-current={i === stepIndex ? "step" : undefined}
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
              i <= stepIndex ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <span className="sr-only">{stepLabels[s]}</span>
          </li>
        ))}
      </ol>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className={`text-orange-700 font-extrabold uppercase tracking-wide ${compact ? "text-base" : "text-lg"}`}>
          {stepLabels[step]}
        </h2>
        <span className="text-xs text-gray-500">
          Étape {stepIndex + 1}/{steps.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {step === "dates" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelCls}>
              Date de départ
              <input
                type="date"
                className="input"
                value={form.pickupDate}
                min={today || undefined}
                onChange={(e) => update("pickupDate", e.target.value)}
              />
            </label>
            <label className={labelCls}>
              Date de retour
              <input
                type="date"
                className="input"
                value={form.dropoffDate}
                min={form.pickupDate ? addDays(form.pickupDate, 1) : today ? addDays(today, 1) : undefined}
                onChange={(e) => update("dropoffDate", e.target.value)}
              />
            </label>
          </div>
        )}

        {step === "pickup" && (
          <>
            <fieldset className="grid gap-2 sm:grid-cols-2">
              <legend className="sr-only">Retrait ou livraison</legend>
              {(
                [
                  { value: "pickup", label: "Retrait en agence", hint: "Médina, Dakar" },
                  { value: "delivery", label: "Livraison", hint: "Dakar, AIBD, Petite-Côte" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`choice ${form.pickupOption === opt.value ? "choice-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="pickupOption"
                    value={opt.value}
                    checked={form.pickupOption === opt.value}
                    onChange={() => update("pickupOption", opt.value)}
                    className="accent-orange-600"
                  />
                  <span>
                    <span className="block font-semibold text-gray-800">{opt.label}</span>
                    <span className="block text-xs text-gray-500">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            {form.pickupOption === "delivery" && (
              <label className={labelCls}>
                Lieu de livraison
                <select
                  className="input"
                  value={form.deliveryLocation}
                  onChange={(e) => update("deliveryLocation", e.target.value)}
                >
                  <option value="">Choisir…</option>
                  {deliveryLocations.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} (+{formatFCFA(loc.fee)})
                    </option>
                  ))}
                </select>
              </label>
            )}
          </>
        )}

        {step === "car" && (
          <>
            <label className={labelCls}>
              Véhicule souhaité
              <select className="input" value={form.car} onChange={(e) => update("car", e.target.value)}>
                <option value="">Choisir…</option>
                {carModels.map((car) => (
                  <option key={car.name} value={car.name}>
                    {car.name} — {car.pricePerDay ? `${formatFCFA(car.pricePerDay)}/jour` : "sur demande"}
                  </option>
                ))}
              </select>
            </label>
            {selectedCar?.chauffeurIncluded ? (
              <p className="text-sm text-gray-600 bg-orange-50 rounded-lg p-3">
                Ce véhicule est loué avec chauffeur, inclus dans le prix.
              </p>
            ) : (
              <label className="flex items-center gap-3 font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={form.chauffeur}
                  onChange={(e) => update("chauffeur", e.target.checked)}
                  className="accent-orange-600 w-5 h-5"
                />
                Ajouter un chauffeur (+{formatFCFA(chauffeurFeePerDay)}/jour)
              </label>
            )}
            {compact && (
              <label className={labelCls}>
                Commentaire (optionnel)
                <textarea
                  className="input"
                  rows={2}
                  value={form.comment}
                  onChange={(e) => update("comment", e.target.value)}
                  placeholder="Un besoin particulier, une adresse…"
                />
              </label>
            )}
          </>
        )}

        {step === "contact" && (
          <>
            <label className={labelCls}>
              Nom complet
              <input
                type="text"
                className="input"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Votre nom complet"
              />
            </label>
            <label className={labelCls}>
              Téléphone
              <input
                type="tel"
                className="input"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Ex : +221 77 123 45 67"
              />
            </label>
            <label className={labelCls}>
              Email (optionnel)
              <input
                type="email"
                className="input"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="votre@email.com"
              />
            </label>
            <label className={labelCls}>
              Commentaire (optionnel)
              <textarea
                className="input"
                rows={2}
                value={form.comment}
                onChange={(e) => update("comment", e.target.value)}
                placeholder="Un besoin particulier, une adresse…"
              />
            </label>
          </>
        )}

        {step === "summary" && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm text-gray-700">
            <dt className="font-semibold">Départ</dt>
            <dd>{formatDay(form.pickupDate)}</dd>
            <dt className="font-semibold">Retour</dt>
            <dd>{formatDay(form.dropoffDate)}</dd>
            <dt className="font-semibold">Remise</dt>
            <dd>{form.pickupOption === "delivery" ? `Livraison à ${form.deliveryLocation}` : "Retrait en agence"}</dd>
            <dt className="font-semibold">Véhicule</dt>
            <dd>{form.car || "-"}</dd>
            <dt className="font-semibold">Chauffeur</dt>
            <dd>{quote.chauffeurIncluded ? "Inclus" : form.chauffeur ? "Oui" : "Non"}</dd>
            {!compact && (
              <>
                <dt className="font-semibold">Nom</dt>
                <dd>{form.name}</dd>
                <dt className="font-semibold">Téléphone</dt>
                <dd>{form.phone}</dd>
                {form.email && (
                  <>
                    <dt className="font-semibold">Email</dt>
                    <dd>{form.email}</dd>
                  </>
                )}
              </>
            )}
            {form.comment && (
              <>
                <dt className="font-semibold">Commentaire</dt>
                <dd className="break-words">{form.comment}</dd>
              </>
            )}
          </dl>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </div>

      {/* Live price estimate */}
      {showQuote && (
        <div className="mt-5 rounded-lg bg-orange-50 border border-orange-100 p-3 sm:p-4 text-sm text-gray-700">
          {quote.onRequest ? (
            <p className="font-bold text-orange-700">
              Tarif sur demande : nous vous répondons rapidement sur WhatsApp.
            </p>
          ) : (
            <>
              <div className="flex justify-between">
                <span>
                  {quote.days} jour{quote.days > 1 ? "s" : ""} × {formatFCFA(selectedCar!.pricePerDay!)}
                </span>
                <span>{formatFCFA(quote.base)}</span>
              </div>
              {quote.chauffeur > 0 && (
                <div className="flex justify-between">
                  <span>Chauffeur</span>
                  <span>{formatFCFA(quote.chauffeur)}</span>
                </div>
              )}
              {quote.delivery > 0 && (
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{formatFCFA(quote.delivery)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-orange-700 text-base mt-1 pt-1 border-t border-orange-200">
                <span>Total estimé</span>
                <span>{formatFCFA(quote.total)}</span>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex gap-3 mt-6 justify-between">
        <button
          type="button"
          onClick={back}
          disabled={stepIndex === 0}
          className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Retour
        </button>
        {step === "summary" ? (
          <button key="submit" type="submit" className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700">
            Réserver via WhatsApp
          </button>
        ) : (
          <button key="next" type="button" onClick={next} className="px-5 py-2.5 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700">
            Suivant
          </button>
        )}
      </div>
    </form>
  );
}
