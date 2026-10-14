import { MessageSquare, Calendar, Phone, AlertCircle, Clock, MapPin } from 'lucide-react';
import type { Property } from '../../types';
import { SITE, hasPhone } from '../../config/site';
import { formatRent } from '../../lib/format';
import {
  buildPropertyInquiryMessage,
  buildViewingMessage,
  buildSimilarMessage,
} from '../../lib/whatsapp';
import { useWhatsApp } from '../../context/WhatsAppContext';
import { Button } from '../ui/Button';
import { StatusBadge } from '../property/StatusBadge';

interface ContactPanelProps {
  property: Property;
}

export function ContactPanel({ property }: ContactPanelProps) {
  const { openWhatsApp } = useWhatsApp();
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const isRented = property.status === 'rented';
  const isAvailableSoon = property.status === 'available-soon';

  const handleInquiryClick = () => {
    if (isRented) {
      openWhatsApp(buildSimilarMessage(property));
    } else {
      openWhatsApp(buildPropertyInquiryMessage(property, pageUrl));
    }
  };

  const handleViewingClick = () => {
    openWhatsApp(buildViewingMessage(property, pageUrl));
  };

  const handleCallClick = () => {
    if (hasPhone && SITE.phoneE164) {
      window.location.href = `tel:${SITE.phoneE164}`;
    } else {
      // Demo dialog explanation
      openWhatsApp(`Assalam-o-Alaikum, I would like to speak by phone regarding "${property.title}" (${property.slug}).`);
    }
  };

  return (
    <aside
      aria-label="Direct dealer contact"
      className="property-contact-panel"
      style={{
        width: '100%',
        maxWidth: '380px',
        position: 'sticky',
        top: '90px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-default)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-overlay)',
      }}
    >
      {/* Rent & Status Header */}
      <div
        style={{
          paddingBottom: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-2)',
          }}
        >
          <span
            className="label"
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.6875rem',
            }}
          >
            MONTHLY DEMAND
          </span>
          <StatusBadge status={property.status} availableFrom={property.availableFrom} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.85rem',
            fontWeight: 600,
            color: isRented ? 'var(--charcoal-500)' : 'var(--text-heading)',
            lineHeight: 1.1,
          }}
        >
          {formatRent(property.rentPKR)}
        </div>
      </div>

      {/* Rented Notice Banner */}
      {isRented && (
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(163, 50, 31, 0.08)',
            border: '1px solid rgba(163, 50, 31, 0.25)',
            borderRadius: 'var(--radius-default)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <AlertCircle size={16} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--danger)' }}>
              This property has been rented
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-body)', lineHeight: 1.4 }}>
              The lease is finalized. You can ask the dealer for similar inventory in {property.area}.
            </span>
          </div>
        </div>
      )}

      {/* Available Soon Date Notice */}
      {isAvailableSoon && property.availableFrom && (
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(176, 138, 78, 0.08)',
            border: '1px solid rgba(176, 138, 78, 0.3)',
            borderRadius: 'var(--radius-default)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Clock size={16} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-heading)' }}>
            Available for occupancy from <strong>{property.availableFrom}</strong>
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* Primary WhatsApp Action */}
        <Button
          type="button"
          variant="whatsapp"
          size="lg"
          onClick={handleInquiryClick}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <MessageSquare size={16} style={{ marginRight: '8px' }} />
          {isRented ? 'Ask about similar properties' : 'Ask about this property'}
        </Button>

        {/* Secondary Viewing Action (Only if not rented) */}
        {!isRented && (
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleViewingClick}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Calendar size={15} style={{ marginRight: '8px' }} />
            Request an accompanied viewing
          </Button>
        )}

        {/* Tertiary Phone Call Action */}
        <button
          type="button"
          onClick={handleCallClick}
          style={{
            height: '40px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--text-heading)',
            cursor: 'pointer',
            transition: 'all var(--duration-fast)',
          }}
        >
          <Phone size={14} style={{ color: 'var(--text-muted)' }} />
          <span>Call the dealer: {SITE.phoneDisplay}</span>
        </button>
      </div>

      {/* Dealer Identity & Advisory Footer */}
      <div
        style={{
          marginTop: 'var(--space-5)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span
          className="label"
          style={{
            fontSize: '0.625rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          PROPERTY DEALER
        </span>
        <strong
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--text-heading)',
            display: 'block',
          }}
        >
          {SITE.dealerName}
        </strong>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            marginTop: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} />
            <span>{SITE.address.display}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={11} />
            <span>{SITE.officeHours}</span>
          </div>
          {SITE.sampleContactDetails && (
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>
              Sample contact details for the demo — to be replaced.
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
