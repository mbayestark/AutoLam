"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, type CarModel } from "../lib/data";

export default function CarCard({ car }: { car: CarModel }) {
  const [photo, setPhoto] = useState(0);
  const current = car.photos[photo];
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-44 bg-gray-100">
        <Image
          src={current.src}
          alt={current.label ? `${car.name} ${current.label}` : car.name}
          fill
          sizes="(min-width: 640px) 320px, 240px"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="text-orange-700 font-bold text-lg">{car.name}</h3>
          <div className="text-xs text-gray-500 mb-2">{car.category}</div>
          {car.photos.length > 1 && (
            <div className="flex gap-2 mb-2" role="group" aria-label="Couleurs disponibles">
              {car.photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-pressed={i === photo}
                  className={`text-xs rounded-full border px-2.5 py-0.5 ${
                    i === photo ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-300 text-gray-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <ul className="text-sm text-gray-700 flex flex-wrap gap-x-3 gap-y-1">
            <li>{car.transmission}</li>
            <li>{car.seats} places</li>
            {car.ac && <li>Climatisation</li>}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-orange-700 text-sm">{formatPrice(car)}</span>
          <Link
            href={`/booking?car=${encodeURIComponent(car.name)}`}
            className="shrink-0 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm font-semibold"
          >
            Réserver
          </Link>
        </div>
      </div>
    </article>
  );
}
