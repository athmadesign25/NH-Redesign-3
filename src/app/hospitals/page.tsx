import type { Metadata } from 'next';
import HospitalsGrid from '@/components/sections/HospitalsGrid';

export const metadata: Metadata = {
  title: 'Hospitals & Clinics — Narayana Health',
  description: 'Find Narayana Health hospitals and clinics near you. World-class care across 24+ locations.',
};

export default function HospitalsPage() {
  return (
    <main style={{ minHeight: '80vh', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <HospitalsGrid />
    </main>
  );
}
