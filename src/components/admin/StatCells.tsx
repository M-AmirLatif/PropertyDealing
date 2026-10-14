import type { Property } from '../../types';

interface StatCellsProps {
  properties: Property[];
}

export function StatCells({ properties }: StatCellsProps) {
  const total = properties.length;
  const available = properties.filter((p) => p.status === 'available').length;
  const availableSoon = properties.filter((p) => p.status === 'available-soon').length;
  const rented = properties.filter((p) => p.status === 'rented').length;
  const featured = properties.filter((p) => p.featured).length;

  const cells = [
    { label: 'Total Listings', value: total, tone: 'default', note: 'in catalog' },
    { label: 'Available Now', value: available, tone: 'success', note: 'active vacancies' },
    { label: 'Available Soon', value: availableSoon, tone: 'accent', note: 'upcoming handover' },
    { label: 'Rented', value: rented, tone: 'muted', note: 'leased tenancies' },
    { label: 'Featured', value: featured, tone: 'featured', note: 'homepage showcase' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-6)',
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {cell.label}
          </span>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 600,
                lineHeight: 1,
                color:
                  cell.tone === 'success'
                    ? 'var(--forest-900)'
                    : cell.tone === 'accent'
                    ? 'var(--copper-600)'
                    : cell.tone === 'featured'
                    ? 'var(--brass-600, #a07a1c)'
                    : 'var(--text-heading)',
              }}
            >
              {cell.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {cell.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
