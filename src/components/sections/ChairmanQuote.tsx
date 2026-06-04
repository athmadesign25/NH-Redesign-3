'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { viewportOnce } from '@/lib/motion';

export default function ChairmanQuote() {
  const [imgError, setImgError] = useState(false);

  return (
    <section 
      id="chairman-quote" 
      aria-label="Chairman Quote"
      style={{ 
        background: 'linear-gradient(135deg, #eaf4fc 0%, #f9fcff 50%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Optional faint background texture or blur blobs can go here */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(3, 78, 162, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container relative z-10" style={{ paddingTop: '80px', paddingBottom: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }} className="quote-grid">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ paddingBottom: '80px' }}
          >
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 42px)', 
              fontWeight: 700, 
              color: 'var(--nh-black)', 
              lineHeight: 1.25, 
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}>
              "If a healthcare solution is not affordable, it is not a solution."
            </h2>
            
            <p style={{ 
              fontSize: '16px', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6, 
              marginBottom: '48px', 
              maxWidth: '600px'
            }}>
              The future lies in integrated systems that unite clinical excellence, digital intelligence, and human insight. When technology and care move as one, health shifts from episodic treatment to lifelong partnership, anticipating risk, enabling prevention, and creating a system that is connected, predictive, and truly transformative.
            </p>

            <div>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 500 }}>
                Take Care
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: '4px' }}>
                Dr. Devi Prasad Shetty
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Founder and Chairman
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'flex-end',
              height: '100%',
              position: 'relative'
            }}
          >
            {!imgError ? (
              <Image 
                src="/dr-devi-shetty.png" 
                alt="Dr. Devi Prasad Shetty"
                width={600}
                height={700}
                style={{ 
                  objectFit: 'contain', 
                  objectPosition: 'bottom',
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '650px',
                  display: 'block'
                }}
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              // Fallback placeholder if image is missing
              <div style={{
                width: '100%',
                height: '600px',
                background: 'rgba(3, 78, 162, 0.05)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '14px',
                border: '1px dashed rgba(3, 78, 162, 0.2)',
                borderBottom: 'none'
              }}>
                [ Chairman Image Placeholder: /images/chairman.png ]
              </div>
            )}
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .quote-grid > div:first-child {
            padding-bottom: 0 !important;
            padding-top: 40px !important;
            text-align: center;
          }
          .quote-grid > div:first-child p {
            margin-left: auto;
            margin-right: auto;
          }
          .quote-grid > div:last-child {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
