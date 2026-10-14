import type { Property } from '../../types';
import { formatArea } from '../../lib/format';

interface SpecStripProps {
  property: Property;
}

export function SpecStrip({ property }: SpecStripProps) {
  const isCommercial = property.type === 'commercial';
  const showBedsAndBaths = !isCommercial && property.bedrooms !== null;

  return (
    <div
      role="region"
      aria-label="Key property specifications"
      className="hairline-top hairline-bottom"
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'var(--space-4) var(--space-2)',
        margin: 'var(--space-6) 0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(130px, 1fr))`,
          gap: 'var(--space-4)',
        }}
      >
        {/* Bedrooms (Omitted for commercial or null) */}
        {showBedsAndBaths && (
          <div>
            <span
              className="label"
              style={{
                display: 'block',
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                marginBottom: '2px',
              }}
            >
              BEDROOMS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-heading)',
              }}
            >
              {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
            </span>
          </div>
        )}

        {/* Bathrooms (Omitted for commercial or null) */}
        {showBedsAndBaths && property.bathrooms !== null && (
          <div>
            <span
              className="label"
              style={{
                display: 'block',
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                marginBottom: '2px',
              }}
            >
              BATHROOMS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-heading)',
              }}
            >
              {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
          </div>
        )}

        {/* Covered Area */}
        <div>
          <span
            className="label"
            style={{
              display: 'block',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              marginBottom: '2px',
            }}
          >
            COVERED AREA
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
            }}
          >
            {formatArea(property.coveredArea)}
          </span>
        </div>

        {/* Plot Size (if present) */}
        {property.plotSize && (
          <div>
            <span
              className="label"
              style={{
                display: 'block',
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                marginBottom: '2px',
              }}
            >
              PLOT SIZE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-heading)',
              }}
            >
              {property.plotSize}
            </span>
          </div>
        )}

        {/* Furnished State */}
        <div>
          <span
            className="label"
            style={{
              display: 'block',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              marginBottom: '2px',
            }}
          >
            FURNISHING
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 600,
              color: property.furnished ? 'var(--forest-900)' : 'var(--text-heading)',
            }}
          >
            {property.furnished ? 'Furnished' : 'Unfurnished'}
          </span>
        </div>

        {/* Typology */}
        <div>
          <span
            className="label"
            style={{
              display: 'block',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              marginBottom: '2px',
            }}
          >
            CATEGORY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
              textTransform: 'capitalize',
            }}
          >
            {property.type}
          </span>
        </div>
      </div>
    </div>
  );
}
