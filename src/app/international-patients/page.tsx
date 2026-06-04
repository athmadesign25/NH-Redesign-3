'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { Phone, Mail, Globe, MapPin, Calendar, CheckCircle, ChevronRight, Plane, Clock, FileText, CreditCard, Users, HeartHandshake } from 'lucide-react';

const processSteps = [
  { icon: '📋', title: 'Send Medical Records', desc: 'Share your reports, scans and previous treatment details with our international team.' },
  { icon: '👨‍⚕️', title: 'Doctor Opinion', desc: 'Our specialists review your case and provide a detailed second opinion and treatment plan.' },
  { icon: '💰', title: 'Cost Estimate', desc: 'Receive a transparent, itemised cost estimate — no hidden charges.' },
  { icon: '✈️', title: 'Travel Assistance', desc: 'We assist with visa invitation letters, airport pickup and accommodation.' },
  { icon: '🏥', title: 'Receive Treatment', desc: 'World-class treatment at our JCI/NABH accredited hospitals.' },
  { icon: '🏠', title: 'Follow-Up Care', desc: 'Telemedicine follow-up from your home country with your treating doctor.' },
];

const topCountries = [
  { flag: '🇧🇩', name: 'Bangladesh', patients: '18,000+ / year', desk: true },
  { flag: '🇦🇪', name: 'UAE', patients: '6,000+ / year', desk: false },
  { flag: '🇰🇪', name: 'Kenya', patients: '4,500+ / year', desk: false },
  { flag: '🇿🇲', name: 'Zambia', patients: '3,200+ / year', desk: false },
  { flag: '🇳🇵', name: 'Nepal', patients: '5,000+ / year', desk: false },
  { flag: '🇸🇸', name: 'South Sudan', patients: '2,100+ / year', desk: false },
];

const costComparison = [
  { procedure: 'Open Heart Surgery (CABG)', india: '₹3-5 Lakh', usa: '$60,000–80,000', savings: '95%' },
  { procedure: 'Knee Replacement', india: '₹2-3 Lakh', usa: '$30,000–50,000', savings: '93%' },
  { procedure: 'Liver Transplant', india: '₹15-25 Lakh', usa: '$300,000+', savings: '95%' },
  { procedure: 'Cancer Treatment', india: '₹5-15 Lakh', usa: '$100,000–500,000', savings: '90%+' },
];

export default function InternationalPatientsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg, var(--nh-blue-deeper) 0%, var(--nh-blue) 100%)', padding: 'var(--space-9) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.1)', padding: '5px 16px', borderRadius: 999, marginBottom: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.15)' }}>
              International Patient Services
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 'var(--space-4)' }}>
              World-Class Healthcare.<br />
              <span style={{ color: 'var(--nh-blue-20)' }}>Affordable for Everyone.</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: 620, margin: '0 auto var(--space-7)', lineHeight: 1.7 }}>
              Join 64,000+ patients from 78 countries who chose Narayana Health for complex treatments — at up to 95% less than USA or UK prices.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Button variant="white" size="lg" href="#enquiry" icon={<Mail size={16} />} iconPosition="left">Make an Enquiry</Button>
              <Button variant="ghost" size="lg" href="tel:+919845727272" icon={<Phone size={16} />} iconPosition="left"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' } as any}>
                Call: +91 98457 27272
              </Button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-5)', marginTop: 'var(--space-7)', flexWrap: 'wrap' }}>
              {[{ v: '78', l: 'Countries' }, { v: '64K+', l: 'Int\'l Patients' }, { v: 'JCI', l: 'Accredited' }, { v: '24+', l: 'Hospitals' }].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>{s.v}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── PROCESS TIMELINE ── */}
      <section className="section-white section-pad">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
            <h2 className="h2-section" style={{ marginBottom: 12 }}>Your Journey to Recovery</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
              A seamless, guided experience from your home country to ours — and back.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
            {processSteps.map((step, i) => (
              <motion.div key={step.title} variants={fadeInUp}
                style={{ background: 'var(--nh-blue-5)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', border: '1px solid var(--nh-blue-20)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', width: 28, height: 28, borderRadius: '50%', background: 'var(--nh-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: '36px', marginBottom: 'var(--space-3)' }}>{step.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COST COMPARISON ── */}
      <section className="section-alt section-pad">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
            <h2 className="h2-section" style={{ marginBottom: 12 }}>Why India? Why Narayana Health?</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
              World-class outcomes at a fraction of global prices.
            </p>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-2)' }}>
              <thead>
                <tr style={{ background: 'var(--nh-blue)' }}>
                  {['Procedure', 'Cost at NH India', 'Cost in USA', 'Your Savings'].map(h => (
                    <th key={h} style={{ padding: 'var(--space-4)', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {costComparison.map((row, i) => (
                  <tr key={row.procedure} style={{ background: i % 2 === 0 ? '#fff' : 'var(--nh-blue-5)', borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: 'var(--space-4)', fontWeight: 600, color: 'var(--text-primary)' }}>{row.procedure}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--nh-blue)', fontWeight: 700 }}>{row.india}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)' }}>{row.usa}</td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <span style={{ background: '#E8F5E9', color: '#2E7D32', fontWeight: 700, fontSize: '13px', padding: '3px 10px', borderRadius: 999 }}>Save {row.savings}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TOP COUNTRIES & BANGLADESH DESK ── */}
      <section className="section-white section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            <div>
              <h2 className="h2-section" style={{ marginBottom: 'var(--space-5)' }}>Patients We Serve</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {topCountries.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--nh-blue-5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--nh-blue-20)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '24px' }}>{c.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{c.name}</span>
                      {c.desk && <span style={{ background: 'var(--nh-red)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>DEDICATED DESK</span>}
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--nh-blue)', fontWeight: 600 }}>{c.patients}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bangladesh help desk */}
            <div>
              <div style={{ background: 'linear-gradient(135deg, #006A4E 0%, #008060 100%)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🇧🇩</div>
                <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: 'var(--space-3)', lineHeight: 1.2 }}>
                  Bangladesh<br />Help Desk
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
                  Dedicated team of Bengali-speaking coordinators available 24×7 to assist Bangladeshi patients with appointments, visa invitation letters, and accommodation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[{ icon: Phone, text: '+880 1800 000 000' }, { icon: Mail, text: 'bangladesh@narayanahealth.org' }, { icon: Clock, text: 'Available 24×7 — All days' }].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                      <Icon size={16} style={{ flexShrink: 0 }} />
                      {text}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'var(--space-5)' }}>
                  <Button variant="white" size="md" href="tel:+8801800000000" fullWidth icon={<Phone size={15} />} iconPosition="left">
                    Contact Bangladesh Desk
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquiry" className="section-alt section-pad">
        <div className="container" style={{ maxWidth: 760 }}>
          <motion.div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
            <h2 className="h2-section" style={{ marginBottom: 12 }}>Make an Enquiry</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Our international team will respond within 24 hours.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-7)', boxShadow: 'var(--shadow-2)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              {[['Full Name', 'text'], ['Email Address', 'email'], ['Phone / WhatsApp', 'tel'], ['Country of Residence', 'text']].map(([label, type]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</label>
                  <input type={type} placeholder={label} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Treatment / Condition Required</label>
              <input placeholder="e.g. Cardiac Surgery, Cancer Treatment, Knee Replacement" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Medical Reports / Additional Notes</label>
              <textarea rows={4} placeholder="Describe your condition or paste relevant medical history..." style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none', resize: 'vertical' }} />
            </div>
            <Button variant="primary" size="lg" fullWidth type="submit" icon={<Mail size={16} />} iconPosition="left">
              Submit Enquiry
            </Button>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-3)' }}>
              By submitting you agree to our Privacy Policy. We will never share your information.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
