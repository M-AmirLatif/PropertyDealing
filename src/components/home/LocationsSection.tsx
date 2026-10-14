import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '../ui/Container';
import { SurveyFrame } from '../ui/SurveyFrame';
import { SurveyImage } from '../property/SurveyImage';
import { KASUR_AREAS, getAreaPropertyCount } from '../../data/areas';
import { usePropertiesStore } from '../../context/PropertiesContext';
import { HOME_CONTENT } from '../../content/home';

export function LocationsSection() {
  const { properties } = usePropertiesStore();
  const [activeAreaSlug, setActiveAreaSlug] = useState(KASUR_AREAS[0].slug);

  // All 9 Kasur areas for the editorial list
  const primaryAreas = KASUR_AREAS;

  const activeArea = primaryAreas.find((a) => a.slug === activeAreaSlug) || primaryAreas[0];
  const activeCoverProp = properties.find((p) => p.id === activeArea.coverPropertyId) || properties[0];
  const coverImage = activeCoverProp?.images[0] || {
    src: '/images/site/hero.webp',
    srcSmall: '/images/site/hero-sm.webp',
    alt: activeArea.name,
  };

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      style={{
        backgroundColor: 'var(--forest-900)',
        color: 'var(--ivory-100)',
        paddingTop: 'clamp(3.5rem, 7vw, 7rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '76px',
      }}
    >
      <Container>
        {/* Section Header with Dark Theme Contrast */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <span
            className="label"
            style={{
              color: 'var(--text-brass-on-dark)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            {HOME_CONTENT.locations.label}
          </span>
          <h2
            id="locations-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)',
              lineHeight: 'var(--lh-h1)',
              color: 'var(--ivory-50)',
              margin: '0 0 var(--space-2) 0',
            }}
          >
            {HOME_CONTENT.locations.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
              color: 'var(--olive-200)',
              maxWidth: '60ch',
              margin: 0,
            }}
          >
            {HOME_CONTENT.locations.subtitle}
          </p>
        </div>

        {/* 12-Column Layout */}
        <div
          className="locations-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: 7 Areas Links (7 cols) */}
          <div
            className="locations-list-col"
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(217, 208, 190, 0.2)',
            }}
          >
            {primaryAreas.map((area, index) => {
              const count = getAreaPropertyCount(area.slug, properties);
              const isActive = area.slug === activeAreaSlug;
              const areaProp = properties.find((p) => p.id === area.coverPropertyId);
              const thumb = areaProp?.images[0]?.srcSmall || '/images/site/hero-sm.webp';

              return (
                <Link
                  key={area.slug}
                  to={`/properties?area=${area.slug}`}
                  className="location-row-link"
                  onMouseEnter={() => setActiveAreaSlug(area.slug)}
                  onFocus={() => setActiveAreaSlug(area.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(1rem, 2vw, 1.5rem) 4px',
                    borderBottom: '1px solid rgba(217, 208, 190, 0.15)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'padding-left var(--duration-fast) var(--ease-out)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'clamp(0.5rem, 1.5vw, 1.5rem)',
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-brass-on-dark)',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="location-row-name"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                        fontWeight: 500,
                        color: isActive ? 'var(--ivory-50)' : 'rgba(251, 248, 242, 0.7)',
                        margin: 0,
                        transition: 'color var(--duration-fast)',
                        wordBreak: 'break-word',
                      }}
                    >
                      {area.name}
                    </h3>
                  </div>

                  {/* Right side: Mobile thumbnail, count & arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(10px, 2vw, 16px)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Mobile Thumbnail */}
                    <div
                      className="location-row-mobile-thumb"
                      style={{
                        display: 'none',
                        width: '50px',
                        height: '42px',
                        borderRadius: 'var(--radius-default)',
                        overflow: 'hidden',
                        border: '1px solid rgba(217, 208, 190, 0.25)',
                      }}
                    >
                      <img
                        src={thumb}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        loading="lazy"
                      />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--olive-200)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {count} {count === 1 ? 'entry' : 'entries'}
                    </span>

                    <div
                      className="location-row-arrow"
                      style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'var(--space-2)',
                        flexShrink: 0,
                        color: isActive ? 'var(--text-brass-on-dark)' : 'rgba(201, 208, 181, 0.6)',
                        transition: 'transform var(--duration-fast) var(--ease-out), color var(--duration-fast)',
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Footnote note */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(201, 208, 181, 0.65)',
                letterSpacing: '0.04em',
                marginTop: 'var(--space-4)',
                marginBottom: 0,
              }}
            >
              {HOME_CONTENT.locations.footnote}
            </p>
          </div>

          {/* Right Column: Sticky crossfading Survey-Framed image (5 cols) */}
          <div
            className="locations-image-col"
            style={{
              gridColumn: 'span 5',
              position: 'relative',
            }}
          >
            <div style={{ position: 'sticky', top: '100px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArea.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SurveyFrame
                    caption={`${activeArea.name.toUpperCase()} · KASUR`}
                    aspectRatio="4/3"
                    markColor="brass"
                    style={{
                      backgroundColor: 'rgba(24, 26, 23, 0.6)',
                      borderColor: 'rgba(176, 138, 78, 0.35)',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <SurveyImage
                        src={coverImage.src}
                        srcSmall={coverImage.srcSmall}
                        alt={activeArea.name}
                        position="50% 50%"
                        priority
                      />
                    </div>
                  </SurveyFrame>

                  <div
                    style={{
                      marginTop: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      backgroundColor: 'rgba(24, 26, 23, 0.4)',
                      border: '1px solid rgba(217, 208, 190, 0.15)',
                      borderRadius: 'var(--radius-default)',
                    }}
                  >
                    <span
                      className="label"
                      style={{
                        color: 'var(--text-brass-on-dark)',
                        fontSize: '0.625rem',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      TERRITORY PROFILE
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--ivory-100)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {activeArea.blurb}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .location-row-link:hover {
          padding-left: 8px;
        }
        .location-row-link:hover .location-row-name,
        .location-row-link:focus-visible .location-row-name {
          color: var(--ivory-50) !important;
        }
        .location-row-link:hover .location-row-arrow,
        .location-row-link:focus-visible .location-row-arrow {
          transform: translate(3px, -3px);
          color: var(--text-brass-on-dark) !important;
        }

        @media (max-width: 900px) {
          .locations-image-col {
            display: none !important;
          }
          .locations-list-col {
            grid-column: span 12 !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .location-row-mobile-thumb {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .location-row-mobile-thumb {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
