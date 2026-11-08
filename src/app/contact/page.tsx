import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import { business } from "../../lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Adresse, horaires et contact WhatsApp d'Auto-Lam à Dakar.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8 sm:py-12 animate-fadein">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-8 text-center">Contact & agence</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <dl className="bg-white rounded-xl shadow-md p-6 border border-orange-100 space-y-4 text-gray-800">
          <div>
            <dt className="font-bold text-orange-700">Adresse</dt>
            <dd>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + ", Dakar")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-orange-300 hover:text-orange-700"
              >
                {business.address}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold text-orange-700">Téléphone / WhatsApp</dt>
            <dd className="flex flex-wrap gap-x-3">
              <a href={`tel:+${business.whatsapp}`} className="underline decoration-orange-300 hover:text-orange-700">
                {business.phoneDisplay}
              </a>
              <a href={`https://wa.me/${business.whatsapp}`} className="text-green-700 font-semibold hover:underline">
                WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold text-orange-700">Email</dt>
            <dd>
              <a href={`mailto:${business.email}`} className="underline decoration-orange-300 hover:text-orange-700">
                {business.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold text-orange-700">Horaires</dt>
            <dd>{business.hours}</dd>
          </div>
        </dl>
        <ContactForm />
      </div>
    </div>
  );
}
