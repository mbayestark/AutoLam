import React from "react";
import Link from "next/link";

interface CarCardProps {
  image: string;
  name: string;
  category: string;
  transmission: string;
  seats: number;
  ac: boolean;
  price: string;
}

export default function CarCard({ image, name, category, transmission, seats, ac, price }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-orange-700 font-bold text-lg mb-1">{name}</div>
          <div className="text-xs text-gray-500 mb-2">{category}</div>
          <ul className="text-sm text-gray-700 mb-2">
            <li>Transmission: {transmission}</li>
            <li>Sièges: {seats}</li>
            <li>Climatisation: {ac ? "Oui" : "Non"}</li>
          </ul>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-orange-700 text-lg">{price}</span>
          <Link href={`/booking?car=${encodeURIComponent(name)}`} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm font-semibold">
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}
