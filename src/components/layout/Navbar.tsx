'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { Phone, MapPin, ChevronDown, ChevronRight, Menu, X, Search, Calendar } from 'lucide-react';
import NHLogo from '@/components/ui/NHLogo';
import Button from '@/components/ui/Button';
import SearchModal from '@/components/ui/SearchModal';
import { mobileDrawer, overlayBackdrop, dropdownMenu } from '@/lib/motion';
import { hospitals, healthArticles, healthPackages, specialities } from '@/lib/data';

const navItems = [
  {
    label: 'Find a Doctor',
    href: '/find-a-doctor',
    mega: true,
    columns: [
      { title: 'Top Specialties', items: ['Cardiologist', 'Orthopaedician', 'Oncologist', 'Neurologist', 'Pediatrician'] },
      { title: 'Surgical Specialists', items: ['Cardiac Surgeon', 'General Surgeon', 'Vascular Surgeon', 'Plastic Surgeon'] },
      { title: 'Internal Medicine', items: ['Gastroenterologist', 'Pulmonologist', 'Endocrinologist', 'Nephrologist'] },
      { title: 'Other Specialists', items: ['Urologist', 'Gynecologist', 'ENT Specialist', 'Dermatologist', 'Dentist'] },
    ],
  },
  {
    label: 'Hospitals & Clinics',
    href: '/hospitals',
    mega: true,
    columns: [
      { title: 'South India', items: ['Bengaluru — Health City', 'Bengaluru — Mazumdar Shaw', 'Mysuru', 'Dharwad'] },
      { title: 'East India', items: ['Kolkata', 'Jamshedpur', 'Raipur', 'Guwahati'] },
      { title: 'North India', items: ['Delhi NCR', 'Gurugram', 'Jaipur', 'Jammu'] },
      { title: 'International', items: ['Cayman Islands', 'Bangladesh Helpdesk'] },
    ],
  },
  {
    label: 'Treatment & Specialities',
    href: '/specialities',
    mega: true,
    columns: [
      { title: 'Heart & Vascular', items: ['Cardiology', 'Cardiac Surgery', 'Vascular Surgery'] },
      { title: 'Cancer Care', items: ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology'] },
      { title: 'Brain & Spine', items: ['Neurology', 'Neurosurgery', 'Spine Surgery'] },
      { title: 'Bones & Joints', items: ['Orthopaedics', 'Joint Replacement', 'Sports Medicine'] },
    ],
  },
  {
    label: 'Health Checkups',
    href: '/health-checks',
    mega: true,
    columns: [
      { 
        title: 'Health Packages for Women', 
        items: ['Vital Care (below 40 years)', 'Prime Health (40-45 years)', 'Enhanced Health (above 45 years)', 'Comprehensive Health (above 45 years)'] 
      },
      { 
        title: 'Health Packages for Men', 
        items: ['Vital Care (below 35 years)', 'Prime Health (35-45 years)', 'Enhanced Health (35-45 years)', 'Comprehensive Health (above 45 years)'] 
      },
      {
        title: 'Specialized Packages',
        items: ['Comprehensive Heart Check', 'Diabetic Health Check', 'Cancer Screening Panel', 'Senior Citizen Health Check']
      },
    ],
  },
  { label: 'Health Insurance', href: '/health-insurance', mega: false },
  { label: 'Narayana One Health', href: '/narayana-one-health', mega: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  
  const locations = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune'];

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 1024) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navBg = '#fff';
  const navShadow = scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08)';
  const textColor = 'var(--text-primary)';

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>



      {/* ── MAIN NAV ── */}
      <motion.nav
        animate={{ backgroundColor: navBg, boxShadow: navShadow }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}
      >
        <div style={{ width: '100%', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-start' }}>
            <Link href="/" aria-label="Narayana Health Home" style={{ flexShrink: 0 }}>
              <NHLogo variant="color" width={135} />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: '2px', alignItems: 'center', margin: 0 }} className="desktop-nav">
            {navItems.slice(0, 6).map((item) => (
              <li key={item.label} style={{}}
                onMouseEnter={() => item.mega ? setActiveDropdown(item.label) : null}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  style={{
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                  }}
                >
                  {item.label}
                  {item.mega && <ChevronDown size={14} />}
                  {item.label === 'Narayana One Health' && <span className="shimmer-line" />}
                </Link>

                {/* Mega Dropdown */}
                {item.mega && item.columns && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        variants={dropdownMenu}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          width: '100%',
                          background: '#fff',
                          boxShadow: 'var(--shadow-4)',
                          borderTop: '1px solid var(--border-light)',
                          transformOrigin: 'top',
                        }}
                      >
                        {item.label === 'Hospitals & Clinics' ? (
                          <div className="container" style={{
                            maxWidth: '1440px',
                            margin: '0 auto',
                            padding: 'var(--space-6) var(--space-4)',
                            display: 'flex',
                            gap: 'var(--space-4)',
                          }}>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nh-blue)', marginBottom: '10px', borderLeft: '3px solid var(--nh-blue)', paddingLeft: '8px' }}>
                                    {col.title}
                                  </div>
                                  {col.items.map((i) => (
                                    <Link key={i} href={`/specialities/${i.toLowerCase().replace(/\s+/g, '-')}`}
                                      style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 0 6px 11px', borderRadius: 'var(--radius-sm)', transition: 'color 0.15s' }}>
                                      {i}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
                                <Link href={item.href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nh-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  View all {item.label} <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                            <div style={{ width: '560px', flexShrink: 0, paddingLeft: '0' }}>
                              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                                Nearest Hospitals
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                                {hospitals.slice(0, 2).map(h => (
                                  <Link key={h.id} href={`/hospitals/${h.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', padding: '12px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--nh-blue-5)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <div style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
                                      <img src={h.image} alt={h.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.2 }}>{h.name}</div>
                                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} /> {h.city}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : item.label === 'Treatment & Specialities' ? (
                          <div className="container" style={{
                            maxWidth: '1440px',
                            margin: '0 auto',
                            padding: 'var(--space-6) var(--space-4)',
                            display: 'flex',
                            gap: 'var(--space-4)',
                          }}>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nh-blue)', marginBottom: '10px', borderLeft: '3px solid var(--nh-blue)', paddingLeft: '8px' }}>
                                    {col.title}
                                  </div>
                                  {col.items.map((i) => (
                                    <Link key={i} href={`/specialities/${i.toLowerCase().replace(/\s+/g, '-')}`}
                                      style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 0 6px 11px', borderRadius: 'var(--radius-sm)', transition: 'color 0.15s' }}>
                                      {i}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
                                <Link href={item.href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nh-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  View all {item.label} <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                            <div style={{ width: '560px', flexShrink: 0, paddingLeft: '0' }}>
                              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                                Recent Health News
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                                {healthArticles.slice(0, 2).map(article => (
                                  <Link key={article.id} href={`/health-library/${article.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', padding: '12px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--nh-blue-5)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <div style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
                                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</div>
                                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        {article.category} • {article.readTime}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : item.label === 'Health Checkups' ? (
                          <div className="container" style={{
                            maxWidth: '1440px',
                            margin: '0 auto',
                            padding: 'var(--space-6) var(--space-4)',
                            display: 'flex',
                            gap: 'var(--space-4)',
                          }}>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nh-blue)', marginBottom: '10px', borderLeft: '3px solid var(--nh-blue)', paddingLeft: '8px' }}>
                                    {col.title}
                                  </div>
                                  {col.items.map((i) => (
                                    <Link key={i} href={`/health-checks/${i.toLowerCase().replace(/\s+/g, '-')}`}
                                      style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 0 6px 11px', borderRadius: 'var(--radius-sm)', transition: 'color 0.15s' }}>
                                      {i}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
                                <Link href={item.href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nh-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  View all {item.label} <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                            <div style={{ width: '560px', flexShrink: 0, paddingLeft: '0' }}>
                              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                                Popular Packages
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                                {healthPackages.filter(p => p.popular).slice(0, 2).map(pkg => (
                                  <Link key={pkg.id} href={`/health-checks/${pkg.id}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', padding: '12px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--nh-blue-5)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <div style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
                                      <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.name}</div>
                                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {pkg.description}
                                      </div>
                                      </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="container" style={{
                            maxWidth: '1440px',
                            margin: '0 auto',
                            padding: 'var(--space-6) var(--space-4)',
                            display: 'flex',
                            gap: 'var(--space-4)',
                          }}>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--nh-blue)', marginBottom: '10px', borderLeft: '3px solid var(--nh-blue)', paddingLeft: '8px' }}>
                                    {col.title}
                                  </div>
                                  {col.items.map((i) => (
                                    <Link key={i} href={`/specialities/${i.toLowerCase().replace(/\s+/g, '-')}`}
                                      style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 0 6px 11px', borderRadius: 'var(--radius-sm)', transition: 'color 0.15s' }}>
                                      {i}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-start' }}>
                                <Link href={item.href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nh-blue)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  View all <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                            <div style={{ width: '560px', flexShrink: 0, paddingLeft: '0' }}>
                              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                                Top Specialities
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                                {specialities.slice(0, 2).map(spec => (
                                  <Link key={spec.id} href={`/specialities/${spec.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', padding: '12px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--nh-blue-5)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <div style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--nh-blue-10)' }}>
                                      {spec.image ? (
                                        <img src={spec.image} alt={spec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      ) : (
                                        <span style={{ fontSize: '24px' }}>{spec.icon}</span>
                                      )}
                                    </div>
                                    <div style={{ width: '100%' }}>
                                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{spec.name}</div>
                                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {spec.description}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Book Appointment CTA & Login */}
          <div style={{ flex: 1.2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setLocationDropdownOpen(true)}
              onMouseLeave={() => setLocationDropdownOpen(false)}
            >
              <div
  title={selectedLocation}
  style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
>
  <MapPin size={18} strokeWidth={2.5} />
  <ChevronDown size={14} style={{ transform: locationDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
</div>

              <AnimatePresence>
                {locationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#fff',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      border: '1px solid var(--border-light)',
                      padding: '8px',
                      minWidth: '160px',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                  >
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setLocationDropdownOpen(false);
                        }}
                        style={{
                          background: selectedLocation === loc ? 'rgba(3, 78, 162, 0.05)' : 'transparent',
                          color: selectedLocation === loc ? 'var(--nh-blue)' : 'var(--text-primary)',
                          border: 'none',
                          padding: '8px 12px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: selectedLocation === loc ? 600 : 400,
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.2s, color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          if (selectedLocation !== loc) {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedLocation !== loc) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {loc}
                        {selectedLocation === loc && <span>✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  padding: '6px 35px 6px 10px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  background: 'transparent',
                  color: 'var(--text-primary)'
                }}
              />
              <Search
                size={18}
                strokeWidth={2.5}
                aria-label="Search"
                onClick={() => setSearchOpen(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <a 
              href="tel:18003090309"
              aria-label="Call Helpline" 
              style={{ padding: '8px', cursor: 'pointer', color: 'var(--nh-red)', display: 'flex', alignItems: 'center', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--nh-red)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              <Phone size={18} strokeWidth={2.5} />
            </a>
            <Link
              href="/login"
              style={{
                border: '1px solid var(--nh-red)',
                color: 'var(--nh-red)',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--nh-red)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--nh-red)';
              }}
            >
              Login
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              style={{ color: textColor, padding: '8px', display: 'none' }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              variants={overlayBackdrop}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileDrawer}
              initial="hidden" animate="visible" exit="exit"
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: '85vw', maxWidth: '360px',
                background: '#fff', zIndex: 2000, overflowY: 'auto', padding: 'var(--space-5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                <NHLogo variant="color" width={140} />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ color: 'var(--text-primary)', padding: 8 }}>
                  <X size={24} />
                </button>
              </div>

              {/* Mobile search */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input placeholder="Search doctors, specialities..." style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none' }} />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid var(--border-light)', fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}
                >
                  {item.label}
                </Link>
              ))}

              <div style={{ marginTop: 'var(--space-5)' }}>
                <Button variant="primary" size="md" href="/find-a-doctor" fullWidth icon={<Calendar size={16} />} iconPosition="left">
                  Book Appointment
                </Button>
              </div>

              <div style={{ marginTop: 'var(--space-5)', padding: 'var(--space-4)', background: 'var(--nh-blue-5)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 6 }}>Emergency / Helpline</p>
                <a href="tel:18003090309" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--nh-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Phone size={18} />
                  1800 309 0309
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SEARCH MODAL ── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style jsx global>{`
        @keyframes shimmer-line-anim {
          0%, 80% { transform: scaleX(0); opacity: 0; transform-origin: left; background-position: 0% 50%; }
          85% { transform: scaleX(1); opacity: 1; transform-origin: left; background-position: 0% 50%; }
          95% { transform: scaleX(1); opacity: 1; transform-origin: right; background-position: 100% 50%; }
          100% { transform: scaleX(0); opacity: 0; transform-origin: right; background-position: 100% 50%; }
        }
        .shimmer-line {
          position: absolute;
          bottom: 4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: linear-gradient(90deg, #ADD8E6, #800080, #FFC0CB);
          background-size: 200% auto;
          border-radius: 2px;
          animation: shimmer-line-anim 5s infinite;
        }
        @keyframes shimmer-gradient {
          0% { background-position: 0% 50%; transform: scaleX(1); opacity: 1; }
          50% { background-position: 100% 50%; transform: scaleX(1); opacity: 1; }
          100% { background-position: 0% 50%; transform: scaleX(1); opacity: 1; }
        }
        @keyframes shimmer-enter {
          0% { transform: scaleX(0); opacity: 0; transform-origin: center; }
          100% { transform: scaleX(1); opacity: 1; transform-origin: center; }
        }
        .desktop-nav a:hover .shimmer-line {
          animation: shimmer-enter 0.25s ease-out forwards, shimmer-gradient 2s linear infinite 0.25s;
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
