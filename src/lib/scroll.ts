import type React from 'react';
import type { NavigateFunction } from 'react-router-dom';

/**
 * Smoothly scrolls to an element by ID, calculating the exact target offset minus sticky header.
 */
export function scrollToHashTarget(hashOrId: string, delay = 0) {
  const targetId = hashOrId.replace(/^#\/?/, '').replace(/^#/, '');
  if (!targetId) return;

  const doScroll = (attempts = 0) => {
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (attempts < 12) {
      setTimeout(() => doScroll(attempts + 1), 50);
    }
  };

  if (delay > 0) {
    setTimeout(() => doScroll(0), delay);
  } else {
    requestAnimationFrame(() => doScroll(0));
  }
}

/**
 * Intercepts anchor navigation for in-page sections so clicking an anchor link
 * reliably and smoothly scrolls to the target whether on the same page or navigating from another page.
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  to: string,
  currentPathname: string,
  navigate?: NavigateFunction,
  onAfterNavigate?: () => void
) {
  if (to.includes('#locations') || to.endsWith('/locations')) {
    e.preventDefault();
    if (onAfterNavigate) onAfterNavigate();

    if (currentPathname === '/' || currentPathname === '') {
      scrollToHashTarget('locations', 10);
    } else {
      if (navigate) {
        navigate('/', { state: { scrollTo: 'locations' } });
      } else {
        window.location.hash = '#/';
      }
      // Single smooth scroll once the home page is mounted
      scrollToHashTarget('locations', 100);
    }
  }
}
