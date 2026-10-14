import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SurveyFrame } from '../ui/SurveyFrame';
import { SurveyImage } from '../property/SurveyImage';
import { usePropertiesStore } from '../../context/PropertiesContext';
import { HOME_CONTENT } from '../../content/home';

interface TypologyRow {
  num: string;
  label: string;
  to: string;
  count: number;
  sampleImage: {
    src: string;
    srcSmall: string;
    alt: string;
  };
}

export function TypeIndex() {
  const { properties } = usePropertiesStore();
  const [activeTypologyIndex, setActiveTypologyIndex] = useState(0);

  // Derive counts and sample images dynamically from data
  const houseProps = properties.filter((p) => p.type === 'house');
  const portionProps = properties.filter((p) => p.type === 'portion');
  const apartmentProps = properties.filter((p) => p.type === 'apartment');
  const commercialProps = properties.filter((p) => p.type === 'commercial');
  const furnishedProps = properties.filter((p) => p.furnished);

  const defaultImg = {
    src: '/images/site/hero.webp',
    srcSmall: '/images/site/hero-sm.webp',
    alt: 'Architectural rental property',
  };

  const typologies: TypologyRow[] = [
    {
      num: '01',
      label: 'Houses & Villas',
      to: '/properties?type=house',
      count: houseProps.length,
      sampleImage: houseProps[0]?.images[0] || defaultImg,
    },
    {
      num: '02',
      label: 'Upper & Lower Portions',
      to: '/properties?type=portion',
      count: portionProps.length,
      sampleImage: portionProps[0]?.images[0] || defaultImg,
    },
    {
      num: '03',
      label: 'Apartments & Penthouses',
      to: '/properties?type=apartment',
      count: apartmentProps.length,
      sampleImage: apartmentProps[0]?.images[0] || defaultImg,
    },
    {
      num: '04',
      label: 'Commercial & Office Floors',
      to: '/properties?type=commercial',
      count: commercialProps.length,
      sampleImage: commercialProps[0]?.images[0] || defaultImg,
    },
    {
      num: '05',
      label: 'Fully Furnished Residences',
      to: '/properties?furnished=1',
      count: furnishedProps.length,
      sampleImage: furnishedProps[0]?.images[0] || defaultImg,
    },
  ];

  const currentPreview = typologies[activeTypologyIndex] || typologies[0];

  return (
    <section
      aria-labelledby="type-index-heading"
      style={{
        paddingTop: 'clamp(3rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Container>
        <SectionHeader
          label={HOME_CONTENT.browseByType.label}
          title={HOME_CONTENT.browseByType.title}
          description={HOME_CONTENT.browseByType.subtitle}
        />

        <div
          className="type-index-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Typology Rows List (7 cols) */}
          <div
            className="type-index-list-col"
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {typologies.map((item, index) => {
              const isActive = index === activeTypologyIndex;
              return (
                <Link
                  key={item.num}
                  to={item.to}
                  className="type-row-link"
                  onMouseEnter={() => setActiveTypologyIndex(index)}
                  onFocus={() => setActiveTypologyIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(1rem, 2vw, 1.75rem) 4px',
                    borderBottom: '1px solid var(--border)',
                    textDecoration: 'none',
                    color: 'inherit',
                    position: 'relative',
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
                        color: isActive ? 'var(--copper-600)' : 'var(--text-brass)',
                        fontWeight: 600,
                        transition: 'color var(--duration-fast)',
                        flexShrink: 0,
                      }}
                    >
                      {item.num}
                    </span>

                    <h3
                      className="type-row-title"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.15rem, 2.4vw, 1.85rem)',
                        fontWeight: 500,
                        color: isActive ? 'var(--text-heading)' : 'var(--charcoal-700)',
                        margin: 0,
                        transition: 'color var(--duration-fast)',
                        wordBreak: 'break-word',
                        minWidth: 0,
                      }}
                    >
                      {item.label}
                    </h3>
                  </div>

                  {/* Right side: Mobile thumbnail & count badge & arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(10px, 2vw, 16px)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Mobile inline thumbnail */}
                    <div
                      className="type-row-mobile-thumb"
                      style={{
                        display: 'none',
                        width: '48px',
                        height: '40px',
                        overflow: 'hidden',
                        borderRadius: 'var(--radius-default)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <img
                        src={item.sampleImage.srcSmall}
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
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.count} {item.count === 1 ? 'listing' : 'listings'}
                    </span>

                    <div
                      className="type-row-arrow"
                      style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'var(--space-2)',
                        flexShrink: 0,
                        color: isActive ? 'var(--copper-600)' : 'var(--text-muted)',
                        transition: 'transform var(--duration-fast) var(--ease-out), color var(--duration-fast)',
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Column: Desktop Floating Preview Image (5 cols) */}
          <div
            className="type-index-preview-col"
            style={{
              gridColumn: 'span 5',
              position: 'relative',
            }}
          >
            <div style={{ position: 'sticky', top: '100px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPreview.num}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <SurveyFrame
                    caption={`${currentPreview.num} · ${currentPreview.label.toUpperCase()}`}
                    aspectRatio="4/3"
                    markColor="brass"
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <SurveyImage
                        src={currentPreview.sampleImage.src}
                        srcSmall={currentPreview.sampleImage.srcSmall}
                        alt={currentPreview.sampleImage.alt}
                        position="50% 50%"
                        priority
                      />
                    </div>
                  </SurveyFrame>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .type-row-link:hover {
          padding-left: 8px;
        }
        .type-row-link:hover .type-row-arrow,
        .type-row-link:focus-visible .type-row-arrow {
          transform: translate(3px, -3px);
          color: var(--copper-600);
        }
        .type-row-link:hover .type-row-title,
        .type-row-link:focus-visible .type-row-title {
          color: var(--copper-600);
        }

        @media (max-width: 900px) {
          .type-index-preview-col {
            display: none !important;
          }
          .type-index-list-col {
            grid-column: span 12 !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .type-row-mobile-thumb {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .type-row-mobile-thumb {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
