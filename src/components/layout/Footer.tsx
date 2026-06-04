'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, ChevronRight } from 'lucide-react';
import NHLogo from '@/components/ui/NHLogo';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'Find a Doctor', href: '/find-a-doctor' },
    { label: 'Specialities', href: '/specialities' },
    { label: 'Hospitals', href: '/hospitals' },
    { label: 'Procedures', href: '/procedures' },
    { label: 'Health Library', href: '/diseases' },
  ],
  'Patient Services': [
    { label: 'Health Checks', href: '/health-checks' },
    { label: 'International Patients', href: '/international-patients' },
    { label: 'Insurance Partners', href: '/insurance' },
    { label: 'Pay Online', href: '/pay-online' },
    { label: 'Patient Feedback', href: '/feedback' },
    { label: 'Virtual Tour', href: '/virtual-tour' },
  ],
  'About NH': [
    { label: 'About Narayana Health', href: '/about-us' },
    { label: 'Awards & Accreditation', href: '/awards' },
    { label: 'CSR Initiatives', href: '/csr-overview' },
    { label: 'Research & Innovation', href: '/research' },
    { label: 'Media Centre', href: '/media' },
    { label: 'Investor Relations', href: '/investors' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Sitemap', href: '/sitemap' },
    { label: 'Careers', href: 'https://jobs.narayanahealth.org' },
  ],
};

// Inline social SVG paths (brand icons not in lucide)
const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/narayanahealth', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', href: 'https://instagram.com/narayanahealth', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/narayana-health', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { label: 'YouTube', href: 'https://youtube.com/narayanahealth', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { label: 'Twitter/X', href: 'https://twitter.com/narayanahealth', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--nh-blue-deeper)', color: '#fff' }} aria-label="Site footer">


      {/* ── Main footer content ── */}
      <div className="container" style={{ padding: 'var(--space-8) var(--space-5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, auto)', gap: 'var(--space-7)', alignItems: 'start' }}>

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={viewportOnce}
          >
            <NHLogo variant="white" width={160} />
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginTop: 'var(--space-4)', maxWidth: '260px' }}>
              Delivering world-class healthcare to every Indian — affordable, accessible, and compassionate.
            </p>

            {/* "Take Care" tagline */}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <span style={{ fontSize: '22px', fontStyle: 'italic', fontWeight: 900, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-stack)' }}>
                Take Care
              </span>
            </div>

            {/* Contact info */}
            <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:18003090309" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={14} /> 1800 309 0309 (Toll Free)
              </a>
              <a href="mailto:info@narayanahealth.org" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} /> info@narayanahealth.org
              </a>
              <a href="https://www.narayanahealth.org" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Globe size={14} /> narayanahealth.org
              </a>
            </div>

            {/* Social links */}
            <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 10 }}>
              {socialLinks.map(({ path, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.2s',
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                </motion.a>
              ))}
            </div>


          </motion.div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (colIdx + 1) * 0.08 }}
              viewport={viewportOnce}
            >
              <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue-20)', marginBottom: 'var(--space-4)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'var(--space-3)' }}>
                {title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.15s' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} Narayana Hrudayalaya Ltd. All rights reserved. | Listed on BSE & NSE (NH)
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {['JCI Accredited', 'NABH Certified'].map((acc) => (
              <span key={acc} style={{ fontSize: '11px', fontWeight: 700, background: 'var(--nh-blue)', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>
                {acc}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          footer > div:nth-child(2) > div > div:first-child > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          footer > div:nth-child(2) > div > div:first-child > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
