'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { staggerContainer, viewportOnce } from '@/lib/motion';

const procedures = [
  { name: 'Minimally Invasive Cardiac Surgery', speciality: 'Cardiology', slug: 'minimally-invasive-cardiac-surgery', description: 'Advanced keyhole techniques for faster recovery after open-heart procedures.' },
  { name: 'Robotic-Assisted Joint Replacement', speciality: 'Orthopaedics', slug: 'robotic-joint-replacement', description: 'AI-guided robotic precision for perfect alignment in knee and hip replacement.' },
  { name: 'Bone Marrow Transplant', speciality: 'Haematology', slug: 'bone-marrow-transplant', description: 'Curative treatment for blood cancers with India\'s highest success rates.' },
  { name: 'CyberKnife Radiosurgery', speciality: 'Neurosurgery', slug: 'cyberknife-radiosurgery', description: 'Frameless stereotactic surgery delivering targeted radiation to tumours with sub-millimeter accuracy.' },
  { name: 'Liver Transplantation', speciality: 'Transplant', slug: 'liver-transplant', description: 'Living and deceased donor liver transplants at India\'s most experienced centres.' },
  { name: 'TAVI — Transcatheter Aortic Valve', speciality: 'Interventional Cardiology', slug: 'tavi', description: 'Non-surgical aortic valve replacement for high-risk patients, no open-heart required.' },
  { name: 'Advanced Robotic Oncology', speciality: 'Surgical Oncology', slug: 'advanced-robotic-oncology', description: 'Highly precise, minimally invasive tumour removal with faster recovery times.' },
];

export default function ProceduresSection() {
  return (
    <section className="section-white section-pad" aria-label="Featured procedures">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)', alignItems: 'start' }}>

          {/* Left sticky label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            style={{ position: 'sticky', top: 100 }}
          >
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 16 }}>
              Cutting-Edge Procedures
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 16, lineHeight: 1.2 }}>
              Advanced Treatments, Exceptional Outcomes
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
              Our surgeons and specialists pioneer India's most advanced medical procedures — with outcomes comparable to the world's best hospitals.
            </p>
            <Link href="/procedures"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--nh-blue)', fontWeight: 600, fontSize: '15px' }}>
              Explore All Procedures <ChevronRight size={16} />
            </Link>

            {/* Medical Technology Image Collage (2x2 grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginTop: '32px',
              maxWidth: '360px',
              opacity: 0.95
            }}>
              {[
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
              ].map((src, idx) => (
                <div key={idx} style={{ aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 16px rgba(0,0,0,0.06)' }}>
                  <img 
                    src={src}
                    alt={`Medical tech ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: procedure list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {procedures.map((proc, i) => (
              <motion.div
                key={proc.slug}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={`/procedures/${proc.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <motion.div
                    whileHover={{ x: 6 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-5) 0',
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {/* Accent bar */}
                    <div style={{ width: 4, minHeight: 60, background: 'var(--nh-blue)', borderRadius: 'var(--radius-full)', flexShrink: 0, marginTop: 4, transition: 'all 0.2s' }} />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--nh-blue)', background: 'var(--nh-blue-5)', padding: '2px 8px', borderRadius: 999 }}>
                          {proc.speciality}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3, transition: 'color 0.2s' }}>
                        {proc.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {proc.description}
                      </p>
                    </div>

                    <ChevronRight size={18} style={{ color: 'var(--nh-blue)', flexShrink: 0, marginTop: 4, opacity: 0.6 }} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          [aria-label="Featured procedures"] .container > div {
            grid-template-columns: 1fr !important;
          }
          [aria-label="Featured procedures"] .container > div > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
