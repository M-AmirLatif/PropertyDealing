import { MessageSquare } from 'lucide-react';
import type { Property } from '../../types';
import { formatRent } from '../../lib/format';
import {
  buildPropertyInquiryMessage,
  buildSimilarMessage,
} from '../../lib/whatsapp';
import { useWhatsApp } from '../../context/WhatsAppContext';
import { Button } from '../ui/Button';

interface MobileContactBarProps {
  property: Property;
}

export function MobileContactBar({ property }: MobileContactBarProps) {
  const { openWhatsApp } = useWhatsApp();
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const isRented = property.status === 'rented';

  const handleClick = () => {
    if (isRented) {
      openWhatsApp(buildSimilarMessage(property));
    } else {
      openWhatsApp(buildPropertyInquiryMessage(property, pageUrl));
    }
  };

  return (
    <div
      className="mobile-property-contact-bar"
      style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(251, 248, 242, 0.96)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--border-strong)',
        padding: '10px 16px max(10px, env(safe-area-inset-bottom, 10px)) 16px',
        boxShadow: '0 -4px 16px rgba(24, 26, 23, 0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        <div>
          <span
            className="label"
            style={{
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              display: 'block',
              lineHeight: 1,
            }}
          >
            MONTHLY RENT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: isRented ? 'var(--charcoal-500)' : 'var(--text-heading)',
            }}
          >
            {formatRent(property.rentPKR)}
          </span>
        </div>

        <Button
          type="button"
          variant="whatsapp"
          size="md"
          onClick={handleClick}
          style={{ flexShrink: 0, height: '44px' }}
        >
          <MessageSquare size={16} style={{ marginRight: '6px' }} />
          <span>{isRented ? 'Ask similar' : 'WhatsApp'}</span>
        </Button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mobile-property-contact-bar {
            display: block !important;
          }
        }
        @media (min-width: 768px) {
          .mobile-property-contact-bar {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </div>
  );
}
