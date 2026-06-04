import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import SpecialitiesGrid from '@/components/sections/SpecialitiesGrid';
import WhyChooseNH from '@/components/sections/WhyChooseNH';
import ChairmanQuote from '@/components/sections/ChairmanQuote';
import PatientReviews from '@/components/sections/PatientReviews';
import ProceduresSection from '@/components/sections/ProceduresSection';
import HealthPackages from '@/components/sections/HealthPackages';
import CuratedExperiences from '@/components/sections/CuratedExperiences';
import AppDownloadBanner from '@/components/sections/AppDownloadBanner';

export const metadata: Metadata = {
  title: 'Narayana Health — Trusted Care, Every Day',
  description: 'India\'s leading hospital network. 24+ hospitals, 30+ specialities, 2.5M+ patients treated. Book appointments with top doctors across Bangalore, Delhi, Kolkata and more.',
  alternates: { canonical: 'https://www.narayanahealth.org' },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — scroll-pinned zoom from hospital to patient at home */}
      <HeroSection />

      {/* 3. Specialities Grid — 5-col, hover blue fill */}
      <SpecialitiesGrid />

      {/* 8. Health Packages — carousel */}
      <HealthPackages />

      {/* Curated Experiences */}
      <CuratedExperiences />

      {/* 7. Procedures — accent bar list, sticky label */}
      <ProceduresSection />

      {/* 4. Why Choose NH */}
      <WhyChooseNH />

      {/* Chairman Quote */}
      <ChairmanQuote />

      {/* Patient Reviews Carousel */}
      <PatientReviews />

      {/* 12. App Download Banner — badge hover effects */}
      <AppDownloadBanner />
    </>
  );
}
