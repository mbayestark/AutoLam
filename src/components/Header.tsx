import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-white shadow-md py-3 px-4 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/assets/LOGO.jpg" alt="Auto-Lam Logo" height={40} width={40} className="h-10 w-auto rounded" />
        </Link>
      </div>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        aria-label="Ouvrir le menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`block w-6 h-0.5 bg-orange-700 mb-1 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-orange-700 mb-1 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-orange-700 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      {/* Nav links */}
      <nav
        className={`
          flex-col gap-4 text-gray-700 font-medium absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300
          ${menuOpen ? 'flex' : 'hidden'}
          md:static md:flex md:flex-row md:gap-6 md:shadow-none md:bg-transparent md:p-0 md:rounded-none md:items-center
        `}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
        <Link href="/fleet" onClick={() => setMenuOpen(false)}>Flotte</Link>
        <Link href="/booking" onClick={() => setMenuOpen(false)}>Réservation</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
      {/* Overlay for closing menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
