'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';

const quickLinks = [
  { icon: '🩺', label: 'Find a Doctor', href: '/find-a-doctor', color: '#E6EDF8' },
  { icon: '🏥', label: 'Specialities', href: '/specialities', color: '#E6EDF8' },
  { icon: '🏨', label: 'Hospitals', href: '/hospitals', color: '#E6EDF8' },
  { icon: '📋', label: 'Health Checks', href: '/health-checks', color: '#E6EDF8' },
  { icon: '🔬', label: 'Procedures', href: '/procedures', color: '#E6EDF8' },
  { icon: '✈️', label: 'International', href: '/international-patients', color: '#E6EDF8' },
];

export default function QuickAccess() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth slide-up parallax motion as the section scrolls in
  const y = useTransform(scrollYProgress, [0, 0.45], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.75, 1]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ y, opacity }}
      className="section-white section-pad relative z-10 shadow-[0_-20px_40px_rgba(3,78,162,0.06)]" 
      aria-label="Quick access links"
    >
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-4)' }}
        >
          {quickLinks.map(({ icon, label, href }) => (
            <motion.div key={label} variants={fadeInUp}>
              <Link
                href={href}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--nh-blue-5)', border: '1px solid var(--nh-blue-20)', transition: 'all 0.2s', cursor: 'pointer' }}
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: [-5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: '36px', lineHeight: 1 }}
                  role="img" aria-label={label}
                >
                  {icon}
                </motion.span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.3 }}>
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          [aria-label="Quick access links"] .container > div {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          [aria-label="Quick access links"] .container > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
