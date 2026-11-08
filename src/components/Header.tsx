"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/fleet", label: "Flotte" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" aria-label="Auto-Lam, accueil">
          <Image src="/assets/LOGO.jpg" alt="Auto-Lam" height={40} width={92} className="h-10 w-auto rounded" priority />
        </Link>

        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block w-6 h-0.5 bg-orange-700 mb-1 transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-orange-700 mb-1 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-orange-700 transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>

        <nav
          id="main-nav"
          className={`${menuOpen ? "flex" : "hidden"} absolute right-4 top-16 z-50 flex-col gap-1 rounded-lg bg-white p-3 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-1 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 font-medium transition-colors ${
                  active ? "text-orange-700 bg-orange-50" : "text-gray-700 hover:text-orange-700"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/booking"
            className="mt-1 rounded-full bg-orange-600 px-4 py-2 text-center font-semibold text-white hover:bg-orange-700 md:mt-0 md:ml-2"
          >
            Réserver
          </Link>
        </nav>
      </div>
      {menuOpen && <div className="fixed inset-0 -z-10 md:hidden" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
