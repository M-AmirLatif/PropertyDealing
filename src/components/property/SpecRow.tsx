import { Bed, Bath, Maximize2, Building } from 'lucide-react';
import { formatArea } from '../../lib/format';
import type { Property } from '../../types';

interface SpecRowProps {
  property: Property;
  className?: string;
  isMuted?: boolean;
}

export function SpecRow({ property, className = '', isMuted = false }: SpecRowProps) {
  const isCommercial = property.type === 'commercial';
  const textColor = isMuted ? 'var(--text-muted)' : 'var(--charcoal-700)';

  return (
    <div
      className={`spec-row ${className}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(10px, 2vw, 16px)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.04em',
        color: textColor,
        textTransform: 'uppercase',
      }}
    >
      {/* Covered Area */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <Maximize2 size={13} style={{ color: 'var(--copper-600)', flexShrink: 0 }} />
        <span>{formatArea(property.coveredArea)}</span>
      </div>

      {/* Bedrooms (non-commercial only) */}
      {!isCommercial && property.bedrooms !== null && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Bed size={14} style={{ color: 'var(--copper-600)', flexShrink: 0 }} />
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
        </div>
      )}

      {/* Bathrooms (non-commercial only) */}
      {!isCommercial && property.bathrooms !== null && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Bath size={13} style={{ color: 'var(--copper-600)', flexShrink: 0 }} />
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
        </div>
      )}

      {/* Commercial Type Identifier */}
      {isCommercial && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Building size={13} style={{ color: 'var(--copper-600)', flexShrink: 0 }} />
          <span>Commercial Use</span>
        </div>
      )}

      {/* Plot Size for houses / portions if available */}
      {property.plotSize && (
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.6875rem',
            borderLeft: '1px solid var(--border)',
            paddingLeft: '10px',
          }}
        >
          {property.plotSize} Plot
        </span>
      )}
    </div>
  );
}
