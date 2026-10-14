import { motion } from 'motion/react';

interface SegmentOption {
  label: string;
  value: number | null;
}

const OPTIONS: SegmentOption[] = [
  { label: 'Any', value: null },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5+', value: 5 },
];

interface SegmentedControlProps {
  value: number | null;
  onChange: (val: number | null) => void;
  id?: string;
  className?: string;
}

export function SegmentedControl({
  value,
  onChange,
  id = 'bedrooms-segmented-control',
  className = '',
}: SegmentedControlProps) {
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Filter by number of bedrooms"
      className={`segmented-control ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '2px',
        backgroundColor: 'var(--ivory-200)',
        padding: '3px',
        borderRadius: 'var(--radius-default)',
        border: '1px solid var(--border)',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {OPTIONS.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.label}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '4px 2px',
              minHeight: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: isSelected ? 600 : 450,
              color: isSelected ? 'var(--charcoal-900)' : 'var(--charcoal-500)',
              cursor: 'pointer',
              borderRadius: 'calc(var(--radius-default) - 2px)',
              transition: 'color var(--duration-fast) var(--ease-out)',
              outlineOffset: '2px',
            }}
          >
            {isSelected && (
              <motion.div
                layoutId="bedroom-glider"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'calc(var(--radius-default) - 2px)',
                  boxShadow: '0 1px 3px rgba(24, 26, 23, 0.08)',
                  zIndex: -1,
                }}
              />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
