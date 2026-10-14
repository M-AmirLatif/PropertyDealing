import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bookmark, Menu, MessageSquare } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { MobileMenu } from './MobileMenu';
import { useFavorites } from '../../context/FavoritesContext';
import { useWhatsApp } from '../../context/WhatsAppContext';
import { handleAnchorClick } from '../../lib/scroll';

const NAV_ITEMS = [
  { label: 'Properties', path: '/properties' },
  { label: 'Locations', path: '/#locations' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { savedIds } = useFavorites();
  const { openWhatsApp } = useWhatsApp();

  const [isLocationsInView, setIsLocationsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (location.pathname === '/') {
        const el = document.getElementById('locations');
        if (el) {
          const rect = el.getBoundingClientRect();
          setIsLocationsInView(rect.top <= 250 && rect.bottom >= 150);
        } else {
          setIsLocationsInView(false);
        }
      } else {
        setIsLocationsInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: isScrolled
            ? 'rgba(244, 239, 230, 0.94)'
            : 'var(--ivory-100)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: '1px solid var(--border)',
          transition: 'background-color var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out)',
          boxShadow: isScrolled ? '0 4px 20px -8px rgba(24, 26, 23, 0.08)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px',
          }}
        >
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-6)',
            }}
            className="header-desktop-nav"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/#locations'
                  ? location.pathname === '/' && isLocationsInView
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleAnchorClick(e, item.path, location.pathname, navigate)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--text-heading)' : 'var(--text-body)',
                    fontWeight: 500,
                    padding: '8px 4px',
                    transition: 'color var(--duration-fast) var(--ease-out)',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="header-active-pill"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--copper-600)',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}
            className="header-desktop-actions"
          >
            {/* Saved Properties */}
            <Link
              to="/saved"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-heading)',
                padding: '6px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                transition: 'background-color var(--duration-fast) var(--ease-out)',
              }}
              aria-label={`Saved properties: ${savedIds.length}`}
            >
              <Bookmark size={15} style={{ color: 'var(--copper-600)' }} />
              <span>Saved</span>
              <span
                style={{
                  backgroundColor: 'var(--ivory-200)',
                  color: 'var(--text-heading)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                }}
              >
                {savedIds.length}
              </span>
            </Link>

            {/* WhatsApp CTA */}
            <Button
              variant="whatsapp"
              size="sm"
              onClick={() => openWhatsApp()}
            >
              <MessageSquare size={14} style={{ marginRight: '6px' }} />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
            className="header-mobile-controls"
          >
            <Link
              to="/saved"
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                color: 'var(--text-heading)',
              }}
              aria-label={`Saved properties: ${savedIds.length}`}
            >
              <Bookmark size={20} />
              {savedIds.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    backgroundColor: 'var(--copper-600)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-pill)',
                    width: '16px',
                    height: '16px',
                    fontSize: '0.625rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {savedIds.length}
                </span>
              )}
            </Link>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              variant="outline"
              size="sm"
            >
              <Menu size={20} />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Responsive Visibility Overrides */}
      <style>{`
        @media (min-width: 1024px) {
          .header-desktop-nav {
            display: flex !important;
          }
          .header-desktop-actions {
            display: flex !important;
          }
          .header-mobile-controls {
            display: none !important;
          }
        }
      `}</style>

      {/* Full-screen Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
    </>
  );
}
