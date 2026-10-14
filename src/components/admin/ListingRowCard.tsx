import { Link } from 'react-router-dom';
import { ExternalLink, Edit2, Star } from 'lucide-react';
import type { Property, AvailabilityStatus } from '../../types';
import { padRef, formatRent, PROPERTY_TYPE_LABELS } from '../../lib/format';
import { Button } from '../ui/Button';

interface ListingRowCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onStatusChange: (id: string, status: AvailabilityStatus) => void;
  onToggleFeatured: (id: string, current: boolean) => void;
}

export function ListingRowCard({
  property,
  onEdit,
  onStatusChange,
  onToggleFeatured,
}: ListingRowCardProps) {
  const thumb = property.images[0]?.srcSmall || property.images[0]?.src || '/images/site/placeholder-property.svg';

  return (
    <article
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Thumbnail */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-default)',
            overflow: 'hidden',
            backgroundColor: 'var(--ivory-200)',
            flexShrink: 0,
            border: '1px solid var(--border)',
          }}
        >
          <img
            src={thumb}
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-brass)',
                fontWeight: 600,
              }}
            >
              REF #{padRef(property.refNo)}
            </span>
            <span style={{ color: 'var(--border-strong)', fontSize: '0.75rem' }}>·</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {PROPERTY_TYPE_LABELS[property.type] || property.type}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
              margin: '0 0 2px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {property.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            {property.area} · <strong style={{ color: 'var(--forest-900)' }}>{formatRent(property.rentPKR)}</strong>
          </p>
        </div>
      </div>

      {/* Status & Featured Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '10px',
          alignItems: 'center',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label
            htmlFor={`status-select-card-${property.id}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Status
          </label>
          <select
            id={`status-select-card-${property.id}`}
            value={property.status}
            onChange={(e) => onStatusChange(property.id, e.target.value as AvailabilityStatus)}
            style={{
              padding: '4px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-default)',
              border: '1px solid var(--border-strong)',
              backgroundColor:
                property.status === 'available'
                  ? 'rgba(40, 70, 45, 0.08)'
                  : property.status === 'available-soon'
                  ? 'rgba(180, 100, 30, 0.08)'
                  : 'rgba(120, 120, 120, 0.1)',
              color: 'var(--text-heading)',
              cursor: 'pointer',
            }}
          >
            <option value="available">Available</option>
            <option value="available-soon">Available Soon</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => onToggleFeatured(property.id, property.featured)}
          aria-label={property.featured ? 'Unfeature property' : 'Feature property on homepage'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            borderRadius: 'var(--radius-default)',
            border: `1px solid ${property.featured ? 'var(--brass-500)' : 'var(--border)'}`,
            backgroundColor: property.featured ? 'rgba(212, 160, 23, 0.12)' : 'transparent',
            color: property.featured ? 'var(--brass-600, #966f12)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Star
            size={12}
            fill={property.featured ? 'currentColor' : 'none'}
            stroke="currentColor"
          />
          {property.featured ? 'Featured' : 'Regular'}
        </button>
      </div>

      {/* Row Actions */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
        {property.status !== 'rented' && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onStatusChange(property.id, 'rented')}
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            Mark rented
          </Button>
        )}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onEdit(property)}
          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
        >
          <Edit2 size={12} style={{ marginRight: '4px' }} />
          Edit
        </Button>

        <Link
          to={`/properties/${property.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: 'var(--radius-default)',
            border: '1px solid var(--border)',
            color: 'var(--forest-900)',
            textDecoration: 'none',
            backgroundColor: 'var(--ivory-100)',
          }}
        >
          <ExternalLink size={12} />
          View
        </Link>
      </div>
    </article>
  );
}
