// ============================================================
// NARAYANA HEALTH — FRAMER MOTION PRESETS
// Based on NH Design System motion principles
// ============================================================

import { Variants, MotionProps } from 'framer-motion';

// ── ENTRANCE ANIMATIONS ──────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }
  }
};

// ── STAGGER CONTAINERS ───────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// ── HOVER EFFECTS ─────────────────────────────────────────────

export const hoverLift: MotionProps = {
  whileHover: {
    y: -4,
    boxShadow: '0 10px 15px rgba(3, 78, 162, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08)',
    transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const hoverScale: MotionProps = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const hoverImageZoom: MotionProps = {
  whileHover: {
    scale: 1.06,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }
  }
};

// ── SCROLL REVEAL (use with useInView) ───────────────────────
// viewport={{ once: true, margin: '-80px' }}

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }
  }
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }
  }
};

// ── NAVIGATION / OVERLAY ─────────────────────────────────────

export const mobileDrawer: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.25, ease: [0.4, 0.0, 1, 1] }
  }
};

export const dropdownMenu: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: 0.15, ease: [0.4, 0.0, 1, 1] }
  }
};

export const overlayBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// ── COMMON VIEWPORT CONFIG ────────────────────────────────────

export const viewportOnce = { once: true, margin: '-80px' };
export const viewportRepeat = { once: false, margin: '-60px' };
