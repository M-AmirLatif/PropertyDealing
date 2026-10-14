import { type ChangeEvent } from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortOption } from '../../lib/filters';

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  id?: string;
}

export function SortSelect({
  value,
  onChange,
  id = 'sort-select',
}: SortSelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortOption);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <label
        htmlFor={id}
        className="label"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.6875rem',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <ArrowUpDown size={12} aria-hidden="true" />
        <span>SORT:</span>
      </label>

      <select
        id={id}
        value={value}
        onChange={handleChange}
        style={{
          height: '38px',
          padding: '0 10px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-default)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--text-heading)',
          cursor: 'pointer',
        }}
      >
        <option value="newest">Newest first</option>
        <option value="rent-asc">Rent: low to high</option>
        <option value="rent-desc">Rent: high to low</option>
      </select>
    </div>
  );
}
