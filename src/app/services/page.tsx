import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-2 sm:px-4 py-6 sm:py-10 animate-fadein">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-6 sm:mb-8 text-center">Nos Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
