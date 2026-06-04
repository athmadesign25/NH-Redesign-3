'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { doctors, specialities, cities } from '@/lib/data';
import { staggerContainer, fadeInUp, viewportOnce, hoverLift } from '@/lib/motion';
import { Search, MapPin, Phone, Calendar, Filter, Star, Clock, ChevronDown, X } from 'lucide-react';

export default function FindDoctorPage() {
  const [searchName, setSearchName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = doctors.filter(d => {
    const nameMatch = !searchName || d.name.toLowerCase().includes(searchName.toLowerCase());
    const cityMatch = !selectedCity || d.hospital.toLowerCase().includes(selectedCity.toLowerCase());
    const specMatch = !selectedSpec || d.speciality.toLowerCase().includes(selectedSpec.toLowerCase());
    return nameMatch && cityMatch && specMatch;
  });

  return (
    <>
      {/* ── Hero Search Bar ── */}
      <div style={{ background: 'linear-gradient(135deg, var(--nh-blue) 0%, var(--nh-blue-dark) 100%)', padding: 'var(--space-7) 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
              Find a Doctor
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              5,000+ expert doctors across 24+ hospitals in India
            </p>

            {/* Search row */}
            <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center', boxShadow: 'var(--shadow-4)', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input value={searchName} onChange={e => setSearchName(e.target.value)}
                  placeholder="Search doctor by name or condition"
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none' }} />
              </div>
              <div style={{ flex: 1, minWidth: 140, position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All Cities</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 140, position: 'relative' }}>
                <select value={selectedSpec} onChange={e => setSelectedSpec(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All Specialities</option>
                  {specialities.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <Button variant="primary" size="md" icon={<Search size={15} />} iconPosition="left">Search</Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Results ── */}
      <section className="section-alt" style={{ padding: 'var(--space-7) 0', minHeight: '60vh' }}>
        <div className="container">
          {/* Results header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {filtered.length} Doctor{filtered.length !== 1 ? 's' : ''} Found
              </h2>
              {(selectedCity || selectedSpec || searchName) && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {selectedCity && <Badge variant="category">{selectedCity} <button onClick={() => setSelectedCity('')} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nh-blue)', fontFamily: 'var(--font-stack)' }}>×</button></Badge>}
                  {selectedSpec && <Badge variant="category">{selectedSpec} <button onClick={() => setSelectedSpec('')} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nh-blue)', fontFamily: 'var(--font-stack)' }}>×</button></Badge>}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sort by:</span>
              <select style={{ padding: '6px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'var(--font-stack)', outline: 'none', background: '#fff' }}>
                <option>Relevance</option>
                <option>Experience</option>
                <option>Rating</option>
                <option>Availability</option>
              </select>
            </div>
          </div>

          {/* Doctor cards */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-9)', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🔍</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>No doctors found</h3>
                <p>Try a different name, city, or speciality.</p>
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Button variant="primary" size="md" onClick={() => { setSearchName(''); setSelectedCity(''); setSelectedSpec(''); }}>Clear Filters</Button>
                </div>
              </div>
            ) : (
              filtered.map(doc => (
                <motion.div key={doc.id} variants={fadeInUp}
                  style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-1)', display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start', flexWrap: 'wrap' }}
                  whileHover={{ boxShadow: 'var(--shadow-3)', y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Avatar */}
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, var(--nh-blue-10) 0%, var(--nh-blue-20) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0, border: '3px solid var(--nh-blue-20)' }}>
                    👨‍⚕️
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{doc.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--nh-blue)', fontWeight: 500, marginBottom: 6 }}>{doc.designation}</p>
                      </div>
                      <Badge variant={doc.available ? 'available' : 'unavailable'}>
                        {doc.available ? 'Available Today' : 'Call for Appointment'}
                      </Badge>
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                      <Badge variant="speciality">{doc.speciality}</Badge>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '13px', color: 'var(--text-muted)' }}>
                        <MapPin size={12} /> {doc.hospital}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '13px', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {doc.experience}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={12} fill={i <= Math.floor(doc.rating) ? '#F57C00' : 'none'} stroke="#F57C00" />
                        ))}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.rating}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({doc.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flexShrink: 0 }}>
                    <Button variant="primary" size="md" href={`/find-a-doctor/${doc.slug}`} icon={<Calendar size={15} />} iconPosition="left">Book Appointment</Button>
                    <Button variant="ghost" size="md" href="tel:18003090309" icon={<Phone size={15} />} iconPosition="left">Call Now</Button>
                    <Link href={`/find-a-doctor/${doc.slug}`} style={{ textAlign: 'center', fontSize: '13px', color: 'var(--nh-blue)', fontWeight: 500 }}>View Profile →</Link>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
