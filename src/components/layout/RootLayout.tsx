import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';
import { SkipLink } from './SkipLink';
import { pageTransition } from '../../lib/motion';

export function RootLayout() {
  const location = useLocation();
  const [routeAnnouncement, setRouteAnnouncement] = useState('');

  // Hide mobile action bar on routes that provide their own custom action bar (e.g., property detail)
  const isDetailPage = location.pathname.startsWith('/properties/') && location.pathname !== '/properties';

  // Announce route changes to screen readers politely
  useEffect(() => {
    // Delay slightly so document.title set by the page component takes effect
    const timer = setTimeout(() => {
      setRouteAnnouncement(`Navigated to ${document.title}`);
    }, 120);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <SkipLink />

      {/* Screen Reader Route Announcer */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {routeAnnouncement}
      </div>

      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          outline: 'none',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileActionBar hidden={isDetailPage} />
    </div>
  );
}
