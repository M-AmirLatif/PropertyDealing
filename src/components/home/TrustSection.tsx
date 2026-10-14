import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { HOME_CONTENT } from '../../content/home';

export function TrustSection() {
  const { howWeWork } = HOME_CONTENT;

  return (
    <section
      aria-labelledby="trust-section-heading"
      style={{
        paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 6rem)',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Container>
        <div
          className="trust-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Pull-Quote Style Statement (5 cols) */}
          <div
            className="trust-left-col"
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
            >
              <span
                className="label"
                style={{
                  color: 'var(--copper-600)',
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {howWeWork.label}
              </span>
              <h2
                id="trust-section-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-heading)',
                  margin: 0,
                  fontStyle: 'normal',
                }}
              >
                &ldquo;{howWeWork.pullQuote}&rdquo;
              </h2>
            </motion.div>
          </div>

          {/* Right Column: 3 Operational Commitments (7 cols) */}
          <div
            className="trust-right-col"
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {howWeWork.commitments.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
                  borderBottom: index < howWeWork.commitments.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  gap: 'clamp(1rem, 2vw, 1.75rem)',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-brass)',
                    fontWeight: 600,
                    paddingTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                      fontWeight: 600,
                      color: 'var(--text-heading)',
                      margin: '0 0 var(--space-2) 0',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'var(--text-body)',
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 860px) {
          .trust-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: var(--space-5) !important;
          }
          .trust-left-col,
          .trust-right-col {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
