import { Link } from 'react-router-dom';
import { RotateCcw, ArrowRight } from 'lucide-react';
import type { Property } from '../../types';
import { LAHORE_AREAS, getAreaPropertyCount } from '../../data/areas';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  onClearAll: () => void;
  properties: Property[];
}

export function EmptyState({ onClearAll, properties }: EmptyStateProps) {
  // Compute the 3 areas with the highest count of listings
  const topAreas = [...LAHORE_AREAS]
    .map((area) => ({
      ...area,
      count: getAreaPropertyCount(area.slug, properties),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div
      role="status"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        margin: 'var(--space-4) 0',
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
        INDEX SEARCH
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
          color: 'var(--text-heading)',
          margin: '0 0 var(--space-2) 0',
        }}
      >
        No properties match these filters
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.5,
          color: 'var(--text-muted)',
          maxWidth: '52ch',
          margin: '0 auto var(--space-5) auto',
        }}
      >
        Try removing specific bedroom requirements, adjusting your budget range, or exploring other sectors in Lahore.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'var(--space-6)',
        }}
      >
        <Button variant="primary" size="md" onClick={onClearAll}>
          <RotateCcw size={14} style={{ marginRight: '6px' }} />
          Clear all filters
        </Button>
      </div>

      {/* Suggested Quick Links */}
      <div
        style={{
          paddingTop: 'var(--space-5)',
          borderTop: '1px solid var(--border)',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <span
          className="label"
          style={{
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: 'var(--space-3)',
          }}
        >
          EXPLORE ACTIVE LOCALITIES INSTEAD
        </span>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-2)',
          }}
        >
          {topAreas.map((area) => (
            <Link
              key={area.slug}
              to={`/properties?area=${area.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: 'var(--ivory-100)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-heading)',
                textDecoration: 'none',
              }}
            >
              <span>{area.name}</span>
              <span style={{ color: 'var(--text-muted)' }}>({area.count})</span>
              <ArrowRight size={11} style={{ color: 'var(--copper-600)' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
