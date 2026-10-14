import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MessageSquare } from 'lucide-react';
import { useWhatsApp } from '../../context/WhatsAppContext';

interface MobileActionBarProps {
  hidden?: boolean;
}

export function MobileActionBar({ hidden = false }: MobileActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { openWhatsApp } = useWhatsApp();

  useEffect(() => {
    const handleScroll = () => {
      // Appear after ~200px scroll
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mobile-action-bar"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
            backgroundColor: 'rgba(251, 248, 242, 0.95)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid var(--border)',
            padding: '10px 16px',
            paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            boxShadow: '0 -4px 20px rgba(24, 26, 23, 0.08)',
          }}
        >
          <Link
            to="/properties"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '46px',
              backgroundColor: 'var(--forest-900)',
              color: 'var(--text-on-dark)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-default)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Search size={15} />
            <span>Browse</span>
          </Link>

          <button
            type="button"
            onClick={() => openWhatsApp()}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '46px',
              backgroundColor: 'var(--whatsapp)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-default)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
