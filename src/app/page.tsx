import Link from "next/link";
import Image from "next/image";
import BookingStepper from "../components/BookingStepper";
import { carModels, formatPrice } from "../lib/data";

const highlights = [
  { title: "Avec ou sans chauffeur", text: "Chauffeurs professionnels disponibles à la journée." },
  { title: "Livraison", text: "Centre-ville, aéroport AIBD et Petite-Côte." },
  { title: "Réservation WhatsApp", text: "Réponse rapide, sans paiement en ligne." },
];

export default function Home() {
  const featured = carModels.filter((c) => c.pricePerDay !== null).slice(0, 3);
  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-600 to-yellow-400 px-4 pt-12 pb-20 md:pt-20 md:pb-28 text-center">
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/assets/hero-poster.webp"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-orange-700/40 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto animate-fadein">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4 leading-tight">
            Louez votre voiture à Dakar en toute confiance
          </h1>
          <p className="text-lg md:text-xl text-white/95 mb-8">
            Flotte moderne, tarifs clairs, service local premium.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/fleet" className="rounded-full bg-white px-6 py-3 font-bold text-orange-700 shadow-lg hover:bg-orange-50">
              Découvrir la flotte
            </Link>
            <a href="#reserver" className="rounded-full border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10">
              Estimer un prix
            </a>
          </div>
        </div>
      </section>

      <section id="reserver" className="relative z-20 -mt-12 w-full max-w-2xl mx-auto px-4 scroll-mt-24">
        <div className="rounded-xl bg-white shadow-xl">
          <BookingStepper variant="compact" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-4 mt-12 grid gap-4 sm:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-xl bg-white border border-orange-100 p-5">
            <div className="font-bold text-orange-700 mb-1">{h.title}</div>
            <p className="text-sm text-gray-600">{h.text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto w-full px-4 mt-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quelques véhicules</h2>
          <Link href="/fleet" className="text-orange-700 font-semibold hover:underline">
            Toute la flotte →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((car) => (
            <Link
              key={car.name}
              href={`/booking?car=${encodeURIComponent(car.name)}`}
              className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="relative h-40">
                <Image src={car.photos[0].src} alt={car.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <div className="font-bold text-gray-800">{car.name}</div>
                <div className="text-sm text-orange-700 font-semibold">{formatPrice(car)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
