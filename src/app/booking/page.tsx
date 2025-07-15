import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BookingPageClient from "./BookingPageClient";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-xl md:max-w-2xl mx-auto w-full px-2 sm:px-4 py-6 sm:py-10 animate-fadein">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-6 sm:mb-8 text-center">Réservez votre véhicule</h1>
        <BookingPageClient />
      </main>
      <Footer />
    </div>
  );
}
