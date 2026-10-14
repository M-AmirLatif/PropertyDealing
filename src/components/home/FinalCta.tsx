import { MessageSquare } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { HOME_CONTENT } from '../../content/home';
import { useWhatsApp } from '../../context/WhatsAppContext';

export function FinalCta() {
  const { finalCta } = HOME_CONTENT;
  const { openWhatsApp } = useWhatsApp();

  return (
    <section
      aria-label="Direct dealer enquiry"
      className="hairline-top"
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(2rem, 4vw, 3rem) 0',
      }}
    >
      <Container>
        <div
          className="final-cta-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '56ch' }}>
            <span
              className="label"
              style={{
                color: 'var(--copper-600)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              DIRECT ASSISTANCE
            </span>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.125rem, 2vw, 1.4rem)',
                color: 'var(--text-heading)',
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              {finalCta.text}
            </p>
          </div>

          <div>
            <Button
              variant="whatsapp"
              size="lg"
              onClick={() => openWhatsApp(finalCta.whatsappMessage)}
            >
              <MessageSquare size={16} style={{ marginRight: '8px' }} />
              {finalCta.buttonText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
