import { RotateCcw } from 'lucide-react';
import type { Property } from '../../types';
import type { Filters } from '../../lib/filters';
import { countActiveFilters } from '../../lib/filters';
import { FilterFields } from './FilterFields';

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (updates: Partial<Filters>) => void;
  onClearAll: () => void;
  properties: Property[];
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  properties,
}: FilterSidebarProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <aside
      aria-label="Property discovery filters"
      className="filter-sidebar"
      style={{
        width: '300px',
        flexShrink: 0,
        position: 'sticky',
        top: '88px',
        maxHeight: 'calc(100vh - 108px)',
        overflowY: 'auto',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        padding: 'var(--space-4)',
        boxShadow: '0 2px 8px rgba(24, 26, 23, 0.04)',
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="label"
            style={{
              color: 'var(--text-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
            }}
          >
            FILTERS
          </span>
          {activeCount > 0 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                backgroundColor: 'var(--copper-600)',
                color: '#fff',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 600,
              }}
            >
              {activeCount}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClearAll}
          disabled={activeCount === 0}
          aria-label="Clear all applied filters"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: activeCount === 0 ? 'var(--text-muted)' : 'var(--copper-600)',
            cursor: activeCount === 0 ? 'not-allowed' : 'pointer',
            opacity: activeCount === 0 ? 0.6 : 1,
            padding: '2px 4px',
            borderRadius: 'var(--radius-default)',
            transition: 'color var(--duration-fast)',
          }}
        >
          <RotateCcw size={11} aria-hidden="true" />
          <span>Clear all</span>
        </button>
      </div>

      {/* Filter Controls Form */}
      <FilterFields
        filters={filters}
        onFilterChange={onFilterChange}
        properties={properties}
        idPrefix="sidebar"
      />
    </aside>
  );
}
