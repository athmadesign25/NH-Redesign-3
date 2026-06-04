'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';
import { QrCode, Star } from 'lucide-react';

const features = [
  { emoji: '📅', text: 'Book appointments in 60 seconds' },
  { emoji: '💬', text: 'Video consultations from home' },
  { emoji: '📋', text: 'Access your health records anytime' },
  { emoji: '📊', text: 'Track vitals & wellness reports' },
  { emoji: '👨‍👩‍👧', text: 'Manage your entire family' },
];

const storeButtons = [
  {
    store: 'App Store',
    badge: '🍎',
    sub: 'Download on the',
    rating: '4.8',
    reviews: '12K+ ratings',
    href: '#',
  },
  {
    store: 'Google Play',
    badge: '▶',
    sub: 'Get it on',
    rating: '4.7',
    reviews: '28K+ ratings',
    href: '#',
  },
];

export default function AppDownloadBanner() {
  return (
    <section
      id="app-download"
      aria-label="Download NH Care App"
      style={{
        background: 'linear-gradient(135deg, var(--nh-blue-deeper) 0%, var(--nh-blue-dark) 60%, var(--nh-blue) 100%)',
        padding: 'var(--space-8) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 70% 50%, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-8)', alignItems: 'center' }}>

          {/* LEFT: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', padding: '4px 14px', borderRadius: 999, marginBottom: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.12)' }}>
                NH Care App
              </span>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-stack)' }}>
                Your Health,<br />
                <span style={{ color: 'red' }}>Always With You.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 'var(--space-6)', maxWidth: 460 }}>
                India's most trusted hospital app. Millions of patients use NH Care to manage their health journey end-to-end — from booking to recovery.
              </p>
            </motion.div>

            {/* Feature list (Pills) with QR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <motion.img 
                src="/qr.svg" 
                alt="QR Code" 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ width: 64, height: 64, flexShrink: 0 }}
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
              >
                {features.map(({ text }) => (
                  <motion.div
                    key={text}
                    variants={fadeInUp}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: 999, 
                      padding: '6px 12px', 
                      border: '1px solid rgba(255,255,255,0.15)' 
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.02em' }}>{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.a href="#" whileHover={{ y: -4, filter: 'brightness(1.1)' }} whileTap={{ scale: 0.96 }}>
                <img src="/App store.svg" alt="Download on the App Store" style={{ height: 50, objectFit: 'contain' }} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -4, filter: 'brightness(1.1)' }} whileTap={{ scale: 0.96 }}>
                <img src="/Google play.svg" alt="Get it on Google Play" style={{ height: 50, objectFit: 'contain' }} />
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: QR code block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <img 
              src="/Mockups.png" 
              alt="NH Care App Mockups" 
              style={{ width: '100%', maxWidth: '425px', height: 'auto', objectFit: 'contain' }}
            />
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="Download NH Care App"] .container > div {
            grid-template-columns: 1fr !important;
          }
          [aria-label="Download NH Care App"] .container > div > div:nth-child(2) {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          [aria-label="Download NH Care App"] .container > div > div > div:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
