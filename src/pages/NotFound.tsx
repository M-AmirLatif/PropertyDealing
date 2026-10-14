import { useEffect } from 'react';
import { Home, Search } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { SITE } from '../config/site';

export default function NotFound() {
  useEffect(() => {
    document.title = `404 Record Not Found | ${SITE.dealerName}`;
  }, []);

  return (
    <Section variant="default" style={{ paddingTop: 'clamp(3rem, 8vw, 6rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
      <Container>
        <div style={{ maxWidth: '640px', marginInline: 'auto', textAlign: 'center' }}>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            INDEX RECORD NOT FOUND
          </span>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              fontWeight: 600,
              color: 'var(--line-strong)',
              lineHeight: 1,
              letterSpacing: '0.04em',
              marginBottom: 'var(--space-2)',
              userSelect: 'none',
            }}
          >
            404
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              color: 'var(--text-heading)',
              margin: '0 0 var(--space-3) 0',
            }}
          >
            Unsurveyed Coordinate
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: 1.6,
              margin: '0 0 var(--space-6) 0',
            }}
          >
            The page or register entry you requested does not exist or has been relocated to another sector.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              justifyContent: 'center',
            }}
          >
            <Button to="/properties" variant="primary" size="md">
              <Search size={15} style={{ marginRight: '6px' }} />
              Browse properties register
            </Button>
            <Button to="/" variant="secondary" size="md">
              <Home size={15} style={{ marginRight: '6px' }} />
              Return home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
