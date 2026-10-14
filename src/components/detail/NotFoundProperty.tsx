import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { PropertyCard } from '../property/PropertyCard';
import { usePropertiesStore } from '../../context/PropertiesContext';

export function NotFoundProperty() {
  const { properties } = usePropertiesStore();
  const suggestedProperties = properties.slice(0, 3);

  return (
    <Section variant="default" style={{ paddingTop: 'var(--space-8)' }}>
      <Container>
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto var(--space-8) auto',
            textAlign: 'center',
          }}
        >
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            INDEX LOOKUP ERROR
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--text-heading)',
              margin: '0 0 var(--space-3) 0',
              fontWeight: 600,
            }}
          >
            Property not found
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-5)',
            }}
          >
            The requested register entry does not exist or has been removed from the demonstration catalog.
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
              Browse all properties
            </Button>
            <Button to="/" variant="secondary" size="md">
              <Home size={15} style={{ marginRight: '6px' }} />
              Return home
            </Button>
          </div>
        </div>

        {/* Suggested Properties */}
        <div style={{ marginTop: 'var(--space-8)' }}>
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 'var(--space-5)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                margin: 0,
                color: 'var(--text-heading)',
              }}
            >
              Suggested active listings
            </h2>
            <Link
              to="/properties"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--copper-600)',
                textDecoration: 'none',
              }}
            >
              View register &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {suggestedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} variant="compact" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
