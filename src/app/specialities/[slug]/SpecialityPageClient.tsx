'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { doctors } from '@/lib/data';
import { staggerContainer, fadeInUp, viewportOnce, hoverLift } from '@/lib/motion';
import { Calendar, Phone, ChevronRight, MapPin, Star, Clock, CheckCircle } from 'lucide-react';

const conditions: Record<string, string[]> = {
  cardiology: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia', 'Valvular Heart Disease', 'Congenital Heart Defects', 'Hypertension', 'Cardiomyopathy', 'Pericarditis'],
  oncology: ['Breast Cancer', 'Lung Cancer', 'Colorectal Cancer', 'Cervical Cancer', 'Blood Cancers', 'Brain Tumours', 'Prostate Cancer', 'Lymphoma'],
  neurology: ['Stroke', 'Epilepsy', 'Parkinson\'s Disease', 'Multiple Sclerosis', 'Brain Tumours', 'Spinal Cord Injuries', 'Migraine', 'Dementia'],
  orthopaedics: ['Total Knee Replacement', 'Hip Replacement', 'Spine Surgery', 'Sports Injuries', 'Fractures', 'Arthritis', 'Scoliosis', 'Shoulder Surgery'],
};

const procedures: Record<string, string[]> = {
  cardiology: ['Angioplasty', 'Bypass Surgery (CABG)', 'Valve Replacement', 'TAVI', 'Heart Transplant', 'Pacemaker Implant'],
  oncology: ['Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Bone Marrow Transplant', 'Targeted Therapy', 'Surgery'],
  neurology: ['Deep Brain Stimulation', 'CyberKnife Radiosurgery', 'Spinal Fusion', 'Aneurysm Clipping', 'Carotid Endarterectomy'],
  orthopaedics: ['Robotic Knee Replacement', 'Hip Resurfacing', 'Arthroscopy', 'Spinal Disc Replacement', 'Limb Salvage Surgery'],
};

interface Speciality { id: string; name: string; slug: string; icon: string; description: string }

export default function SpecialityPageClient({ speciality }: { speciality: Speciality }) {
  const conditionsList = conditions[speciality.id] || ['Consultation & Diagnosis', 'Medical Management', 'Surgical Intervention', 'Rehabilitation'];
  const proceduresList = procedures[speciality.id] || ['Standard Procedures', 'Advanced Interventions', 'Minimally Invasive Surgery'];
  const relatedDoctors = doctors.slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg, var(--nh-blue) 0%, var(--nh-blue-dark) 100%)', padding: 'var(--space-8) 0 var(--space-7)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 'var(--space-5)', fontSize: '13px' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Specialities', href: '/specialities' }, { label: speciality.name, href: '#' }].map((crumb, i, arr) => (
              <React.Fragment key={crumb.href}>
                {i < arr.length - 1
                  ? <Link href={crumb.href} style={{ color: 'rgba(255,255,255,0.65)' }}>{crumb.label}</Link>
                  : <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />}
              </React.Fragment>
            ))}
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-8)', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>{speciality.icon}</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
                {speciality.name}
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 560, marginBottom: 'var(--space-6)' }}>
                {speciality.description} India's leading team of specialists with decades of combined experience.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Button variant="white" size="lg" href="/find-a-doctor" icon={<Calendar size={16} />} iconPosition="left">Book Appointment</Button>
                <Button variant="ghost" size="lg" href="tel:18003090309" icon={<Phone size={16} />} iconPosition="left"
                  style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' } as any}>
                  1800 309 0309
                </Button>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minWidth: 200 }}>
              {[
                { value: '150+', label: 'Expert Specialists' },
                { value: '24+', label: 'Hospital Locations' },
                { value: '50K+', label: 'Procedures Annually' },
                { value: 'JCI/NABH', label: 'Accredited' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <section className="section-white section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-8)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
              <h2 className="h2-section" style={{ marginBottom: 'var(--space-4)' }}>{speciality.name} at Narayana Health</h2>
              <p className="body-large" style={{ marginBottom: 'var(--space-4)' }}>
                Narayana Health's {speciality.name} department is among the most advanced in the country, combining the latest diagnostic technology with experienced specialists who have trained at the world's premier medical institutions.
              </p>
              <p className="body-regular" style={{ marginBottom: 'var(--space-4)' }}>
                We believe that excellent healthcare should be accessible to every patient, regardless of economic background. Our cost-effective model allows us to perform complex procedures at a fraction of typical costs — without compromising quality.
              </p>
              <p className="body-regular">
                Our multidisciplinary tumour boards, cardiac conferences and speciality-specific case discussions ensure every patient receives the most evidence-based, personalised care plan.
              </p>
            </motion.div>

            {/* Quick enquiry card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: 0.1 }}>
              <div style={{ background: 'var(--nh-blue-5)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', border: '1px solid var(--nh-blue-20)', position: 'sticky', top: 90 }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-4)' }}>Book a {speciality.name} Consultation</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  {['Select City', 'Preferred Date', 'Your Name', 'Mobile Number'].map(field => (
                    <input key={field} placeholder={field} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontFamily: 'var(--font-stack)', outline: 'none', background: '#fff' }} />
                  ))}
                </div>
                <Button variant="primary" size="md" fullWidth icon={<Calendar size={15} />} iconPosition="left">Request Appointment</Button>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-3)' }}>
                  Our team will call you within 30 minutes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section className="section-alt section-pad">
        <div className="container">
          <motion.h2 className="h2-section" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}>
            Conditions We Treat
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
            {conditionsList.map(c => (
              <motion.div key={c} variants={fadeInUp}
                style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'flex-start', gap: 10, boxShadow: 'var(--shadow-1)' }}>
                <CheckCircle size={16} style={{ color: 'var(--nh-blue)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCEDURES ── */}
      <section className="section-white section-pad">
        <div className="container">
          <motion.h2 className="h2-section" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}>
            Procedures & Treatments
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {proceduresList.map((proc, i) => (
              <motion.div key={proc} variants={fadeInUp}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ width: 4, height: 36, background: 'var(--nh-blue)', borderRadius: 'var(--radius-full)' }} />
                  <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{proc}</span>
                </div>
                <Link href={`/procedures/${proc.toLowerCase().replace(/\s+/g,'-')}`}
                  style={{ color: 'var(--nh-blue)', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Learn More <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="section-alt section-pad">
        <div className="container">
          <motion.h2 className="h2-section" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}>
            Our {speciality.name} Specialists
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
            {relatedDoctors.map(doc => (
              <motion.div key={doc.id} variants={fadeInUp} {...hoverLift}
                style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-1)', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--nh-blue) 0%, var(--nh-blue-dark) 100%)', margin: '0 auto var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                  👨‍⚕️
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{doc.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--nh-blue)', marginBottom: 6 }}>{doc.designation}</p>
                <Badge variant="speciality">{doc.speciality}</Badge>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8, color: 'var(--text-muted)', fontSize: '12px' }}>
                  <MapPin size={11} /> {doc.hospital}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6, color: 'var(--text-muted)', fontSize: '12px' }}>
                  <Clock size={11} /> {doc.experience}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 'var(--space-4)' }}>
                  <Button variant="primary" size="sm" href="/find-a-doctor" fullWidth>Book</Button>
                  <Button variant="ghost" size="sm" href="tel:18003090309" fullWidth><Phone size={13} /></Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
            <Button variant="ghost" size="md" href="/find-a-doctor">View All {speciality.name} Doctors</Button>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid var(--border-light)', padding: 'var(--space-3) var(--space-4)', display: 'flex', gap: 'var(--space-3)', zIndex: 100, boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}
        className="mobile-sticky-cta">
        <Button variant="primary" size="md" href="/find-a-doctor" fullWidth icon={<Calendar size={15} />} iconPosition="left">Book Appointment</Button>
        <Button variant="ghost" size="md" href="tel:18003090309" icon={<Phone size={15} />} iconPosition="left">Call Now</Button>
        <style jsx global>{`.mobile-sticky-cta { display: none; } @media (max-width: 768px) { .mobile-sticky-cta { display: flex !important; } }`}</style>
      </div>
    </>
  );
}
