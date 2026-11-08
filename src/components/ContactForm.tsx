"use client";

import React, { useState } from "react";
import { openWhatsApp, whatsappUrl } from "../lib/booking";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(whatsappUrl(`Contact via le site Auto-Lam\nNom : ${form.name}\nMessage : ${form.message}`));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border border-orange-100">
      <h2 className="font-bold text-lg text-gray-800">Écrivez-nous</h2>
      <label className="font-semibold text-gray-700 flex flex-col gap-1.5">
        Nom
        <input type="text" name="name" autoComplete="name" value={form.name} onChange={handleChange} className="input" required placeholder="Votre nom" />
      </label>
      <label className="font-semibold text-gray-700 flex flex-col gap-1.5">
        Message
        <textarea name="message" value={form.message} onChange={handleChange} className="input" rows={4} required placeholder="Votre message" />
      </label>
      <button type="submit" className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700">
        Envoyer via WhatsApp
      </button>
    </form>
  );
}
