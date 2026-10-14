import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../types';
import { formatRent, formatRelativeListed, padRef } from '../../lib/format';
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

  const surveyCaption = `REF ${padRef(property.refNo)} · ${property.area.toUpperCase()}`;

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
        height: variant === 'lead' ? '100%' : 'auto',
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
          flexShrink: variant === 'lead' ? 1 : 0,
          flexGrow: variant === 'lead' ? 1 : 0,
          display: variant === 'lead' ? 'flex' : undefined,
          flexDirection: variant === 'lead' ? 'column' : undefined,
          minHeight: variant === 'lead' ? '360px' : undefined,
        }}
      >
        <SurveyFrame
          caption={variant !== 'row' ? surveyCaption : undefined}
          aspectRatio={variant === 'lead' ? 'none' : aspectRatio}
          markColor={isCardHovered ? 'brass' : 'muted'}
          style={{
            padding: '8px',
            flex: variant === 'lead' ? '1 1 auto' : undefined,
            display: variant === 'lead' ? 'flex' : undefined,
            flexDirection: variant === 'lead' ? 'column' : undefined,
          }}
        >
          <div
            className="property-card-img-zoom"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              flex: variant === 'lead' ? '1 1 auto' : undefined,
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
            <StatusBadge status={property.status} availableFrom={property.availableFrom} compact />
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
          padding: 'clamp(1rem, 3vw, var(--space-5))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: variant === 'lead' ? '0 0 auto' : 1,
          gap: 'var(--space-3)',
        }}
      >
        <div>
          {/* Top Metadata Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              marginBottom: 'var(--space-2)',
            }}
          >
            <span
              className="label"
              style={{
                color: 'var(--copper-600)',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                lineHeight: 1.3,
              }}
            >
              {property.area}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.3,
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
              lineHeight: 1.3,
              color: isRented ? 'var(--charcoal-500)' : 'var(--text-heading)',
              margin: '0 0 var(--space-3) 0',
              fontWeight: 500,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
            }}
          >
            {property.title}
          </h3>

          {/* Spec Row (Bed/Bath/Area) */}
          <SpecRow property={property} isMuted={isRented} />

          {/* Lead Variant Extra: Description Excerpt & Amenity Chips */}
          {variant === 'lead' && (
            <div
              style={{
                marginTop: 'var(--space-3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              {property.description?.[0] && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: 'var(--text-muted)',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {property.description[0]}
                </p>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: '2px',
                  }}
                >
                  {property.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        backgroundColor: 'var(--ivory-200)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-default)',
                        fontSize: '0.6875rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-body)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description Excerpt for Compact Cards (ensures uniform balanced content) */}
          {variant === 'compact' && property.description?.[0] && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                lineHeight: 1.45,
                color: 'var(--text-muted)',
                margin: 'var(--space-2) 0 0 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {property.description[0]}
            </p>
          )}

          {/* Compact Variant Amenity Chips (prevents empty white space) */}
          {variant === 'compact' && property.amenities && property.amenities.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: 'var(--space-2)',
              }}
            >
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 7px',
                    backgroundColor: 'var(--ivory-200)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-body)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Price and Reference Row */}
        <div
          className="hairline-top"
          style={{
            marginTop: variant === 'lead' ? 'auto' : 'var(--space-4)',
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
            REF {padRef(property.refNo)}
          </span>
        </div>
      </div>
    </article>
  );
}
