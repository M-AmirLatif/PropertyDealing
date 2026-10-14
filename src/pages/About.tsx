import { useEffect } from 'react';
import { MessageSquare, UserCheck, Key } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceAreaMap } from '../components/about/ServiceAreaMap';
import { ABOUT_CONTENT } from '../content/about';
import { SITE } from '../config/site';
import { useWhatsApp } from '../context/WhatsAppContext';

export default function About() {
  const { openWhatsApp } = useWhatsApp();

  useEffect(() => {
    document.title = `About — ${SITE.dealerName}`;
  }, []);

  const { header, dealerIntro, whatWeHelpWith, cta } = ABOUT_CONTENT;

  return (
    <div className="about-page">
      {/* 1. Header Section */}
      <Section
        variant="default"
        style={{
          paddingTop: 'clamp(2.5rem, 4.5vw, 3.75rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span
              className="label"
              style={{
                color: 'var(--copper-600)',
                display: 'block',
                marginBottom: 'var(--space-3)',
              }}
            >
              {header.label}
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 'var(--lh-h1)',
                color: 'var(--text-heading)',
                margin: '0 0 var(--space-3) 0',
              }}
            >
              {header.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {header.intro}
            </p>
          </div>

          {/* 2. Advisory Practice Intro (No fake claims) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
              borderBottom: '1px solid var(--border)',
              marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            }}
          >
            <div>
              <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginBottom: '8px' }}>
                DEALER PHILOSOPHY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--text-heading)',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {dealerIntro.heading}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-body)' }}>
              <p style={{ margin: 0 }}>{dealerIntro.paragraph1}</p>
              <p style={{ margin: 0 }}>{dealerIntro.paragraph2}</p>
            </div>
          </div>

          {/* 3. What the Dealer Helps With (Tenants & Landlords) */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(2rem, 4vw, 3.5rem) auto' }}>
              <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginBottom: '4px' }}>
                PROFESSIONAL SCOPE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-h2)',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                {whatWeHelpWith.heading}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              {/* For Prospective Tenants */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border)' }}>
                  <UserCheck size={20} style={{ color: 'var(--copper-600)' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: 'var(--text-heading)',
                      margin: 0,
                    }}
                  >
                    {whatWeHelpWith.forTenants.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {whatWeHelpWith.forTenants.items.map((item) => (
                    <div key={item.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-brass)',
                          paddingTop: '2px',
                        }}
                      >
                        {item.num}
                      </span>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-heading)', marginBottom: '2px' }}>
                          {item.title}
                        </strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Property Owners */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border)' }}>
                  <Key size={20} style={{ color: 'var(--forest-900)' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: 'var(--text-heading)',
                      margin: 0,
                    }}
                  >
                    {whatWeHelpWith.forOwners.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {whatWeHelpWith.forOwners.items.map((item) => (
                    <div key={item.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-brass)',
                          paddingTop: '2px',
                        }}
                      >
                        {item.num}
                      </span>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-heading)', marginBottom: '2px' }}>
                          {item.title}
                        </strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Service Area Schematic Map */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <ServiceAreaMap />
          </div>

          {/* 5. Working with the Dealer WhatsApp CTA Strip */}
          <div
            className="about-cta-strip"
            style={{
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              backgroundColor: 'var(--ivory-200)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-default)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ maxWidth: '58ch' }}>
              <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginBottom: '4px' }}>
                GET IN TOUCH
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  color: 'var(--text-heading)',
                  margin: '0 0 var(--space-2) 0',
                }}
              >
                {cta.title}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-body)', margin: 0 }}>
                {cta.desc}
              </p>
            </div>

            <div className="about-cta-btn-wrap">
              <Button
                type="button"
                variant="whatsapp"
                size="lg"
                onClick={() => openWhatsApp('Hello Irfan, I would like to inquire about rental properties in Kasur.')}
              >
                <MessageSquare size={16} />
                {cta.buttonText}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 767px) {
          .about-cta-strip {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }
          .about-cta-strip p {
            margin-inline: auto !important;
          }
          .about-cta-btn-wrap {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
