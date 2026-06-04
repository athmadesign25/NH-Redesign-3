'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ShieldCheck, Globe, CheckCircle, Activity, Users, Cpu } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';

const allPoints = [
  {
    icon: <ShieldCheck size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'NABH Accredited',
    subtext: 'India’s recognised hospital quality norms',
    logo: '/nabh-logo.jpg'
  },
  {
    icon: <Globe size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'JCI Accredited Hospitals',
    subtext: 'International patient safety benchmarks',
    logo: '/jci-logo.png'
  },
  {
    icon: <CheckCircle size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'NABL Accredited',
    subtext: 'India’s quality norms',
    logo: 'https://5.imimg.com/data5/SELLER/Default/2021/11/BA/RJ/RG/12721105/nabl-calibration-laboratories-certification-500x500-1000x1000.jpg'
  },
  {
    icon: <CheckCircle size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'CAP Accredited',
    subtext: 'India’s quality norms',
    logo: 'https://preview.thenewsmarket.com/Previews/COAP/StillAssets/1920x1440/687593.jpg'
  },
  {
    icon: <Award size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'JCI Enterprise',
    subtext: 'Network-wide global quality standard',
  },
  {
    icon: <Activity size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '8000+',
    subtext: 'Cancer Surgeries Performed Annually',
  },
  {
    icon: <Users size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '4000+',
    subtext: 'Doctors and teams trained on standard protocols',
  },
  {
    icon: <Cpu size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '1200+',
    subtext: 'Robotic Surgeries Performed Till Date',
  },
];

function PointItem({ point, globalIndex }: { point: any, globalIndex: number }) {
  const isAccredited = point.title.includes('Accredited');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: globalIndex * 0.08 }}
      className="point-item"
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        background: '#fafcfe',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid rgba(0, 114, 206, 0.25)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
        aspectRatio: isAccredited ? '3 / 2' : 'auto'
      }}
    >
      {point.logo && (
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <img src={point.logo} alt={`${point.title} logo`} style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
        </div>
      )}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: '8px', textAlign: 'left' }}>
        {point.title}
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'left' }}>
        {point.subtext}
      </p>
    </motion.div>
  );
}

export default function WhyChooseNH() {
  return (
    <section id="why-choose-nh" className="section-white section-pad" aria-label="Why Choose Narayana Health">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 14 }}>
            Best in Healthcare
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            Why Choose Narayana Health?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Where your health & well-being comes first, always!
          </p>
        </motion.div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '40px', alignItems: 'center' }} className="why-nh-grid">
          
          {/* Left Side: Points Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, minmax(200px, 260px))', 
              gap: '20px',
              justifyContent: 'start'
            }}
            className="points-container"
          >
            {allPoints.map((point, i) => (
              <PointItem key={i} point={point} globalIndex={i} />
            ))}
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image 
              src="/Why NH.png"
              alt="Why Narayana Health"
              width={750}
              height={750}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .why-nh-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .points-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
