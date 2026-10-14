import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Bookmark } from 'lucide-react';
import { useWhatsApp } from '../../context/WhatsAppContext';
import { useFavorites } from '../../context/FavoritesContext';
import { SITE, DEMO_DISCLAIMER } from '../../config/site';
import { handleAnchorClick } from '../../lib/scroll';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Locations', path: '/#locations' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'List Your Property', path: '/list-your-property' },
];

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { openWhatsApp } = useWhatsApp();
  const { savedIds } = useFavorites();

  const handleLinkClick = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    onOpenChange(false);
    if (path.includes('#locations')) {
      handleAnchorClick(e, path, location.pathname, navigate);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(24, 26, 23, 0.75)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2000,
                }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-describedby="mobile-menu-desc">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'var(--forest-900)',
                  color: 'var(--text-on-dark)',
                  zIndex: 2001,
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  padding: 'var(--space-5) var(--space-6)',
                  boxSizing: 'border-box',
                }}
              >
                {/* Header inside mobile menu */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 'var(--space-4)',
                    borderBottom: '1px solid var(--border-on-dark)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Dialog.Title
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        color: 'var(--ivory-50)',
                        margin: 0,
                      }}
                    >
                      {SITE.dealerName}
                    </Dialog.Title>
                    <span
                      className="label"
                      style={{ color: 'var(--brass-500)', fontSize: '0.625rem', marginTop: '2px' }}
                    >
                      Navigation Index
                    </span>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      style={{
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-on-dark)',
                        borderRadius: 'var(--radius-default)',
                        border: '1px solid var(--border-on-dark)',
                      }}
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                <p id="mobile-menu-desc" className="visually-hidden">
                  Mobile navigation menu for {SITE.dealerName}
                </p>

                {/* Staggered Navigation Links */}
                <nav
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-6)',
                    marginBottom: 'var(--space-6)',
                    flex: 1,
                  }}
                >
                  {NAV_LINKS.map((item, index) => {
                    const isActive =
                      item.path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.path);

                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          to={item.path}
                          onClick={(e) => handleLinkClick(item.path, e)}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            paddingBlock: 'var(--space-2)',
                            textDecoration: 'none',
                            color: isActive ? 'var(--text-brass-on-dark)' : 'var(--text-on-dark)',
                            borderBottom: '1px solid rgba(217, 208, 190, 0.08)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                              lineHeight: 1.15,
                            }}
                          >
                            {item.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--fs-label)',
                              color: 'var(--text-brass-on-dark)',
                              opacity: 0.85,
                            }}
                          >
                            0{index + 1}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Saved Properties Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: NAV_LINKS.length * 0.04,
                      duration: 0.25,
                    }}
                  >
                    <Link
                      to="/saved"
                      onClick={() => onOpenChange(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBlock: 'var(--space-2)',
                        color: 'var(--text-on-dark)',
                        textDecoration: 'none',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                        }}
                      >
                        <Bookmark size={18} style={{ color: 'var(--text-brass-on-dark)' }} />
                        Saved Properties
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--fs-label)',
                          backgroundColor: 'rgba(212, 176, 106, 0.2)',
                          color: 'var(--text-brass-on-dark)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                        }}
                      >
                        {savedIds.length}
                      </span>
                    </Link>
                  </motion.div>
                </nav>

                {/* Bottom Actions & WhatsApp */}
                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-on-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      openWhatsApp();
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-3) var(--space-5)',
                      backgroundColor: 'var(--whatsapp)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      borderRadius: 'var(--radius-default)',
                      minHeight: '48px',
                      cursor: 'pointer',
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--olive-200)',
                      lineHeight: 1.4,
                      textAlign: 'center',
                      marginTop: 'var(--space-2)',
                    }}
                  >
                    {DEMO_DISCLAIMER}
                  </p>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
