import Link from "next/link";
import { business } from "../lib/data";

export default function Footer() {
  return (
    <footer className="w-full bg-orange-700 text-white pt-8 pb-24 sm:pb-8 px-4 mt-12">
      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-bold text-lg mb-1">{business.name}</div>
          <p className="opacity-90">Location de voitures à Dakar, avec ou sans chauffeur.</p>
        </div>
        <address className="not-italic space-y-1 opacity-90">
          <div>{business.address}</div>
          <div>
            Tél/WhatsApp :{" "}
            <a href={`https://wa.me/${business.whatsapp}`} className="underline hover:text-orange-100">
              {business.phoneDisplay}
            </a>
          </div>
          <div>{business.hours}</div>
        </address>
        <nav aria-label="Liens du pied de page" className="flex flex-col gap-1 sm:items-end">
          <Link href="/fleet" className="hover:underline">Notre flotte</Link>
          <Link href="/booking" className="hover:underline">Réserver</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
      <div className="max-w-5xl mx-auto mt-6 text-xs opacity-75 text-center sm:text-left">
        © {new Date().getFullYear()} {business.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
