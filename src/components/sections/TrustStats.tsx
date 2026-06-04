'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { trustStats } from '@/lib/data';

function CountUp({ target, duration = 2 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    // Parse numeric part
    const numericStr = target.replace(/[^0-9.]/g, '');
    const suffix = target.replace(/[0-9.]/g, '');
    const num = parseFloat(numericStr);
    if (isNaN(num)) { setDisplay(target); return; }

    const controls = animate(0, num, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        const formatted = num >= 1000 ? (v / 1000).toFixed(1) : v >= 10 ? Math.round(v).toString() : v.toFixed(1);
        setDisplay(formatted + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function TrustStats() {
  return (
    <section className="section-blue section-pad" aria-label="Trust statistics">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}
        >
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Trusted by Millions Across India
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
            Narayana Health delivers world-class care at scale — without compromising affordability or compassion.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                textAlign: 'center',
                padding: 'var(--space-5)',
                borderRight: i < trustStats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-stack)', marginBottom: 10 }}>
                <CountUp target={stat.value} duration={2} />
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, letterSpacing: '0.03em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 640px) {
          [aria-label="Trust statistics"] .container > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          [aria-label="Trust statistics"] .container > div:last-child > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.15) !important;
          }
        }
      `}</style>
    </section>
  );
}
