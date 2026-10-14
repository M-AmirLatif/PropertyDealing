import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SurveyFrame } from '../ui/SurveyFrame';
import { ArchMask } from '../ui/ArchMask';
import { SurveyImage } from '../property/SurveyImage';
import { HeroSearch } from './HeroSearch';
import { HOME_CONTENT } from '../../content/home';
import { useWhatsApp } from '../../context/WhatsAppContext';

export function HeroSection() {
  const { openWhatsApp } = useWhatsApp();
  const { hero } = HOME_CONTENT;

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Mobile top image banner (<768px) */}
        <div className="hero-mobile-image-band" style={{ display: 'none', marginBottom: 'var(--space-4)' }}>
          <ArchMask aspectRatio="21/9" type="pointed">
            <SurveyImage
              src="/images/site/hero.webp"
              srcSmall="/images/site/hero-sm.webp"
              alt="Contemporary residential architecture in Lahore"
              priority
              position="50% 40%"
            />
          </ArchMask>
        </div>

        {/* 12-Column Asymmetric Grid */}
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column (≈7 cols) */}
          <div
            className="hero-text-col"
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <span
                className="label"
                style={{
                  color: 'var(--copper-600)',
                  display: 'inline-block',
                }}
              >
                {hero.label}
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-display)',
                lineHeight: 'var(--lh-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-heading)',
                margin: 0,
              }}
            >
              {hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                lineHeight: '1.5',
                color: 'var(--text-body)',
                maxWidth: '52ch',
                margin: 'var(--space-2) 0 var(--space-4) 0',
              }}
            >
              {hero.subtitle}
            </motion.p>

            {/* Desktop Action Buttons */}
            <motion.div
              className="hero-action-buttons hero-desktop-buttons"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.28 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
              }}
            >
              <Button to="/properties" variant="primary" size="lg" withArrow>
                {hero.primaryCta}
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() => openWhatsApp(hero.whatsappMessage)}
              >
                <MessageSquare size={16} />
                {hero.whatsappCta}
              </Button>
            </motion.div>
          </div>

          {/* Right Column (≈5 cols): Hero Image in ArchMask & SurveyFrame */}
          <div
            className="hero-image-col"
            style={{
              gridColumn: 'span 5',
              position: 'relative',
              width: '100%',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <SurveyFrame
                caption={hero.surveyCaption}
                aspectRatio="4/5"
                markColor="brass"
              >
                <ArchMask aspectRatio="4/5" type="pointed">
                  <SurveyImage
                    src="/images/site/hero.webp"
                    srcSmall="/images/site/hero-sm.webp"
                    alt="Contemporary residential architecture in Lahore"
                    priority
                    position="50% 45%"
                  />
                </ArchMask>
              </SurveyFrame>
            </motion.div>
          </div>
        </div>

        {/* Overlapping Search Card */}
        <motion.div
          className="hero-search-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            marginTop: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          <HeroSearch />
        </motion.div>

        {/* Mobile Action Buttons (rendered after search on <=767px) */}
        <div
          className="hero-mobile-buttons"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-4)',
          }}
        >
          <Button to="/properties" variant="primary" size="lg" withArrow style={{ width: '100%', minHeight: '54px' }}>
            {hero.primaryCta}
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            onClick={() => openWhatsApp(hero.whatsappMessage)}
            style={{ width: '100%', minHeight: '54px' }}
          >
            <MessageSquare size={16} />
            {hero.whatsappCta}
          </Button>
        </div>
      </Container>

      {/* Responsive Layout Style Overrides */}
      <style>{`
        @media (max-width: 767px) {
          .hero-mobile-image-band {
            display: block !important;
          }
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-image-col {
            display: none !important;
          }
          .hero-text-col {
            width: 100% !important;
          }
          .hero-desktop-buttons {
            display: none !important;
          }
          .hero-mobile-buttons {
            display: flex !important;
          }
          .hero-search-wrapper {
            margin-top: var(--space-4) !important;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .hero-mobile-image-band {
            display: none !important;
          }
          .hero-grid {
            display: grid !important;
            grid-template-columns: 1.2fr 1fr !important;
            gap: var(--space-4) !important;
          }
          .hero-image-col {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
