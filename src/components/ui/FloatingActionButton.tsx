'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Action {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ACTIONS: Action[] = [
  {
    label: 'Book Appointment',
    href: '/find-a-doctor',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    label: 'Book Health Check-up',
    href: '/health-checks',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Find a Hospital',
    href: '/find-a-doctor',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <path d="M12 5v6M9 8h6" />
      </svg>
    ),
  },
];

const Chevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function FloatingActionButton() {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById('specialities-section');
      if (target) {
        setVisible(target.getBoundingClientRect().top <= window.innerHeight);
      } else {
        setVisible(window.scrollY > window.innerHeight * 0.75);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick health actions"
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 3vh, 28px)',
        left: '50%',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(40px)',
        zIndex: 9000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: visible ? 'auto' : 'none',
        /* pill bar — width = fit-content so it sizes to its children */
        width: 'max-content',
        background: 'linear-gradient(160deg, #ED1C24 0%, #c21219 100%)',
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(198,18,25,0.42), 0 2px 12px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {ACTIONS.map((action, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <React.Fragment key={action.label}>
            <Link
              href={action.href}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 9,
                padding: '17px 18px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, sans-serif',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                background: isHovered ? 'rgba(255,255,255,0.13)' : 'transparent',
                transition: 'background 0.16s ease',
                cursor: 'pointer',
              }}
            >
              {/* Icon bubble */}
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.16s ease',
                }}
              >
                {action.icon}
              </span>

              {/* Label */}
              <span style={{ flexShrink: 0 }}>{action.label}</span>

              {/* Chevron */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.7,
                  flexShrink: 0,
                  transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                  transition: 'transform 0.16s ease, opacity 0.16s ease',
                }}
              >
                <Chevron />
              </span>
            </Link>

            {/* Vertical white divider */}
            {i < ACTIONS.length - 1 && (
              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  background: 'rgba(255,255,255,0.22)',
                  margin: '10px 0',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
