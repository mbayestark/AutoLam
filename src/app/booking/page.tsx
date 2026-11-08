import type { Metadata } from "next";
import BookingStepper from "../../components/BookingStepper";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre véhicule en quelques étapes et recevez la confirmation sur WhatsApp.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ car?: string | string[] }>;
}) {
  const { car } = await searchParams;
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8 sm:py-12 animate-fadein">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-2 text-center">Réservez votre véhicule</h1>
      <p className="text-center text-gray-600 mb-4">
        Aucun paiement en ligne : votre demande nous est envoyée sur WhatsApp et nous confirmons la disponibilité.
      </p>
      <BookingStepper initialCar={typeof car === "string" ? car : undefined} />
    </div>
  );
}
