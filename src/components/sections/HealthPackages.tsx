'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { healthPackages } from '@/lib/data';
import { ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function HealthPackages() {
  const [current, setCurrent] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const total = healthPackages.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Show 2 at a time on desktop
  const visibleCount = 2;
  const visiblePackages = Array.from({ length: visibleCount }, (_, i) => healthPackages[(current + i) % total]);

  return (
    <section className="section-blue section-pad" aria-label="Health packages">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-7)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '4px 14px', borderRadius: 999, marginBottom: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
                Health Package
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              Preventive Health Care
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', maxWidth: 650, lineHeight: 1.5 }}>
              The strongest foundation for lifelong health is built before illness begins. Our preventive care packages help you understand your health, identify risks early, and move forward with confidence.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link href="/health-checks" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }}>
                Explore Health Packages <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)' }}>
          <AnimatePresence mode="popLayout">
            {visiblePackages.map((pkg, i) => {
              const isHovered = hoveredId === pkg.id;
              
              return (
                <motion.div
                  key={pkg.id + '-' + i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  onHoverStart={() => setHoveredId(pkg.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  style={{
                    background: isHovered ? '#fff' : 'rgba(255,255,255,0.1)',
                    backdropFilter: isHovered ? 'none' : 'blur(8px)',
                    border: isHovered ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    aspectRatio: '1 / 0.75'
                  }}
                >
                  <div style={{ width: '100%', flex: 1, position: 'relative', minHeight: 0 }}>
                    <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: isHovered ? 'var(--text-primary)' : '#fff', marginBottom: 10, lineHeight: 1.3 }}>
                      {pkg.name.includes(' (') ? (
                        <>
                          {pkg.name.split(' (')[0]}
                          <span style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: isHovered ? 'var(--text-secondary)' : 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                            ({pkg.name.split(' (')[1]}
                          </span>
                        </>
                      ) : pkg.name}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: isHovered ? 'var(--text-secondary)' : 'rgba(255,255,255,0.75)', 
                      lineHeight: 1.5, 
                      marginBottom: 'var(--space-4)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {pkg.description}
                    </p>

                    <Link
                      href={`/health-checks/${pkg.id}`}
                      style={{
                        marginTop: 'auto',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: isHovered ? 'var(--nh-blue)' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                        textDecoration: 'none'
                      }}
                    >
                      Know more <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>


      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="Health packages"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          [aria-label="Health packages"] .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
