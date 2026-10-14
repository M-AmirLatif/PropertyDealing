import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../types';
import { formatRent, formatRelativeListed, padRef, formatArea } from '../../lib/format';
import { SurveyFrame } from '../ui/SurveyFrame';
import { Badge } from '../ui/Badge';
import { SurveyImage } from './SurveyImage';
import { StatusBadge } from './StatusBadge';
import { FavoriteButton } from './FavoriteButton';
import { SpecRow } from './SpecRow';

export type PropertyCardVariant = 'lead' | 'compact' | 'row';

interface PropertyCardProps {
  property: Property;
  variant?: PropertyCardVariant;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PropertyCard({
  property,
  variant = 'compact',
  priority = false,
  className = '',
  style,
}: PropertyCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isRented = property.status === 'rented';

  const coverImage = property.images[0] || {
    src: '/images/site/hero.webp',
    srcSmall: '/images/site/hero-sm.webp',
    alt: property.title,
    position: '50% 50%',
  };

  const surveyCaption = `REF ${padRef(property.refNo)} · ${property.area.toUpperCase()} · ${formatArea(property.coveredArea).toUpperCase()}`;

  // Image aspect ratios based on variant
  const aspectRatio = variant === 'lead' ? '16/10' : variant === 'row' ? '4/3' : '16/10';

  return (
    <article
      className={`property-card property-card--${variant} ${isRented ? 'property-card--rented' : ''} ${className}`.trim()}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: variant === 'row' ? 'row' : 'column',
        transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
        boxShadow: isCardHovered
          ? '0 12px 28px -10px rgba(24, 26, 23, 0.12)'
          : '0 2px 6px rgba(24, 26, 23, 0.04)',
        borderColor: isCardHovered ? 'var(--border-strong)' : 'var(--border)',
        opacity: isRented ? 0.92 : 1,
        ...style,
      }}
    >
      {/* Whole card link target */}
      <Link
        to={`/properties/${property.slug}`}
        aria-label={`${property.title}, in ${property.area}, rent ${formatRent(property.rentPKR)}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          textIndent: '-9999px',
        }}
      >
        {property.title}
      </Link>

      {/* Visual Image Section with Survey Frame */}
      <div
        style={{
          position: 'relative',
          width: variant === 'row' ? 'clamp(240px, 35%, 340px)' : '100%',
          flexShrink: 0,
        }}
      >
        <SurveyFrame
          caption={variant !== 'row' ? surveyCaption : undefined}
          aspectRatio={aspectRatio}
          markColor={isCardHovered ? 'brass' : 'muted'}
          style={{ padding: '8px' }}
        >
          <div
            className="property-card-img-zoom"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              filter: isRented ? 'grayscale(30%)' : 'none',
              transition: 'transform 400ms var(--ease-out), filter 400ms var(--ease-out)',
            }}
          >
            <SurveyImage
              src={coverImage.src}
              srcSmall={coverImage.srcSmall}
              alt={coverImage.alt}
              position={coverImage.position}
              priority={priority}
            />
          </div>

          {/* Overlaid Badges */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <StatusBadge status={property.status} availableFrom={property.availableFrom} />
            {property.furnished && (
              <Badge variant="furnished">Furnished</Badge>
            )}
            {property.featured && !isRented && (
              <Badge variant="featured">Featured</Badge>
            )}
          </div>

          {/* Overlaid Favorite Button */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 4,
            }}
          >
            <FavoriteButton
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>
        </SurveyFrame>
      </div>

      {/* Content Details Block */}
      <div
        style={{
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          gap: 'var(--space-3)',
        }}
      >
        <div>
          {/* Top Metadata Line */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-2)',
            }}
          >
            <span
              className="label"
              style={{
                color: 'var(--copper-600)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {property.area} · {property.city}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
            >
              {formatRelativeListed(property.listedOn)}
            </span>
          </div>

          {/* Property Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: variant === 'lead' ? 'var(--fs-h2)' : '1.25rem',
              lineHeight: 1.25,
              color: isRented ? 'var(--charcoal-500)' : 'var(--text-heading)',
              margin: '0 0 var(--space-3) 0',
              fontWeight: 500,
            }}
          >
            {property.title}
          </h3>

          {/* Spec Row (Bed/Bath/Area) */}
          <SpecRow property={property} isMuted={isRented} />
        </div>

        {/* Bottom Price and Reference Row */}
        <div
          className="hairline-top"
          style={{
            paddingTop: 'var(--space-3)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 'var(--space-2)',
          }}
        >
          <div>
            <span
              className="label"
              style={{
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                display: 'block',
              }}
            >
              Monthly Rent
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: variant === 'lead' ? '1.75rem' : '1.35rem',
                fontWeight: 600,
                color: isRented ? 'var(--charcoal-500)' : 'var(--text-heading)',
                letterSpacing: '-0.01em',
              }}
            >
              {formatRent(property.rentPKR)}
            </span>
          </div>

          <span
            className="label"
            style={{
              color: isCardHovered ? 'var(--brass-500)' : 'var(--line-strong)',
              transition: 'color var(--duration-fast) var(--ease-out)',
              fontSize: '0.72rem',
            }}
          >
            INDEX #{padRef(property.refNo)}
          </span>
        </div>
      </div>
    </article>
  );
}
