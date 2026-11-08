import { chauffeurFeePerDay, deliveryLocations, findCar, business } from "./data";

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/** Parses a YYYY-MM-DD input value as a local calendar date. */
function parseDay(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

export function toInputDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(value: string, days: number): string {
  const d = parseDay(value) ?? new Date();
  d.setDate(d.getDate() + days);
  return toInputDate(d);
}

export function formatDay(value: string): string {
  const d = parseDay(value);
  return d
    ? d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : "-";
}

/** Number of rental days (at least 1), or 0 if the range is invalid. */
export function rentalDays(start: string, end: string): number {
  const a = parseDay(start);
  const b = parseDay(end);
  if (!a || !b) return 0;
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return diff < 0 ? 0 : Math.max(diff, 1);
}

export interface BookingForm {
  pickupDate: string;
  dropoffDate: string;
  pickupOption: "" | "pickup" | "delivery";
  deliveryLocation: string;
  car: string;
  chauffeur: boolean;
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface Quote {
  days: number;
  base: number;
  chauffeur: number;
  delivery: number;
  total: number;
  /** True if the selected car has no public price. */
  onRequest: boolean;
  chauffeurIncluded: boolean;
}

export function computeQuote(form: BookingForm): Quote {
  const car = findCar(form.car);
  const days = rentalDays(form.pickupDate, form.dropoffDate);
  const price = car?.pricePerDay ?? 0;
  const chauffeurIncluded = !!car?.chauffeurIncluded;
  const base = days * price;
  const chauffeur = form.chauffeur && !chauffeurIncluded ? days * chauffeurFeePerDay : 0;
  const delivery =
    form.pickupOption === "delivery"
      ? deliveryLocations.find((l) => l.name === form.deliveryLocation)?.fee ?? 0
      : 0;
  return {
    days,
    base,
    chauffeur,
    delivery,
    total: base + chauffeur + delivery,
    onRequest: !!car && car.pricePerDay === null,
    chauffeurIncluded,
  };
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function bookingMessage(form: BookingForm, quote: Quote): string {
  const lines = [
    "Nouvelle réservation Auto-Lam",
    `Dates : ${formatDay(form.pickupDate)} → ${formatDay(form.dropoffDate)} (${quote.days} jour${quote.days > 1 ? "s" : ""})`,
    form.pickupOption === "delivery" ? `Livraison à : ${form.deliveryLocation}` : "Retrait en agence",
    `Véhicule : ${form.car}`,
    `Chauffeur : ${quote.chauffeurIncluded ? "Inclus" : form.chauffeur ? "Oui" : "Non"}`,
  ];
  if (form.name) lines.push(`Nom : ${form.name}`);
  if (form.phone) lines.push(`Téléphone : ${form.phone}`);
  if (form.email) lines.push(`Email : ${form.email}`);
  if (form.comment) lines.push(`Commentaire : ${form.comment}`);
  lines.push(`Prix estimé : ${quote.onRequest ? "sur demande" : formatFCFA(quote.total)}`);
  return lines.join("\n");
}

/** Opens WhatsApp in a new tab, or in the current tab if popups are blocked. */
export function openWhatsApp(url: string): void {
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}
