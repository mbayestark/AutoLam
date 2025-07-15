import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickBookingWidget from "../components/QuickBookingWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center animate-fadein">
        <section className="w-full bg-gradient-to-br from-orange-600 to-yellow-400 py-12 md:py-16 px-2 sm:px-4 flex flex-col items-center text-center relative">
          <video autoPlay muted playsInline loop className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none">
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 w-full h-full bg-orange-600/40 z-0 pointer-events-none" />
          <div className="relative z-10 max-w-lg md:max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4 leading-tight">Louez votre voiture à Dakar en toute confiance</h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-8">Flotte moderne, tarifs imbattables, service local premium.</p>
            <a href="/fleet" className="inline-block bg-white text-orange-700 font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-orange-100 transition">Découvrez notre flotte</a>
          </div>
        </section>
        <section className="w-full max-w-lg md:max-w-2xl mx-auto bg-white rounded-lg shadow p-4 sm:p-6 mt-[-40px] z-20 relative">
          <QuickBookingWidget />
        </section>
      </main>
      <Footer />
    </div>
  );
}
