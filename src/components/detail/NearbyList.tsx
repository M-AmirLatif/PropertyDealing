import { MapPin, Info } from 'lucide-react';
import type { NearbyPlace } from '../../types';

interface NearbyListProps {
  nearby: NearbyPlace[];
}

export function NearbyList({ nearby }: NearbyListProps) {
  if (!nearby || nearby.length === 0) return null;

  return (
    <div style={{ margin: 'var(--space-6) 0' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: 'var(--text-heading)',
          margin: '0 0 var(--space-4) 0',
          fontWeight: 600,
        }}
      >
        Neighbourhood &amp; Vicinity
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {nearby.map((place) => (
          <div
            key={place.label}
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} style={{ color: 'var(--copper-600)', flexShrink: 0 }} />
              <strong
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-heading)',
                }}
              >
                {place.label}
              </strong>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {place.note}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
          margin: 0,
        }}
      >
        <Info size={12} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
        <span>Indicative demo information — not surveyed distances</span>
      </p>
    </div>
  );
}
