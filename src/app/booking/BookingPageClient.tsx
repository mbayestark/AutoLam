"use client";
import { useSearchParams } from "next/navigation";
import BookingStepper from "../../components/BookingStepper";
import React from "react";

export default function BookingPageClient() {
  const searchParams = useSearchParams();
  const car = searchParams.get("car") || "";
  return <BookingStepper initialCar={car} />;
} 
