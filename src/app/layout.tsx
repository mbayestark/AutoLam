import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the production domain so social previews resolve correctly.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Auto-Lam | Location de voitures à Dakar",
    template: "%s | Auto-Lam",
  },
  description:
    "Location de voitures à Dakar : 4x4, SUV, pick-ups et véhicules de luxe, avec ou sans chauffeur. Livraison à l'aéroport AIBD et sur la Petite-Côte. Réservation rapide via WhatsApp.",
  openGraph: {
    title: "Auto-Lam | Location de voitures à Dakar",
    description: "Flotte moderne, tarifs clairs, réservation via WhatsApp.",
    locale: "fr_SN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Toyota Land Cruiser 300, Auto-Lam" }],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
