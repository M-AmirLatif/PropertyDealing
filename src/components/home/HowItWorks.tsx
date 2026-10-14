import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { HOME_CONTENT } from '../../content/home';

export function HowItWorks() {
  const { howItWorks } = HOME_CONTENT;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{
        paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 6rem)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <Container>
        <SectionHeader
          label={howItWorks.label}
          title={howItWorks.title}
          description={howItWorks.subtitle}
        />

        {/* Desktop Connected Steps (Horizontal) */}
        <div className="how-it-works-desktop">
          {/* Animated Connecting Line */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              marginBottom: 'var(--space-6)',
            }}
          >
            {/* Background static line */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '2%',
                right: '2%',
                height: '1px',
                backgroundColor: 'var(--border)',
                zIndex: 1,
              }}
            />

            {/* Drawn animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="how-line-animated"
              style={{
                position: 'absolute',
                top: '16px',
                left: '2%',
                right: '2%',
                height: '1px',
                backgroundColor: 'var(--brass-500)',
                transformOrigin: 'left center',
                zIndex: 2,
              }}
            />

            {/* 4 Steps Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                position: 'relative',
                zIndex: 3,
              }}
            >
              {howItWorks.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.12 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Step Marker Node */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--brass-500)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--charcoal-900)',
                      marginBottom: 'var(--space-4)',
                      boxShadow: '0 0 0 4px var(--bg)',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-heading)',
                      margin: '0 0 var(--space-2) 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Connected Steps (Vertical) */}
        <div className="how-it-works-mobile">
          <div
            style={{
              position: 'relative',
              paddingLeft: 'var(--space-6)',
            }}
          >
            {/* Background static vertical line */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                bottom: '16px',
                left: '15px',
                width: '1px',
                backgroundColor: 'var(--border)',
                zIndex: 1,
              }}
            />

            {/* Drawn animated vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="how-line-animated"
              style={{
                position: 'absolute',
                top: '16px',
                bottom: '16px',
                left: '15px',
                width: '1px',
                backgroundColor: 'var(--brass-500)',
                transformOrigin: 'top center',
                zIndex: 2,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
              }}
            >
              {howItWorks.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  style={{
                    position: 'relative',
                    paddingLeft: 'var(--space-3)',
                  }}
                >
                  {/* Step Marker Node */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '-32px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--brass-500)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--charcoal-900)',
                      zIndex: 3,
                    }}
                  >
                    {step.number}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--text-heading)',
                      margin: '0 0 var(--space-1) 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .how-it-works-desktop {
          display: block;
        }
        .how-it-works-mobile {
          display: none;
        }

        @media (max-width: 767px) {
          .how-it-works-desktop {
            display: none !important;
          }
          .how-it-works-mobile {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .how-line-animated {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
