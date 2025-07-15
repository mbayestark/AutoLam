import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-lg md:max-w-3xl mx-auto w-full px-2 sm:px-4 py-6 sm:py-10 animate-fadein">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-6 sm:mb-8 text-center">Contact & Agence</h1>
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8 border border-orange-100">
          <div className="mb-4">
            <div className="font-bold text-lg text-orange-700 mb-1">Adresse</div>
            <div>Médina Rue 19x28, en face agence nationale BCEAO, Centenaire</div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-lg text-orange-700 mb-1">Téléphone / WhatsApp</div>
            <a href="https://wa.me/221776510839" className="underline text-blue-700">+221 77 651 08 39</a>
          </div>
          <div className="mb-4">
            <div className="font-bold text-lg text-orange-700 mb-1">Email</div>
            <a href="mailto:contact@autolam.sn" className="underline text-blue-700">contact@autolam.sn</a>
          </div>
          <div>
            <div className="font-bold text-lg text-orange-700 mb-1">Horaires</div>
            <div>Lun-Sam: 8h-18h, Dim: 9h-16h</div>
          </div>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
