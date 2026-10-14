import { Link } from 'react-router-dom';
import type { Property } from '../../types';
import { usePropertiesStore } from '../../context/PropertiesContext';
import { PropertyCard } from '../property/PropertyCard';

interface RelatedPropertiesProps {
  currentProperty: Property;
}

export function RelatedProperties({ currentProperty }: RelatedPropertiesProps) {
  const { properties } = usePropertiesStore();

  // Find up to 3 related properties:
  // 1. Same area & not rented
  // 2. Same type & not rented
  // 3. Fallback to other available
  const candidates = properties.filter((p) => p.id !== currentProperty.id);

  const sameAreaAvailable = candidates.filter(
    (p) => p.areaSlug === currentProperty.areaSlug && p.status !== 'rented'
  );
  const sameTypeAvailable = candidates.filter(
    (p) => p.type === currentProperty.type && p.status !== 'rented' && !sameAreaAvailable.includes(p)
  );
  const othersAvailable = candidates.filter(
    (p) => p.status !== 'rented' && !sameAreaAvailable.includes(p) && !sameTypeAvailable.includes(p)
  );

  const related = [...sameAreaAvailable, ...sameTypeAvailable, ...othersAvailable].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-properties-heading"
      style={{
        marginTop: 'clamp(3rem, 6vw, 5rem)',
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <div>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            RECOMMENDED ENTRIES
          </span>
          <h2
            id="related-properties-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--text-heading)',
              margin: 0,
              fontWeight: 600,
            }}
          >
            Similar properties
          </h2>
        </div>

        <Link
          to={`/properties?area=${currentProperty.areaSlug}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--copper-600)',
            textDecoration: 'none',
          }}
        >
          View all in {currentProperty.area} &rarr;
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {related.map((prop) => (
          <PropertyCard key={prop.id} property={prop} variant="compact" />
        ))}
      </div>
    </section>
  );
}
