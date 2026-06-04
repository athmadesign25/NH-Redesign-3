'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'emergency' | 'text' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const sizeStyles = {
  sm: { padding: '8px 20px', fontSize: '13px' },
  md: { padding: '12px 28px', fontSize: '15px' },
  lg: { padding: '16px 36px', fontSize: '16px' },
};

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--nh-blue)',
    color: '#fff',
    border: '2px solid transparent',
    borderRadius: '9999px',
    fontWeight: 'var(--weight-semibold)' as any,
    fontFamily: 'var(--font-stack)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background var(--duration-micro) var(--ease-out), transform 0.15s',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--nh-blue)',
    border: '2px solid var(--nh-blue)',
    borderRadius: '9999px',
    fontWeight: 'var(--weight-semibold)' as any,
    fontFamily: 'var(--font-stack)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all var(--duration-micro) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  emergency: {
    background: 'var(--nh-red)',
    color: '#fff',
    border: '2px solid transparent',
    borderRadius: '9999px',
    fontWeight: 'var(--weight-semibold)' as any,
    fontFamily: 'var(--font-stack)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background var(--duration-micro) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  white: {
    background: '#fff',
    color: 'var(--nh-blue)',
    border: '2px solid #fff',
    borderRadius: '9999px',
    fontWeight: 'var(--weight-semibold)' as any,
    fontFamily: 'var(--font-stack)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all var(--duration-micro) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  text: {
    background: 'transparent',
    color: 'var(--nh-blue)',
    border: 'none',
    padding: '0',
    fontWeight: 'var(--weight-medium)' as any,
    fontFamily: 'var(--font-stack)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
};

const MotionLink = motion(Link);

const hoverVariants: Record<string, any> = {
  primary: { backgroundColor: '#023070' },
  ghost: { backgroundColor: 'var(--nh-blue)', color: '#ffffff', borderColor: 'var(--nh-blue)' },
  emergency: { backgroundColor: '#c0151c' },
  white: { backgroundColor: 'var(--nh-blue-10)' },
  text: { color: 'var(--nh-blue-dark)' },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  disabled,
  fullWidth,
  className,
  style: customStyle,
  type = 'button',
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(fullWidth ? { width: '100%', justifyContent: 'center' } : {}),
    ...(disabled ? { opacity: 0.5, pointerEvents: 'none', cursor: 'not-allowed' } : {}),
    ...customStyle,
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        style={{ ...style, display: fullWidth ? 'flex' : 'inline-flex' }}
        className={className}
        whileHover={!disabled ? hoverVariants[variant] : undefined}
        whileTap={!disabled ? { scale: 0.97 } : undefined}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      style={style}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? hoverVariants[variant] : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      className={className}
    >
      {content}
    </motion.button>
  );
}
