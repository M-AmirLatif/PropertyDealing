import { X } from 'lucide-react';
import type { PropertyType } from '../../types';
import type { Filters } from '../../lib/filters';
import { KASUR_AREAS } from '../../data/areas';
import { formatRent } from '../../lib/format';

interface ActiveFiltersProps {
  filters: Filters;
  onFilterChange: (updates: Partial<Filters>) => void;
  onClearAll: () => void;
}

const TYPE_LABELS: Record<PropertyType, string> = {
  house: 'Houses',
  apartment: 'Apartments',
  portion: 'Portions',
  commercial: 'Commercial',
};

export function ActiveFilters({
  filters,
  onFilterChange,
  onClearAll,
}: ActiveFiltersProps) {
  const chips: Array<{
    id: string;
    label: string;
    accessibleLabel: string;
    onRemove: () => void;
  }> = [];

  // Keyword query
  if (filters.q.trim()) {
    chips.push({
      id: 'q',
      label: `Keyword: "${filters.q.trim()}"`,
      accessibleLabel: `Remove filter: Keyword ${filters.q.trim()}`,
      onRemove: () => onFilterChange({ q: '' }),
    });
  }

  // Area
  if (filters.area) {
    const areaObj = KASUR_AREAS.find((a) => a.slug === filters.area);
    const areaName = areaObj ? areaObj.name : filters.area;
    chips.push({
      id: 'area',
      label: areaName,
      accessibleLabel: `Remove filter: ${areaName}`,
      onRemove: () => onFilterChange({ area: '' }),
    });
  }

  // Types
  filters.types.forEach((t) => {
    const label = TYPE_LABELS[t] || t;
    chips.push({
      id: `type-${t}`,
      label,
      accessibleLabel: `Remove filter: ${label}`,
      onRemove: () =>
        onFilterChange({
          types: filters.types.filter((item) => item !== t),
        }),
    });
  });

  // Rent Range
  if (filters.minRent !== null || filters.maxRent !== null) {
    let rentLabel = '';
    if (filters.minRent !== null && filters.maxRent !== null) {
      rentLabel = `${formatRent(filters.minRent)} – ${formatRent(filters.maxRent)}`;
    } else if (filters.minRent !== null) {
      rentLabel = `Min ${formatRent(filters.minRent)}`;
    } else if (filters.maxRent !== null) {
      rentLabel = `Up to ${formatRent(filters.maxRent)}`;
    }

    chips.push({
      id: 'rent',
      label: rentLabel,
      accessibleLabel: `Remove filter: ${rentLabel}`,
      onRemove: () => onFilterChange({ minRent: null, maxRent: null }),
    });
  }

  // Bedrooms
  if (filters.beds !== null) {
    const bedLabel = filters.beds === 5 ? '5+ Bedrooms' : `${filters.beds} Bedrooms`;
    chips.push({
      id: 'beds',
      label: bedLabel,
      accessibleLabel: `Remove filter: ${bedLabel}`,
      onRemove: () => onFilterChange({ beds: null }),
    });
  }

  // Furnished
  if (filters.furnished) {
    chips.push({
      id: 'furnished',
      label: 'Furnished only',
      accessibleLabel: 'Remove filter: Furnished only',
      onRemove: () => onFilterChange({ furnished: false }),
    });
  }

  // Available (hide rented)
  if (filters.available) {
    chips.push({
      id: 'available',
      label: 'Available only',
      accessibleLabel: 'Remove filter: Available only',
      onRemove: () => onFilterChange({ available: false }),
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Active filters"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '6px',
        margin: 'var(--space-3) 0',
      }}
    >
      <span
        className="label"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.6875rem',
          marginRight: '4px',
        }}
      >
        ACTIVE:
      </span>

      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          aria-label={chip.accessibleLabel}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--ivory-200)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            padding: '4px 8px 4px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--charcoal-900)',
            cursor: 'pointer',
            transition: 'background-color var(--duration-fast), border-color var(--duration-fast)',
          }}
        >
          <span>{chip.label}</span>
          <X size={12} aria-hidden="true" style={{ color: 'var(--copper-600)' }} />
        </button>
      ))}

      {chips.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          style={{
            background: 'transparent',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--copper-600)',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '4px 6px',
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
