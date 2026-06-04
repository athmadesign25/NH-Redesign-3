'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { featuredSpecialities } from '@/lib/data';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';
import { ChevronRight } from 'lucide-react';

import Image from 'next/image';

const specialityIcons: Record<string, string> = {
  cardiology: '/Specialities icons/Cardiology.svg',
  oncology: '/Specialities icons/Cancercare.svg',
  neurology: '/Specialities icons/Neurology.svg',
  orthopaedics: '/Specialities icons/Orthopaedics.svg',
  nephrology: '/Specialities icons/Nephrology.svg',
  gastroenterology: '/Specialities icons/Gastro.svg',
  paediatrics: '/Specialities icons/Paedratic.svg',
  gynaecology: '/Specialities icons/Gynaecology.svg',
  ophthalmology: '/Specialities icons/General Medicine.svg',
  urology: '/Specialities icons/Urology.svg',
};

function SpecialityCard({ speciality }: { speciality: typeof featuredSpecialities[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/specialities/${speciality.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: 'var(--space-5) var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          border: 'none',
          background: '#fff',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          boxShadow: hovered ? 'var(--shadow-3)' : 'var(--shadow-1)',
          transform: hovered ? 'translateY(-4px)' : 'none',
          minHeight: '130px',
          justifyContent: 'center',
          gap: 'var(--space-3)',
        }}
        aria-label={speciality.name}
      >
        <span style={{ transition: 'transform 0.2s', transform: hovered ? 'scale(1.1)' : 'scale(1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image 
            src={specialityIcons[speciality.id] || '/Specialities icons/General Medicine.svg'} 
            alt={speciality.name} 
            width={64} 
            height={64} 
            style={{ objectFit: 'contain' }}
          />
        </span>
        <span style={{
          fontSize: '13px', fontWeight: 600, textAlign: 'center', lineHeight: 1.3,
          color: hovered ? 'var(--nh-blue)' : 'var(--text-primary)',
          transition: 'color 0.2s',
        }}>
          {speciality.name}
        </span>
      </Link>
    </motion.div>
  );
}

export default function SpecialitiesGrid() {
  return (
    <section id="specialities-section" className="section-alt" style={{ padding: '120px 0' }} aria-label="Medical specialities">
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
            Our Specialities
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            40+ Medical Specialities Under One Roof
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            From complex cardiac surgeries to advanced cancer care — Narayana Health covers every dimension of your health.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'var(--space-4)',
          }}
        >
          {featuredSpecialities.map((spec) => (
            <SpecialityCard key={spec.id} speciality={spec} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}
        >
          <Button variant="ghost" size="md" href="/specialities" icon={<ChevronRight size={16} />}>
            View all specialties
          </Button>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          [aria-label="Medical specialities"] .container > div:nth-child(2) {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          [aria-label="Medical specialities"] .container > div:nth-child(2) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          [aria-label="Medical specialities"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
