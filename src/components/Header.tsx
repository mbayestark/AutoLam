import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <img src="/assets/LOGO.jpg" alt="Auto-Lam Logo" className="h-10 w-auto rounded" />
        </Link>
      </div>
      <nav className="flex gap-6 text-gray-700 font-medium">
        <Link href="/">Accueil</Link>
        <Link href="/fleet">Flotte</Link>
        <Link href="/booking">Réservation</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
