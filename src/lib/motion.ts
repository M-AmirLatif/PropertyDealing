import type { Transition, Variants } from 'motion/react';

/**
 * Plot Index Motion Tokens & Animation Choreography
 * Disciplined, architectural motion adhering strictly to opacity & transform.
 * Designed to satisfy WCAG 2.2 and respect prefers-reduced-motion.
 */

export const easings = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  gentle: [0.16, 1, 0.3, 1] as const,
  snappy: [0.32, 0.72, 0, 1] as const,
};

export const durations = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2, // Page transitions capped at <= 200ms
  reveal: 0.3,
  slide: 0.28, // Drawers/sheets capped at <= 300ms
};

export const springs = {
  tight: { type: 'spring', stiffness: 350, damping: 30 } as Transition,
  gentle: { type: 'spring', stiffness: 200, damping: 25 } as Transition,
  pop: { type: 'spring', stiffness: 450, damping: 20 } as Transition,
};

export const transitions = {
  pageFade: { duration: durations.normal, ease: easings.easeOut } as Transition,
  sectionReveal: { duration: durations.reveal, ease: easings.easeOut } as Transition,
  quick: { duration: durations.fast, ease: easings.easeOut } as Transition,
  pop: springs.pop,
};

/**
 * 1. Page Transition (Fade <= 200ms with NO exit delay)
 */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.pageFade },
  exit: { opacity: 0, transition: { duration: 0.12, ease: 'easeOut' } },
};

/**
 * 2. Section Reveal (Once-only with 16px rise)
 */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.sectionReveal,
  },
};

/**
 * 3. Stagger Container (<= 70ms per item, capped at 6 items)
 */
export const staggerList = (staggerDelay = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: Math.min(staggerDelay, 0.07),
      delayChildren: 0.02,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easings.easeOut },
  },
};

/**
 * 4. Button Pressed State (Scale 0.98 / 100ms)
 */
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

/**
 * 5. Favorite Button Pop Animation
 */
export const favoritePop: Variants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.25, 1],
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

/**
 * 6. Gallery / Lightbox Crossfade
 */
export const lightboxFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } },
};

/**
 * 7. Drawer / Sheet Slide (<= 300ms)
 */
export const drawerSlide: Variants = {
  closed: { x: '100%', opacity: 0 },
  open: {
    x: '0%',
    opacity: 1,
    transition: { duration: durations.slide, ease: easings.easeOut },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// Aliases for backward compatibility
export const fadeIn = pageTransition;
export const slideUp = sectionReveal;
export const staggerContainer = staggerList;
