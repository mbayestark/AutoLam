"use client";
import React, { useState } from "react";

const steps = ["Dates", "Retrait ou Livraison", "Véhicule", "Chauffeur", "Résumé"];
const cars = [
  "Toyota LC 300",
  "Range Rover",
  "Kia Sportage",
  "Nissan Patrol",
  "Mitsubishi L200",
  "Toyota Tacoma",
  "Ford Ranger",
  "Mitsubishi Pajero",
];
const carPrices: Record<string, number> = {
  "Toyota LC 300": 300000,
  "Range Rover": 300000,
  "Kia Sportage": 75000,
  "Nissan Patrol": 120000,
  "Mitsubishi L200": 60000,
  "Toyota Tacoma": 100000,
  "Ford Ranger": 60000,
  "Mitsubishi Pajero": 90000,
};
const chauffeurFee = 10000; // per day
const luxuryCars = ["Toyota LC 300", "Range Rover"];
const pickupOptions = [
  { value: "pickup", label: "Je viens récupérer la voiture" },
  { value: "delivery", label: "Livraison à" },
];
const deliveryLocations = [
  "Centre-ville Dakar",
  "Aéroport Blaise Diagne",
  "Saly-Ngaparou-Somone",
];
const deliveryFees: Record<string, number> = {
  "Centre-ville Dakar": 4000,
  "Aéroport Blaise Diagne": 7000,
  "Saly-Ngaparou-Somone": 10000,
};

function getDays(start: string, end: string) {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = d2.getTime() - d1.getTime();
  if (isNaN(diff) || diff < 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
}

export default function QuickBookingWidget() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pickupDate: "",
    dropoffDate: "",
    pickupOption: "",
    deliveryLocation: "",
    car: "",
    chauffeur: false,
    comment: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Price calculation
  const days = getDays(form.pickupDate, form.dropoffDate);
  const dailyPrice = carPrices[form.car] || 0;
  const isLuxury = luxuryCars.includes(form.car);
  const base = days * dailyPrice;
  const chauffeur = form.chauffeur && !isLuxury ? days * chauffeurFee : 0;
  const deliveryFee = form.pickupOption === "delivery" ? (deliveryFees[form.deliveryLocation] || 0) : 0;
  const total = base + chauffeur + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "221761858766";
    let pickupMsg = "";
    if (form.pickupOption === "pickup") {
      pickupMsg = "Retrait agence";
    } else if (form.pickupOption === "delivery") {
      pickupMsg = `Livraison à: ${form.deliveryLocation}`;
    }
    const message = encodeURIComponent(
      `Réservation rapide Auto-Lam\n` +
      `Dates: ${form.pickupDate} → ${form.dropoffDate}\n` +
      `${pickupMsg}\n` +
      `Véhicule: ${form.car}\n` +
      `Chauffeur: ${form.chauffeur ? "Oui" : "Non"}\n` +
      (form.comment ? `Commentaire: ${form.comment}\n` : "") +
      `Prix total: ${(total ? total.toLocaleString("fr-FR") : "-")} FCFA`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 border border-orange-100 w-full">
      <div className="flex items-center mb-2 gap-1">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex-1 h-1 rounded-full ${i <= step ? "bg-orange-500" : "bg-gray-200"}`}></div>
            {i < steps.length - 1 && <div className="w-1" />}
          </React.Fragment>
        ))}
      </div>
      <div className="mb-2 text-orange-700 font-bold text-base text-center uppercase tracking-wide">{steps[step]}</div>
      <div className="space-y-3">
        {step === 0 && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
              Date de départ
              <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} className="input" required />
            </label>
            <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
              Date de retour
              <input type="date" name="dropoffDate" value={form.dropoffDate} onChange={handleChange} className="input" required />
            </label>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
              Retrait ou Livraison
              <select name="pickupOption" value={form.pickupOption} onChange={handleChange} className="input" required>
                <option value="">Choisir...</option>
                {pickupOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </label>
            {form.pickupOption === "delivery" && (
              <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
                Lieu de livraison
                <select name="deliveryLocation" value={form.deliveryLocation} onChange={handleChange} className="input" required>
                  <option value="">Choisir...</option>
                  {deliveryLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </label>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
              Véhicule souhaité
              <select name="car" value={form.car} onChange={handleChange} className="input" required>
                <option value="">Choisir...</option>
                {cars.map((car) => <option key={car} value={car}>{car}</option>)}
              </select>
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-medium text-gray-800 text-sm">
              <input type="checkbox" name="chauffeur" checked={form.chauffeur} onChange={handleChange} className="accent-orange-600 w-4 h-4" />
              Ajouter un chauffeur
            </label>
            <label className="font-medium text-gray-800 flex flex-col gap-1 text-sm">
              Commentaire (optionnel)
              <textarea name="comment" value={form.comment} onChange={handleChange} className="input" rows={2} placeholder="Précisez un besoin particulier, une adresse, etc." />
            </label>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col gap-1 text-gray-800 text-sm bg-orange-50 rounded p-3 border border-orange-100">
            <div><b>Dates:</b> {form.pickupDate} → {form.dropoffDate}</div>
            <div><b>Retrait/Livraison:</b> {form.pickupOption === "pickup" ? "Retrait agence" : form.pickupOption === "delivery" ? `Livraison à: ${form.deliveryLocation}` : "-"}</div>
            <div><b>Véhicule:</b> {form.car}</div>
            <div><b>Chauffeur:</b> {form.chauffeur ? "Oui" : "Non"}</div>
            {form.comment && <div><b>Commentaire:</b> {form.comment}</div>}
            {form.pickupOption === "delivery" && (
              <div className="text-xs text-gray-500">Frais de livraison: {deliveryFee.toLocaleString("fr-FR")} FCFA</div>
            )}
          </div>
        )}
      </div>
      {/* Price summary always visible if car and dates are selected */}
      {(form.car && form.pickupDate && form.dropoffDate) && (
        <div className="flex flex-col gap-1 text-gray-800 text-sm bg-orange-50 rounded p-3 border border-orange-100 mt-2">
          {form.pickupOption === "delivery" && deliveryFee > 0 && (
            <div className="text-xs text-gray-500">Frais de livraison: {deliveryFee.toLocaleString("fr-FR")} FCFA</div>
          )}
          <div className="mt-2 font-bold text-orange-700 text-base">
            Prix total: {total ? total.toLocaleString("fr-FR") + " FCFA" : "-"}
          </div>
          {form.chauffeur && !isLuxury ? (
            <div className="text-xs text-gray-500">(Chauffeur: {chauffeurFee.toLocaleString("fr-FR")} FCFA/jour)</div>
          ) : null}
        </div>
      )}
      <div className="flex gap-2 mt-4 justify-between">
        <button type="button" onClick={back} disabled={step === 0} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 hover:bg-gray-300 transition text-sm">Retour</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 transition text-sm">Suivant</button>
        ) : (
          <button type="submit" className="px-4 py-2 rounded bg-orange-700 text-white font-bold hover:bg-orange-800 transition text-sm">Réserver</button>
        )}
      </div>
      <style>{`
        .input { @apply mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 px-2 py-1 text-sm transition bg-white; }
      `}</style>
    </form>
  );
} 
