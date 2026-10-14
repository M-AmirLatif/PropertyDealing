import { useState, useEffect, type ChangeEvent } from 'react';
import { Search, X, Info } from 'lucide-react';
import type { Property, PropertyType } from '../../types';
import type { Filters } from '../../lib/filters';
import { LAHORE_AREAS, getAreaPropertyCount } from '../../data/areas';
import { Chip } from '../ui/Chip';
import { SegmentedControl } from './SegmentedControl';

interface FilterFieldsProps {
  filters: Filters;
  onFilterChange: (updates: Partial<Filters>) => void;
  properties: Property[];
  idPrefix?: string;
}

const TYPE_CONFIG: Array<{ type: PropertyType; label: string }> = [
  { type: 'house', label: 'Houses' },
  { type: 'apartment', label: 'Apartments' },
  { type: 'portion', label: 'Portions' },
  { type: 'commercial', label: 'Commercial' },
];

export function FilterFields({
  filters,
  onFilterChange,
  properties,
  idPrefix = 'desktop',
}: FilterFieldsProps) {
  // Local debounced search query state
  const [localQ, setLocalQ] = useState(filters.q);

  useEffect(() => {
    setLocalQ(filters.q);
  }, [filters.q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQ !== filters.q) {
        onFilterChange({ q: localQ });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [localQ, filters.q, onFilterChange]);

  const handleTypeToggle = (t: PropertyType) => {
    const exists = filters.types.includes(t);
    const next = exists
      ? filters.types.filter((item) => item !== t)
      : [...filters.types, t];
    onFilterChange({ types: next });
  };

  const handleQuickBudgetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'any') {
      onFilterChange({ minRent: null, maxRent: null });
    } else if (val === 'under-50k') {
      onFilterChange({ minRent: null, maxRent: 50000 });
    } else if (val === '50k-100k') {
      onFilterChange({ minRent: 50000, maxRent: 100000 });
    } else if (val === '100k-200k') {
      onFilterChange({ minRent: 100000, maxRent: 200000 });
    } else if (val === '200k-plus') {
      onFilterChange({ minRent: 200000, maxRent: null });
    }
  };

  // Determine current quick budget preset value
  const currentBudgetPreset = (() => {
    const { minRent, maxRent } = filters;
    if (minRent === null && maxRent === 50000) return 'under-50k';
    if (minRent === 50000 && maxRent === 100000) return '50k-100k';
    if (minRent === 100000 && maxRent === 200000) return '100k-200k';
    if (minRent === 200000 && maxRent === null) return '200k-plus';
    if (minRent === null && maxRent === null) return 'any';
    return 'custom';
  })();

  const formatThousands = (val: number | null) => {
    if (val === null) return '';
    return val.toLocaleString();
  };

  const handleRentInputChange = (field: 'minRent' | 'maxRent', raw: string) => {
    const digits = raw.replace(/[^\d]/g, '');
    if (digits === '') {
      onFilterChange({ [field]: null });
    } else {
      const num = parseInt(digits, 10);
      onFilterChange({ [field]: num });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* 1. Keyword Search Field */}
      <div>
        <label
          htmlFor={`${idPrefix}-search-q`}
          className="label"
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            color: 'var(--text-heading)',
          }}
        >
          Search area or keyword
        </label>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            id={`${idPrefix}-search-q`}
            type="text"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="e.g. DHA, garden, modern..."
            style={{
              width: '100%',
              height: '42px',
              paddingLeft: '36px',
              paddingRight: localQ ? '36px' : '12px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-heading)',
            }}
          />
          {localQ && (
            <button
              type="button"
              onClick={() => {
                setLocalQ('');
                onFilterChange({ q: '' });
              }}
              aria-label="Clear keyword search"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Locality / Area Select */}
      <div>
        <label
          htmlFor={`${idPrefix}-area-select`}
          className="label"
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            color: 'var(--text-heading)',
          }}
        >
          Locality / Sector
        </label>
        <select
          id={`${idPrefix}-area-select`}
          value={filters.area}
          onChange={(e) => onFilterChange({ area: e.target.value })}
          style={{
            width: '100%',
            height: '42px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            padding: '0 12px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-heading)',
            cursor: 'pointer',
          }}
        >
          <option value="">Any area in Lahore ({properties.length})</option>
          {LAHORE_AREAS.map((a) => {
            const count = getAreaPropertyCount(a.slug, properties);
            return (
              <option key={a.slug} value={a.slug}>
                {a.name} ({count})
              </option>
            );
          })}
        </select>
      </div>

      {/* 3. Property Typology Chips (Multi-select) */}
      <div>
        <span
          className="label"
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            color: 'var(--text-heading)',
          }}
        >
          Property Typology
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TYPE_CONFIG.map(({ type, label }) => {
            const isSelected = filters.types.includes(type);
            const count = properties.filter((p) => p.type === type).length;
            return (
              <Chip
                key={type}
                selected={isSelected}
                onClick={() => handleTypeToggle(type)}
                count={count}
                aria-pressed={isSelected}
              >
                {label}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* 4. Monthly Rent Inputs & Quick Preset */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-2)',
          }}
        >
          <span className="label" style={{ color: 'var(--text-heading)' }}>
            Monthly Rent (PKR)
          </span>
          <label htmlFor={`${idPrefix}-quick-budget`} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Preset:
          </label>
        </div>

        {/* Quick Range Dropdown */}
        <select
          id={`${idPrefix}-quick-budget`}
          value={currentBudgetPreset}
          onChange={handleQuickBudgetChange}
          style={{
            width: '100%',
            height: '38px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            padding: '0 10px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--text-heading)',
            marginBottom: 'var(--space-2)',
            cursor: 'pointer',
          }}
        >
          <option value="any">Any monthly budget</option>
          <option value="under-50k">Up to Rs. 50,000</option>
          <option value="50k-100k">Rs. 50,000 – 100,000</option>
          <option value="100k-200k">Rs. 100,000 – 200,000</option>
          <option value="200k-plus">Rs. 200,000 and above</option>
          {currentBudgetPreset === 'custom' && (
            <option value="custom">Custom range</option>
          )}
        </select>

        {/* Min / Max Numeric Inputs with Rs. prefix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          <div>
            <label
              htmlFor={`${idPrefix}-rent-min`}
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                marginBottom: '2px',
              }}
            >
              MIN RENT
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              >
                Rs.
              </span>
              <input
                id={`${idPrefix}-rent-min`}
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={formatThousands(filters.minRent)}
                onChange={(e) => handleRentInputChange('minRent', e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  paddingLeft: '32px',
                  paddingRight: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-heading)',
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-rent-max`}
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                marginBottom: '2px',
              }}
            >
              MAX RENT
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              >
                Rs.
              </span>
              <input
                id={`${idPrefix}-rent-max`}
                type="text"
                inputMode="numeric"
                placeholder="Any"
                value={formatThousands(filters.maxRent)}
                onChange={(e) => handleRentInputChange('maxRent', e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  paddingLeft: '32px',
                  paddingRight: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-heading)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bedrooms Segmented Control */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-2)',
          }}
        >
          <span className="label" style={{ color: 'var(--text-heading)' }}>
            Bedrooms
          </span>
          {filters.beds !== null && (
            <button
              type="button"
              onClick={() => onFilterChange({ beds: null })}
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--copper-600)',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Reset
            </button>
          )}
        </div>
        <SegmentedControl
          id={`${idPrefix}-bedrooms-segment`}
          value={filters.beds}
          onChange={(beds) => onFilterChange({ beds })}
        />
        {filters.beds !== null && (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              marginTop: '6px',
              marginBottom: 0,
            }}
          >
            <Info size={12} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
            <span>Bedroom filter hides commercial listings</span>
          </p>
        )}
      </div>

      {/* 6. Toggles: Furnished only & Hide rented */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.875rem',
            color: 'var(--text-heading)',
            cursor: 'pointer',
            userSelect: 'none',
            minHeight: '36px',
          }}
        >
          <input
            type="checkbox"
            checked={filters.furnished}
            onChange={(e) => onFilterChange({ furnished: e.target.checked })}
            style={{
              width: '18px',
              height: '18px',
              accentColor: 'var(--copper-600)',
              cursor: 'pointer',
            }}
          />
          <span>Furnished only</span>
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.875rem',
            color: 'var(--text-heading)',
            cursor: 'pointer',
            userSelect: 'none',
            minHeight: '36px',
          }}
        >
          <input
            type="checkbox"
            checked={filters.available}
            onChange={(e) => onFilterChange({ available: e.target.checked })}
            style={{
              width: '18px',
              height: '18px',
              accentColor: 'var(--copper-600)',
              cursor: 'pointer',
            }}
          />
          <span>Hide rented (available only)</span>
        </label>
      </div>
    </div>
  );
}
