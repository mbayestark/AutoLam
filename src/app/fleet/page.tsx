import type { Metadata } from "next";
import CarCard from "../../components/CarCard";
import { carModels, categories } from "../../lib/data";

export const metadata: Metadata = {
  title: "Notre flotte",
  description: "4x4, SUV, pick-ups et véhicules de luxe à louer à Dakar, avec tarifs à la journée.",
};

export default function FleetPage() {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 animate-fadein">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-8 text-center">Notre flotte de véhicules</h1>
      <div className="flex flex-col gap-10">
        {categories.map((cat) => {
          const cars = carModels.filter((c) => c.category === cat.key);
          if (!cars.length) return null;
          return (
            <section key={cat.key}>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">{cat.label}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <CarCard key={car.name} car={car} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
