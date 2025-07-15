"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "221776510839";
    const text = encodeURIComponent(
      `Contact via site Auto-Lam\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border border-orange-100">
      <label className="font-semibold text-black-900 flex flex-col gap-2">
        Nom
        <input type="text" name="name" value={form.name} onChange={handleChange} className="input placeholder-gray-700" required placeholder="Votre nom" />
      </label>
      <label className="font-semibold text-black-900 flex flex-col gap-2">
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input placeholder-gray-700" required placeholder="votre@email.com" />
      </label>
      <label className="font-semibold text-black-900 flex flex-col gap-2">
        Message
        <textarea name="message" value={form.message} onChange={handleChange} className="input placeholder-gray-700" rows={3} required placeholder="Votre message" />
      </label>
      <button type="submit" className="px-6 py-3 rounded-lg bg-orange-700 text-white font-bold hover:bg-orange-800 transition mt-2">Envoyer via WhatsApp</button>
      <style>{`
        .input { @apply mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 px-3 py-2 text-base transition bg-white; }
      `}</style>
    </form>
  );
}
