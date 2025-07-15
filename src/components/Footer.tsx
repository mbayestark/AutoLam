import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-orange-700 text-white py-6 px-4 mt-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="font-bold text-lg">AUTO-LAM</div>
          <div className="text-sm">Médina Rue 19x28, en face agence nationale BCEAO, Centenaire</div>
          <div className="text-sm">Tél/WhatsApp: <a href="https://wa.me/221781194929" className="underline">+221 781194929</a></div>
        </div>
        <div className="text-center md:text-right text-xs opacity-80">
          © {new Date().getFullYear()} AUTO-LAM. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
