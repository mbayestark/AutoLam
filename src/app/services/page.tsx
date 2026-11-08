import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "../../components/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description: "Location courte et longue durée, chauffeur, transfert aéroport et solutions entreprise à Dakar.",
};

const services = [
  {
    icon: "🚗",
    title: "Location courte & longue durée",
    description: "Des véhicules adaptés à tous vos besoins, pour une journée, une semaine ou plus.",
  },
  {
    icon: "🧑‍✈️",
    title: "Service chauffeur",
    description: "Chauffeurs professionnels, ponctuels et discrets pour tous vos déplacements.",
  },
  {
    icon: "🏢",
    title: "Location entreprise & leasing",
    description: "Solutions sur-mesure pour les sociétés, avec facturation mensuelle et flotte dédiée.",
  },
  {
    icon: "✈️",
    title: "Transfert aéroport",
    description: "Accueil et transfert depuis/vers l'aéroport à toute heure, confort garanti.",
  },
  {
    icon: "🛠️",
    title: "Options & équipements",
    description: "GPS, siège enfant, kit camping, galerie de toit, et plus sur demande.",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 animate-fadein">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-8 text-center">Nos services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/booking" className="inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">
          Réserver un véhicule
        </Link>
      </div>
    </div>
  );
}
