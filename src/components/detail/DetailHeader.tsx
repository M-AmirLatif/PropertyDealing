import { useState } from 'react';
import { Share2, Check, MapPin, Calendar } from 'lucide-react';
import type { Property } from '../../types';
import { formatRent, formatRelativeListed, padRef } from '../../lib/format';
import { StatusBadge } from '../property/StatusBadge';
import { FavoriteButton } from '../property/FavoriteButton';
import { Badge } from '../ui/Badge';

interface DetailHeaderProps {
  property: Property;
}

export function DetailHeader({ property }: DetailHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <header
      style={{
        marginBottom: 'var(--space-5)',
      }}
    >
      {/* Top Metadata Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              letterSpacing: '0.08em',
            }}
          >
            INDEX #{padRef(property.refNo)} · {property.area.toUpperCase()}
          </span>
          <StatusBadge status={property.status} availableFrom={property.availableFrom} />
          {property.furnished && <Badge variant="furnished">Furnished</Badge>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Favorite Toggle Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              padding: '2px 8px 2px 4px',
            }}
          >
            <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
              }}
            >
              Save
            </span>
          </div>

          {/* Share / Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy direct link to this property"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '34px',
              padding: '0 10px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: copied ? 'var(--success)' : 'var(--text-body)',
              cursor: 'pointer',
              transition: 'all var(--duration-fast)',
            }}
          >
            {copied ? (
              <>
                <Check size={13} style={{ color: 'var(--success)' }} />
                <span>Link copied!</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span>Copy link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Title & Rent Block */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-2)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
            lineHeight: 1.2,
            color: 'var(--text-heading)',
            margin: 0,
            maxWidth: '32ch',
            fontWeight: 500,
          }}
        >
          {property.title}
        </h1>

        {/* Large Rent Figure */}
        <div>
          <span
            className="label"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              display: 'block',
              textAlign: 'right',
            }}
          >
            MONTHLY RENT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              fontWeight: 600,
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            {formatRent(property.rentPKR)}
          </span>
        </div>
      </div>

      {/* Location & Listed Date Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-4)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={13} style={{ color: 'var(--copper-600)' }} />
          <span>{property.area}, Lahore</span>
        </span>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={13} style={{ color: 'var(--line-strong)' }} />
          <span>Listed {formatRelativeListed(property.listedOn)}</span>
        </span>
      </div>
    </header>
  );
}
