import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { PropertyCard } from '../property/PropertyCard';
import { usePropertiesStore } from '../../context/PropertiesContext';
import { HOME_CONTENT } from '../../content/home';

export function FeaturedSection() {
  const { properties } = usePropertiesStore();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Take featured properties, fall back to first available if fewer than 4 featured
  const featured = properties.filter((p) => p.featured);
  const displayProperties = featured.length >= 4 
    ? featured.slice(0, 4) 
    : [...featured, ...properties.filter((p) => !p.featured)].slice(0, 4);

  const leadProperty = displayProperties[0];
  const compactProperties = displayProperties.slice(1);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      style={{
        paddingTop: 'clamp(3rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <Container>
        <SectionHeader
          label={HOME_CONTENT.featured.label}
          title={HOME_CONTENT.featured.title}
          to="/properties"
          linkText={HOME_CONTENT.featured.linkText}
        />

        {/* Desktop Asymmetric Layout (7 cols lead + 5 cols compact) */}
        <div className="featured-desktop-grid">
          {leadProperty && (
            <motion.div
              className="featured-lead-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
            >
              <PropertyCard property={leadProperty} variant="lead" priority />
            </motion.div>
          )}

          <div className="featured-compact-col">
            {compactProperties.map((prop, index) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <PropertyCard property={prop} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Layout (< 1024px) */}
        <div className="featured-mobile-carousel-wrap">
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
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ArrowRight size={11} aria-hidden="true" />
              <span>Swipe horizontally to inspect entries</span>
            </span>

            {/* Mobile Prev / Next Controls */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous property"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-body)',
                  borderRadius: 'var(--radius-default)',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Next property"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-body)',
                  borderRadius: 'var(--radius-default)',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="featured-mobile-carousel"
            tabIndex={0}
            role="region"
            aria-label="Featured properties horizontal scroll"
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              padding: '4px 0 16px 0',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {displayProperties.map((prop) => (
              <div
                key={prop.id}
                style={{
                  flex: '0 0 clamp(280px, 82vw, 360px)',
                  scrollSnapAlign: 'start',
                }}
              >
                <PropertyCard property={prop} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .featured-desktop-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: var(--space-5);
          align-items: stretch;
        }
        .featured-lead-col {
          grid-column: span 7;
          display: flex;
        }
        .featured-lead-col > article {
          width: 100%;
        }
        .featured-compact-col {
          grid-column: span 5;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          justify-content: space-between;
        }
        .featured-mobile-carousel-wrap {
          display: none;
        }
        .featured-mobile-carousel::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1023px) {
          .featured-desktop-grid {
            display: none !important;
          }
          .featured-mobile-carousel-wrap {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
