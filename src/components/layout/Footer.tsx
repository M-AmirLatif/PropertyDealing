import { Link } from 'react-router-dom';
import { SITE, DEMO_DISCLAIMER } from '../../config/site';
import { Logo } from '../ui/Logo';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { useDealerPhone } from '../../hooks/useDealerPhone';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { callDealer } = useDealerPhone();

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: 'var(--forest-900)',
        color: 'var(--text-on-dark)',
        borderTop: '1px solid var(--border-on-dark)',
        paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        position: 'relative',
        zIndex: 10,
      }}
      data-surface="dark"
    >
      <div className="container">
        {/* Top Wordmark & Identity Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--space-6)',
            paddingBottom: 'var(--space-8)',
            borderBottom: '1px solid var(--border-on-dark)',
          }}
        >
          <div style={{ maxWidth: '420px' }}>
            <Logo isDark />
            <p
              style={{
                fontSize: 'var(--fs-small)',
                color: 'var(--olive-200)',
                lineHeight: '1.6',
                marginTop: 'var(--space-4)',
              }}
            >
              Architectural survey register and rental property advisory in Lahore,
              Pakistan. Assisting with rental portions, family residences,
              and commercial spaces across DHA, Gulberg, and established localities.
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'rgba(251, 248, 242, 0.04)',
              border: '1px solid var(--border-on-dark)',
              borderRadius: 'var(--radius-default)',
              maxWidth: '380px',
            }}
          >
            <div
              className="label"
              style={{
                color: 'var(--text-brass-on-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: 'var(--space-2)',
              }}
            >
              <ShieldCheck size={14} />
              <span>Demonstration Notice</span>
            </div>
            <p
              style={{
                fontSize: '0.785rem',
                color: 'var(--olive-200)',
                lineHeight: '1.5',
              }}
            >
              {DEMO_DISCLAIMER}
            </p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
            borderBottom: '1px solid var(--border-on-dark)',
          }}
        >
          {/* Column 1: Explore */}
          <div>
            <span
              className="label"
              style={{ color: 'var(--text-brass-on-dark)', display: 'block', marginBottom: 'var(--space-4)' }}
            >
              01 · Explore Listings
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li>
                <Link to="/properties" style={{ color: 'var(--text-on-dark)', fontSize: 'var(--fs-small)' }}>
                  All Properties Register
                </Link>
              </li>
              <li>
                <Link to="/properties" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  Lahore Localities
                </Link>
              </li>
              <li>
                <Link to="/properties?type=portion" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  Upper &amp; Lower Portions
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  Houses &amp; Villas
                </Link>
              </li>
              <li>
                <Link to="/list-your-property" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Advisory / Agency */}
          <div>
            <span
              className="label"
              style={{ color: 'var(--text-brass-on-dark)', display: 'block', marginBottom: 'var(--space-4)' }}
            >
              02 · Advisory &amp; Dealer
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li>
                <Link to="/about" style={{ color: 'var(--text-on-dark)', fontSize: 'var(--fs-small)' }}>
                  About Our Practice
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  Office Contact &amp; Inquiry
                </Link>
              </li>
              <li>
                <Link to="/saved" style={{ color: 'var(--olive-200)', fontSize: 'var(--fs-small)' }}>
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/demo-admin" style={{ color: 'var(--text-brass-on-dark)', fontSize: 'var(--fs-small)' }}>
                  Demo Admin Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Placeholders */}
          <div style={{ gridColumn: 'span 1' }}>
            <span
              className="label"
              style={{ color: 'var(--text-brass-on-dark)', display: 'block', marginBottom: 'var(--space-4)' }}
            >
              03 · Office Details
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--fs-small)', color: 'var(--olive-200)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--brass-500)', flexShrink: 0, marginTop: '3px' }} />
                <span>{SITE.address}</span>
              </div>
              <button
                type="button"
                onClick={() => callDealer()}
                aria-label={`Call dealer at ${SITE.phoneDisplay}`}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  color: 'var(--olive-200)',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                <Phone size={16} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
                <span>{SITE.phoneDisplay}</span>
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
                <span>{SITE.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={16} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
                <span>{SITE.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Meta */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-4)',
            fontSize: 'var(--fs-label)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--olive-200)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <div>
            &copy; {currentYear} {SITE.dealerName} · {SITE.city}, {SITE.country}
          </div>
          <div>
            <span>Plot Index Design System</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .site-footer {
            padding-bottom: calc(clamp(2.5rem, 4vw, 4rem) + 68px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
      `}</style>
    </footer>
  );
}
