import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarCard from "../../components/CarCard";
import React from "react";

interface Car {
  image: string;
  name: string;
  category: string;
  transmission: string;
  seats: number;
  ac: boolean;
  price: string;
}

const cars: Car[] = [
  {
    image: "/assets/CarPics/LC300.jpg",
    name: "Toyota LC 300",
    category: "Luxe",
    transmission: "Automatique",
    seats: 6,
    ac: true,
    price: "300 000 FCFA/jour + Chauffeur",
  },
  {
    image: "/assets/CarPics/WhiteRange.jpg",
    name: "Range Rover",
    category: "Luxe",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    price: "300 000 FCFA/jour + Chauffeur",
  },
  {
    image: "/assets/CarPics/BlackRange.jpg",
    name: "Range Rover",
    category: "Luxe",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    price: "300 000 FCFA/jour + Chauffeur",
  },
  {
    image: "/assets/CarPics/Kia.png",
    name: "Kia Sportage",
    category: "SUV",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    price: "55 000 FCFA/jour",
  },
  {
    image: "/assets/CarPics/patrol.jpg",
    name: "Nissan Patrol",
    category: "SUV",
    transmission: "Automatique",
    seats: 7,
    ac: true,
    price: "Sur demande",
  },
  {
    image: "/assets/CarPics/mitL200b.png",
    name: "Mitsubishi L200 (Blanc)",
    category: "Pick-up",
    transmission: "Manuelle",
    seats: 5,
    ac: true,
    price: "60 000 FCFA/jour",
  },
  {
    image: "/assets/CarPics/mitL200g.png",
    name: "Mitsubishi L200 (Gris)",
    category: "Pick-up",
    transmission: "Manuelle",
    seats: 5,
    ac: true,
    price: "60 000 FCFA/jour",
  },
  {
    image: "/assets/CarPics/tacoma.jpg",
    name: "Toyota Tacoma",
    category: "Pick-up",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    price: "100 000 FCFA/jour",
  },
  {
    image: "/assets/CarPics/FordRanger.png",
    name: "Ford Ranger",
    category: "Pick-up",
    transmission: "Automatique",
    seats: 5,
    ac: true,
    price: "60 000 FCFA/jour",
  },
  {
    image: "/assets/CarPics/pajero.png",
    name: "Mitsubishi Pajero",
    category: "SUV",
    transmission: "Automatique",
    seats: 7,
    ac: true,
    price: "90 000 FCFA/jour",
  },
];

const categories = [
  { key: "Luxe", label: "Luxe & Premium", filter: (c: Car) => c.category.toLowerCase().includes("luxe") },
  { key: "SUV", label: "SUV", filter: (c: Car) => c.category.toLowerCase().includes("suv") },
  { key: "Pick-up", label: "Pick-ups & 4x4", filter: (c: Car) => c.category.toLowerCase().includes("pick-up") || c.category.toLowerCase().includes("4x4") },
];

export default function FleetPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-6 sm:py-10 animate-fadein">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-6 sm:mb-8 text-center">Notre Flotte de Véhicules</h1>
        <div className="flex flex-col gap-8 sm:gap-12">
          {categories.map((cat) => {
            const filtered = cars.filter(cat.filter);
            if (!filtered.length) return null;
            return (
              <section key={cat.key}>
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4 pl-1 sm:pl-2">{cat.label}</h2>
                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-4 hide-scrollbar">
                  {filtered.map((car, idx) => (
                    <div
                      key={idx}
                      className="min-w-[220px] sm:min-w-[300px] max-w-[320px] flex-shrink-0 opacity-0 translate-y-8 animate-fadein"
                      style={{ animationDelay: `${idx * 120}ms` }}
                    >
                      <CarCard {...car} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
