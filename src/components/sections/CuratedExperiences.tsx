'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { viewportOnce } from '@/lib/motion';

const experiences = [
  {
    id: 1,
    category: '5,50,000+ Consultations annually',
    title: 'Cardiac Sciences',
    description: 'High-precision heart care—advanced procedures, surgery and critical care under one team.',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
    link: '/specialities/cardiology'
  },
  {
    id: 2,
    category: '2,30,000+ Consultations annually',
    title: 'Cancer Care',
    description: 'Comprehensive cancer care—multidisciplinary experts with advanced treatment and follow-up.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    link: '/specialities/oncology'
  },
  {
    id: 3,
    category: '2,20,000 Consultations Annually',
    title: 'Neuro Sciences',
    description: 'Expert neuro care—stroke, spine and complex neurosurgery backed by neuro-ICU and rehab.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    link: '/specialities/neurology'
  },
  {
    id: 4,
    category: '1,70,000 Consultations Annually',
    title: 'Gastro Sciences',
    description: 'Advanced gastro care—endoscopy, GI surgery, liver care and transplant support in one centre.',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800',
    link: '/specialities/gastroenterology'
  },
  {
    id: 5,
    category: '1,60,000+ Consultations annually',
    title: 'Orthopaedics',
    description: 'Specialist orthopaedics—joint replacement, sports injury and complex trauma care with rehab.',
    image: '/images/orthopedics_card.png',
    link: '/specialities/orthopaedics'
  }
];

export default function CuratedExperiences() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.firstElementChild?.clientWidth || 400;
      const gap = 24; // var(--space-6)
      const scrollAmount = itemWidth + gap;
      const setWidth = scrollAmount * experiences.length;
      
      if (direction === 'right') {
        // Seamless infinite loop: if we've scrolled past one full set, instantly jump back one set
        if (container.scrollLeft >= setWidth) {
          container.scrollLeft -= setWidth;
        }
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        // Same for scrolling left
        if (container.scrollLeft <= 0) {
          container.scrollLeft += setWidth;
        }
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      scroll('right');
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="section-sand section-pad" aria-label="Curated Health Destinations" style={{ overflowX: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      <div>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-8)', padding: '0 var(--space-4)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: '16px', lineHeight: 1.2 }}>
              Centers of Excellence
            </h2>
            <p style={{ fontSize: '22px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
              Trusted care for 25+ years
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div 
          style={{ position: 'relative', width: '100%', padding: '0 40px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Controls */}
          <div style={{ position: 'absolute', top: '40%', left: '16px', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 32px)', pointerEvents: 'none' }}>
            <button 
              onClick={() => scroll('left')}
              aria-label="Previous slide"
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: 'var(--text-primary)', pointerEvents: 'auto', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--nh-blue)'; e.currentTarget.style.borderColor = 'var(--nh-blue)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-light)'; }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              aria-label="Next slide"
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: 'var(--text-primary)', pointerEvents: 'auto', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--nh-blue)'; e.currentTarget.style.borderColor = 'var(--nh-blue)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-light)'; }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Cards Scrollable Area */}
          <div 
            ref={scrollRef}
            style={{ 
              display: 'flex', 
              gap: 'var(--space-6)', 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              paddingBottom: 'var(--space-6)',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
            className="hide-scrollbar"
          >
            {[...experiences, ...experiences, ...experiences].map((exp, i) => (
              <motion.div
                key={`${exp.id}-${i}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  flexShrink: 0, 
                  width: 'calc(33.333% - 16px)', 
                  minWidth: '320px',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Link href={exp.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div 
                    style={{ 
                      background: '#000', 
                      borderRadius: '16px', 
                      overflow: 'hidden', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                      height: '520px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Background Image & Gradient */}
                    <img 
                      src={exp.image} 
                      alt={exp.title} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', zIndex: 0 }} 
                    />
                    {/* Content Box */}
                    <div style={{ position: 'relative', zIndex: 2, padding: 'var(--space-4)' }}>
                      <div style={{ 
                        background: 'rgba(255, 255, 255, 0.85)', 
                        backdropFilter: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '12px',
                        padding: 'var(--space-5)', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--nh-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                          {exp.category}
                        </div>
                        
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: '12px', lineHeight: 1.2 }}>
                          {exp.title}
                        </h3>
                        
                        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {exp.description}
                        </p>
                        
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--nh-blue)', fontWeight: 600, fontSize: '15px' }}>
                          Know more <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1200px) {
          [aria-label="Curated Health Destinations"] .hide-scrollbar > div {
            width: calc(50% - 12px) !important;
          }
        }
        @media (max-width: 768px) {
          [aria-label="Curated Health Destinations"] .hide-scrollbar > div {
            width: 85% !important;
          }
        }
      `}</style>
    </section>
  );
}
