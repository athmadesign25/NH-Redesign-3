'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import { Globe, Phone, Mail, MapPin, ChevronRight, Users, Plane } from 'lucide-react';
import { viewportOnce } from '@/lib/motion';

const intlStats = [
  { value: '64,000+', label: 'International Patients', icon: '✈️' },
  { value: '78', label: 'Nationalities Served', icon: '🌍' },
  { value: '40+', label: 'Years of Excellence', icon: '🏆' },
  { value: '₹50Cr+', label: 'Saved vs. Western Costs', icon: '💰' },
];

export default function InternationalCTA() {
  return (
    <section className="section-alt section-pad" aria-label="International patients">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, var(--nh-blue-dark) 0%, var(--nh-blue-deeper) 100%)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

            {/* LEFT ZONE — content */}
            <div style={{ padding: 'var(--space-8) var(--space-7)', position: 'relative' }}>
              {/* Red accent bar */}
              <div style={{ position: 'absolute', left: 0, top: 'var(--space-7)', bottom: 'var(--space-7)', width: 5, background: 'var(--nh-red)', borderRadius: '0 var(--radius-full) var(--radius-full) 0' }} />

              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', padding: '4px 14px', borderRadius: 999, marginBottom: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.12)' }}>
                International Patient Services
              </span>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 'var(--space-4)' }}>
                World-Class Care.<br />
                <span style={{ color: 'var(--nh-blue-20)' }}>At a Fraction of the Cost.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 'var(--space-6)', maxWidth: 420 }}>
                Join 64,000+ international patients who chose Narayana Health for complex surgeries — cardiac, oncology, transplants — at up to 80% less than USA or UK costs.
              </p>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                {intlStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4 }}
                    style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ fontSize: '22px', marginBottom: 4 }}>{stat.icon}</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Button variant="white" size="md" href="/international-patients" icon={<ChevronRight size={16} />}>
                  Make an Enquiry
                </Button>
                <Button variant="ghost" size="md" href="/international-patients#cost-estimate"
                  style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' } as any}>
                  Get Cost Estimate
                </Button>
              </div>
            </div>

            {/* RIGHT ZONE — contact cards */}
            <div style={{ padding: 'var(--space-8) var(--space-6)', background: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', justifyContent: 'center' }}>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                Get in Touch
              </h3>

              {[
                { icon: Phone, label: 'International Helpline', value: '+91 98457 27272', href: 'tel:+919845727272' },
                { icon: Mail, label: 'Email Us', value: 'international@narayanahealth.org', href: 'mailto:international@narayanahealth.org' },
                { icon: Globe, label: 'International Portal', value: 'internationalpatientcare.narayanahealth.org', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'background 0.2s' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color: 'rgba(255,255,255,0.85)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', wordBreak: 'break-word' }}>{value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Bangladesh Help Desk highlight */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                style={{ background: 'rgba(237,28,36,0.15)', border: '1px solid rgba(237,28,36,0.35)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: '20px' }}>🇧🇩</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bangladesh Help Desk</span>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 10 }}>
                  Dedicated assistance for patients from Bangladesh. Bengali-speaking coordinators available 24×7.
                </p>
                <a href="tel:+8801800000000" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={14} /> +880 1800 000 000
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="International patients"] .container > div > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
