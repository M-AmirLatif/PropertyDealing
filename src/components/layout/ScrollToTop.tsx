import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHashTarget } from '../../lib/scroll';

/**
 * ScrollToTop component that automatically scrolls the window to top on route change,
 * except when an anchor hash is present in the route.
 */
export function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const scrollToTarget = (state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollToTarget) {
      scrollToHashTarget(scrollToTarget, 50);
      return;
    }

    if (hash && hash !== '#' && !hash.startsWith('#/')) {
      scrollToHashTarget(hash);
      return;
    }
    // Instant scroll to top to prevent header clipping or interrupted smooth-scrolls
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Additional raf and delayed reset to catch lazy-loading or AnimatePresence mode="wait" unmounts
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    const timerId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [pathname, hash]);

  return null;
}
