'use client';
import React from 'react';

interface BadgeProps {
  variant?: 'speciality' | 'available' | 'unavailable' | 'location' | 'category' | 'accreditation' | 'featured' | 'new';
  children: React.ReactNode;
  className?: string;
}

const badgeStyles: Record<string, React.CSSProperties> = {
  speciality: {
    background: 'var(--nh-blue-5)',
    color: 'var(--nh-blue)',
    border: '1px solid var(--nh-blue-20)',
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  },
  available: {
    background: '#E8F5E9',
    color: 'var(--success-green)',
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
  },
  unavailable: {
    background: '#F5F5F5',
    color: 'var(--text-muted)',
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
  },
  location: {
    background: 'transparent',
    color: 'var(--text-muted)',
    padding: '0',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  category: {
    background: 'var(--nh-blue-5)',
    color: 'var(--nh-blue)',
    padding: '2px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    display: 'inline-block',
  },
  accreditation: {
    background: 'var(--nh-blue)',
    color: '#fff',
    padding: '3px 10px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    display: 'inline-block',
  },
  featured: {
    background: 'var(--nh-red)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'inline-block',
  },
  new: {
    background: 'var(--warning-amber)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    display: 'inline-block',
  },
};

export default function Badge({ variant = 'speciality', children, className }: BadgeProps) {
  return (
    <span style={badgeStyles[variant]} className={className}>
      {variant === 'available' && (
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success-green)', display: 'inline-block', flexShrink: 0 }} />
      )}
      {variant === 'unavailable' && (
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block', flexShrink: 0 }} />
      )}
      {children}
    </span>
  );
}
