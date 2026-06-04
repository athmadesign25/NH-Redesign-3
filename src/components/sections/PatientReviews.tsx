'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';


const reviews = [
  {
    id: 1,
    text: "The cardiologists at Narayana Health gave my father a second chance at life. The level of care and attention to detail during his bypass surgery was exceptional. We are forever grateful.",
    name: "Anjali S.",
    title: "Daughter of a Patient",
    initials: "AS",
    color: "#e8f2fc", // Soft blue
    imgUrl: "/images/patient_1.png"
  },
  {
    id: 2,
    text: "I was diagnosed with early-stage breast cancer and the oncology team was with me every step of the way. Their comprehensive approach and empathetic staff made the toughest battle of my life so much easier.",
    name: "Priya M.",
    title: "Cancer Survivor",
    initials: "PM",
    color: "#fce8e8" // Soft red
  },
  {
    id: 3,
    text: "My knee replacement surgery was incredibly smooth. Within a few weeks, I was walking without pain for the first time in years. The physiotherapy team is top-notch!",
    name: "Rajesh K.",
    title: "Orthopaedics Patient",
    initials: "RK",
    color: "#e8fce8", // Soft green
    imgUrl: "/images/patient_2.png"
  },
  {
    id: 4,
    text: "The pediatric team was so gentle and reassuring with my 5-year-old. The facility is extremely child-friendly, which helped reduce our anxiety tremendously. Highly recommended for families.",
    name: "Sunita D.",
    title: "Mother of a Patient",
    initials: "SD",
    color: "#fcf8e8" // Soft yellow
  },
  {
    id: 5,
    text: "From the seamless admission process to the diligent post-op care, every aspect of my stay was handled with utmost professionalism. It truly feels like they put patients first.",
    name: "Vikram P.",
    title: "General Surgery Patient",
    initials: "VP",
    color: "#f4e8fc", // Soft purple
    imgUrl: "/images/patient_3.png"
  }
];

// Duplicate the reviews array to ensure smooth infinite scrolling
const repeatedReviews = [...reviews, ...reviews, ...reviews];

export default function PatientReviews() {
  return (
    <section 
      id="patient-reviews" 
      style={{ 
        backgroundColor: '#fff', 
        padding: '100px 0',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div className="container" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 14 }}>
            Testimonials
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            What people say
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Real Experiences. Real Impact.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          gap: '24px',
          placeItems: 'center',
          // Mask for fading out the left and right edges
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
        }}
        onMouseEnter={(e) => {
          const tracks = e.currentTarget.querySelectorAll('.marquee-track');
          tracks.forEach(t => (t as HTMLElement).style.animationPlayState = 'paused');
        }}
        onMouseLeave={(e) => {
          const tracks = e.currentTarget.querySelectorAll('.marquee-track');
          tracks.forEach(t => (t as HTMLElement).style.animationPlayState = 'running');
        }}
      >
        {/* Render two identical tracks for seamless infinite looping */}
        {[0, 1].map((trackIndex) => (
          <ul 
            key={`track-${trackIndex}`}
            className="marquee-track"
            aria-hidden={trackIndex === 1 ? 'true' : undefined}
            style={{
              display: 'flex',
              width: 'max-content',
              margin: 0,
              padding: '80px 0 40px',
              listStyleType: 'none',
              gap: '24px',
              willChange: 'transform',
              flexShrink: 0,
            }}
          >
            {reviews.map((review, index) => (
              <li 
                key={`${review.id}-${index}`}
                style={{
                  flexShrink: 0,
                  width: '420px',
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '80px 36px 36px',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                }}
                className="review-card"
              >
                {/* Top Center Avatar */}
                <div style={{
                  width: '128px',
                  height: '128px',
                  borderRadius: '50%',
                  background: review.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--nh-black)',
                  overflow: 'hidden',
                  position: 'absolute',
                  top: '-64px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  border: '6px solid #fff',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}>
                  {review.imgUrl ? (
                    <Image 
                      src={review.imgUrl} 
                      alt={review.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    review.initials
                  )}
                </div>

                <div style={{ marginTop: '0px', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: '4px' }}>
                    {review.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {review.title}
                  </p>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <p style={{ 
                    fontSize: '15px', 
                    color: 'var(--text-primary)', 
                    lineHeight: 1.6
                  }}>
                    "{review.text}"
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 24px)); }
        }
        
        .marquee-track {
          animation: scroll-marquee 40s linear infinite;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(3, 78, 162, 0.08) !important;
          border-color: rgba(3, 78, 162, 0.2) !important;
        }

        @media (max-width: 768px) {
          .marquee-track li {
            width: 320px !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
