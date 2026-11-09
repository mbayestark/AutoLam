// Single source of truth for business info, fleet and pricing.
// Edit values here and every page (fleet, booking, contact, footer) stays in sync.

export const business = {
  name: "AUTO-LAM",
  whatsapp: "221761858766", // international format, no "+"
  phoneDisplay: "+221 76 185 87 66",
  email: "contact@autolam.sn",
  address: "Médina Rue 19x28, en face agence nationale BCEAO, Centenaire",
  hours: "Lun-Sam : 8h-18h, Dim : 9h-16h",
};

export type Category = "Luxe" | "SUV" | "Pick-up";

export interface CarModel {
  /** Name used in bookings and WhatsApp messages. */
  name: string;
  category: Category;
  transmission: "Automatique" | "Manuelle";
  seats: number;
  ac: boolean;
  /** Daily price in FCFA. `null` means price on request. */
  pricePerDay: number | null;
  /** Luxury models are always rented with a chauffeur, included in the price. */
  chauffeurIncluded?: boolean;
  /** One photo per available colour/variant. */
  photos: { src: string; label?: string }[];
}

export const carModels: CarModel[] = [
  {
    name: "Toyota LC 300",
    category: "Luxe",
    transmission: "Automatique",
    seats: 6,
    ac: true,
    pricePerDay: 300000,
    chauffeurIncluded: true,
    photos: [{ src: "/assets/CarPics/lc300.webp" }],
  },
  {
    name: "Range Rover",
    category: "Luxe",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    pricePerDay: 300000,
    chauffeurIncluded: true,
    photos: [
      { src: "/assets/CarPics/range-rover-blanc.webp", label: "Blanc" },
      { src: "/assets/CarPics/range-rover-noir.webp", label: "Noir" },
    ],
  },
  {
    name: "Kia Sportage",
    category: "SUV",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    pricePerDay: 55000,
    photos: [{ src: "/assets/CarPics/kia-sportage.webp" }],
  },
  {
    name: "Nissan Patrol",
    category: "SUV",
    transmission: "Automatique",
    seats: 7,
    ac: true,
    pricePerDay: null,
    photos: [{ src: "/assets/CarPics/nissan-patrol.webp" }],
  },
  {
    name: "Mitsubishi Pajero",
    category: "SUV",
    transmission: "Automatique",
    seats: 7,
    ac: true,
    pricePerDay: 90000,
    photos: [{ src: "/assets/CarPics/mitsubishi-pajero.webp" }],
  },
  {
    name: "Mitsubishi L200",
    category: "Pick-up",
    transmission: "Manuelle",
    seats: 5,
    ac: true,
    pricePerDay: 60000,
    photos: [
      { src: "/assets/CarPics/l200-blanc.webp", label: "Blanc" },
      { src: "/assets/CarPics/l200-gris.webp", label: "Gris" },
    ],
  },
  {
    name: "Toyota Tacoma",
    category: "Pick-up",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    pricePerDay: 100000,
    photos: [{ src: "/assets/CarPics/toyota-tacoma.webp" }],
  },
  {
    name: "Ford Ranger",
    category: "Pick-up",
    transmission: "Manuelle",
    seats: 5,
    ac: true,
    pricePerDay: 60000,
    photos: [{ src: "/assets/CarPics/ford-ranger.webp" }],
  },
];

export const categories: { key: Category; label: string }[] = [
  { key: "Luxe", label: "Luxe & Premium" },
  { key: "SUV", label: "SUV" },
  { key: "Pick-up", label: "Pick-ups & 4x4" },
];

/** Chauffeur fee per day, in FCFA (not charged on luxury models). */
export const chauffeurFeePerDay = 10000;

/** One-off delivery fee per location, in FCFA. */
export const deliveryLocations: { name: string; fee: number }[] = [
  { name: "Centre-ville Dakar", fee: 4000 },
  { name: "Aéroport Blaise Diagne", fee: 7000 },
  { name: "Saly-Ngaparou-Somone", fee: 10000 },
];

export function findCar(name: string | null | undefined): CarModel | undefined {
  if (!name) return undefined;
  // Accept legacy links such as "Mitsubishi L200 (Blanc)".
  const base = name.replace(/\s*\(.*\)\s*$/, "").trim().toLowerCase();
  return carModels.find((c) => c.name.toLowerCase() === base);
}

export function formatPrice(car: CarModel): string {
  if (car.pricePerDay === null) return "Prix sur demande";
  const price = `${car.pricePerDay.toLocaleString("fr-FR")} FCFA/jour`;
  return car.chauffeurIncluded ? `${price}, chauffeur inclus` : price;
}
