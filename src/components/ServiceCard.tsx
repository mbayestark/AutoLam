import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center gap-3 border border-orange-100 hover:shadow-lg transition">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="font-bold text-orange-700 text-lg mb-1">{title}</div>
      <div className="text-gray-800 text-sm">{description}</div>
    </div>
  );
}
