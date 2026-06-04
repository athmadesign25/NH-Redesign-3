'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { hospitals } from '@/lib/data';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';
import { MapPin, ChevronRight, Award } from 'lucide-react';

// Placeholder hospital colors (gradient per city)
const cityGradients: Record<string, string> = {
  'Bengaluru': 'linear-gradient(135deg, #034EA2 0%, #023070 100%)',
  'Gurugram': 'linear-gradient(135deg, #1B5AAD 0%, #034EA2 100%)',
  'Kolkata': 'linear-gradient(135deg, #023070 0%, #011D48 100%)',
  'Jamshedpur': 'linear-gradient(135deg, #034EA2 0%, #1B5AAD 100%)',
  'Grand Cayman': 'linear-gradient(135deg, #0369a1 0%, #034EA2 100%)',
};

function HospitalCard({ hospital }: { hospital: typeof hospitals[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 32px rgba(3, 78, 162, 0.15)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Image / Gradient placeholder */}
      <div style={{
        height: '180px',
        background: cityGradients[hospital.city] || 'var(--nh-blue)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'var(--space-4)',
      }}>
        {hospital.image && (
          <Image
            src={hospital.image}
            alt={hospital.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
        {/* Subtle pattern overlay and text legibility gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* City label */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 500 }}>
            <MapPin size={13} />
            {hospital.city}, {hospital.state}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
          {hospital.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.5, flex: 1 }}>
          {hospital.description}
        </p>

        {/* Top specialities */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--space-4)' }}>
          {hospital.specialities.slice(0, 2).map(spec => (
            <Badge key={spec} variant="speciality">{spec}</Badge>
          ))}
          {hospital.specialities.length > 2 && (
            <Badge variant="speciality">+{hospital.specialities.length - 2}</Badge>
          )}
        </div>

        {/* CTA */}
        <Link href={`/hospitals/${hospital.slug}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--nh-blue)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s', marginTop: 'auto' }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          View Hospital
          <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function HospitalsGrid() {
  return (
    <section className="section-alt section-pad" aria-label="Our hospitals">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 14 }}>
            Our Hospital Network
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            24+ Hospitals Across India & Beyond
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            From health cities to multispeciality hospitals — world-class care where you need it most.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}
        >
          {hospitals.slice(0, 6).map(h => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}
        >
          <Button variant="ghost" size="md" href="/hospitals" icon={<ChevronRight size={16} />}>
            View All Hospitals
          </Button>
        </motion.div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="Our hospitals"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          [aria-label="Our hospitals"] .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
