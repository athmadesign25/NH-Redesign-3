'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Heart, ChevronRight } from 'lucide-react';
import { viewportOnce } from '@/lib/motion';

export default function CSRSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="section-white" style={{ padding: 'var(--space-8) 0', overflow: 'hidden' }} aria-label="CSR and social initiatives">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>

          {/* LEFT: Parallax image block */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '480px' }}
          >
            {/* Parallax inner */}
            <motion.div style={{ y, height: '120%', position: 'absolute', inset: '-10% 0', background: 'linear-gradient(160deg, #E8F5E9 0%, #C8E6C9 40%, #A5D6A7 100%)' }}>
              {/* Illustrative CSR visual */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', opacity: 0.15 }}>
                  <div style={{ fontSize: '120px' }}>🤝</div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '20%', left: '10%', background: '#fff', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-5)', boxShadow: 'var(--shadow-3)', border: '1px solid var(--border-light)' }}
              >
                <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--nh-blue)' }}>₹320Cr+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Free surgeries this year</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                style={{ position: 'absolute', bottom: '25%', right: '8%', background: 'var(--nh-blue)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-5)', boxShadow: 'var(--shadow-3)' }}
              >
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>1.5L+</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>BPL patients treated</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                style={{ position: 'absolute', bottom: '12%', left: '15%', background: '#fff', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', boxShadow: 'var(--shadow-2)', border: '1px solid var(--border-light)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Heart size={18} style={{ color: 'var(--nh-red)' }} />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>HCG Programme</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Health for All</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 'var(--space-4)' }}>
              Social Commitment
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', lineHeight: 1.2, marginBottom: 'var(--space-4)' }}>
              Healthcare is a Right,<br />
              <span style={{ color: 'var(--nh-black)' }}>Not a Privilege.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-5)' }}>
              Founded on the belief that quality healthcare should be accessible to all, Narayana Health has performed over 1.5 lakh free and subsidised surgeries for patients below the poverty line — including open-heart surgeries for children at ₹50,000, compared to ₹5 lakh elsewhere.
            </p>

            {/* CSR initiatives */}
            {[
              { title: 'Hrudaya Jyoti', desc: 'Free cardiac surgeries for children with congenital heart defects.' },
              { title: 'Jan Aushadhi', desc: 'Generic medicines at 50–90% below MRP across all NH facilities.' },
              { title: 'NH Care Fund', desc: 'Financial assistance for patients who cannot afford treatment.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}
              >
                <div style={{ width: 4, background: 'var(--nh-blue)', borderRadius: 'var(--radius-full)', flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}

            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button variant="primary" size="md" href="/csr-overview" icon={<ChevronRight size={16} />}>
                Learn About Our CSR Work
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          [aria-label="CSR and social initiatives"] .container > div {
            grid-template-columns: 1fr !important;
          }
          [aria-label="CSR and social initiatives"] .container > div > div:first-child {
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
