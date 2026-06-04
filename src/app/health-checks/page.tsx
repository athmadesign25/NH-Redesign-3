'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import HealthPackages from '@/components/sections/HealthPackages';
import { Calendar, Phone, Mail } from 'lucide-react';
import { viewportOnce, fadeInUp } from '@/lib/motion';

export default function HealthChecksPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--nh-blue) 0%, var(--nh-blue-dark) 100%)', padding: 'var(--space-8) 0', position: 'relative' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 'var(--space-4)' }}>
              Comprehensive Health Checks
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Early detection is the key to prevention. Book one of our specially designed health check packages to ensure you and your family stay healthy.
            </p>
          </motion.div>
        </div>
      </div>

      <HealthPackages />

      <section className="section-alt section-pad" id="book-package">
        <div className="container" style={{ maxWidth: 700 }}>
          <motion.div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
            <h2 className="h2-section" style={{ marginBottom: 12 }}>Book a Health Package</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Fill out the form below and our team will get in touch with you shortly.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-2)', border: '1px solid var(--border-light)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Full Name</label>
                <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Mobile Number</label>
                <input type="tel" placeholder="Mobile Number" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Select Package</label>
              <select style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none', background: '#fff' }}>
                <option value="">-- Choose a package --</option>
                <option value="basic">Basic Health Check</option>
                <option value="comprehensive">Comprehensive Health Check</option>
                <option value="cardiac">Cardiac Health Check</option>
                <option value="senior">Senior Citizen Health Check</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Preferred Date</label>
                <input type="date" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>City / Hospital</label>
                <input type="text" placeholder="Preferred location" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none' }} />
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth icon={<Calendar size={16} />} iconPosition="left">
              Request Booking
            </Button>
            
          </motion.div>
        </div>
      </section>
    </>
  );
}
