import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SurveyFrame } from '../ui/SurveyFrame';
import { SurveyImage } from '../property/SurveyImage';
import { HOME_CONTENT } from '../../content/home';
import { useWhatsApp } from '../../context/WhatsAppContext';

export function OwnerCta() {
  const { ownerCta } = HOME_CONTENT;
  const { openWhatsApp } = useWhatsApp();

  return (
    <section
      aria-labelledby="owner-cta-heading"
      style={{
        backgroundColor: 'var(--ivory-200)',
        borderTop: '1px solid var(--border-strong)',
        borderBottom: '1px solid var(--border-strong)',
        paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5.5rem)',
      }}
    >
      <Container>
        <div
          className="owner-cta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Calm interior image in SurveyFrame (5 cols) */}
          <div
            className="owner-cta-image-col"
            style={{
              gridColumn: 'span 5',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
            >
              <SurveyFrame
                caption="SURVEY REGISTER · OWNER INVENTORY · LAHORE"
                aspectRatio="16/11"
                markColor="muted"
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <SurveyImage
                    src="/images/site/owner-cta.webp"
                    srcSmall="/images/site/owner-cta-sm.webp"
                    alt="Calm residential interior in Lahore"
                    position="50% 50%"
                  />
                </div>
              </SurveyFrame>
            </motion.div>
          </div>

          {/* Right: Headline, supporting sentence & CTAs (7 cols) */}
          <div
            className="owner-cta-text-col"
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
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
                {ownerCta.label}
              </span>

              <h2
                id="owner-cta-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-heading)',
                  margin: '0 0 var(--space-2) 0',
                }}
              >
                {ownerCta.title}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                  lineHeight: 1.6,
                  color: 'var(--text-body)',
                  maxWidth: '52ch',
                  margin: '0 0 var(--space-4) 0',
                }}
              >
                {ownerCta.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  alignItems: 'center',
                }}
              >
                <Button to="/list-your-property" variant="primary" size="lg" withArrow>
                  {ownerCta.primaryButton}
                </Button>
                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={() => openWhatsApp(ownerCta.whatsappMessage)}
                >
                  <MessageSquare size={16} style={{ marginRight: '8px' }} />
                  {ownerCta.secondaryButton}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 860px) {
          .owner-cta-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: var(--space-5) !important;
          }
          .owner-cta-image-col,
          .owner-cta-text-col {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
