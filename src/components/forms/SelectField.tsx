import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string | null;
  hint?: string;
  id: string;
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, options, error, hint, id, placeholder, className = '', style, ...rest },
  ref
) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label
        htmlFor={id}
        className="label"
        style={{
          display: 'block',
          color: 'var(--text-heading)',
          fontSize: '0.75rem',
        }}
      >
        {label}
        {rest.required && (
          <span style={{ color: 'var(--copper-600)', marginLeft: '4px' }} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hint && (
        <span
          id={hintId}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
            marginBottom: '2px',
          }}
        >
          {hint}
        </span>
      )}

      <select
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        style={{
          width: '100%',
          minHeight: '48px',
          height: '48px',
          padding: '0 14px',
          backgroundColor: 'var(--surface)',
          border: error ? '1.5px solid var(--danger)' : '1px solid var(--border)',
          borderRadius: 'var(--radius-default)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: 'var(--text-heading)',
          cursor: 'pointer',
          outlineOffset: '2px',
          transition: 'border-color var(--duration-fast)',
          ...style,
        }}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span
          id={errorId}
          role="alert"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--danger)',
            marginTop: '2px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
});
