"use client";

import HeroSection from "@/features/landing-page/HeroSection";
import AboutSection from "@/features/landing-page/AboutSection";
import ProgramsSection from "@/features/landing-page/ProgramsSection";
import GallerySection from "@/features/landing-page/GallerySection";
import LocationSection from "@/features/landing-page/LocationSection";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <GallerySection />
      <LocationSection />
      <ScrollToTopButton />
    </main>
  );
}
