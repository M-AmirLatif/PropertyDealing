import { forwardRef, type InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  hint?: string;
  id: string;
  prefixText?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, id, prefixText, className = '', style, ...rest },
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

      <div style={{ position: 'relative', width: '100%' }}>
        {prefixText && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            {prefixText}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          style={{
            width: '100%',
            minHeight: '48px',
            height: '48px',
            paddingLeft: prefixText ? '40px' : '14px',
            paddingRight: '14px',
            backgroundColor: 'var(--surface)',
            border: error ? '1.5px solid var(--danger)' : '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-heading)',
            outlineOffset: '2px',
            transition: 'border-color var(--duration-fast)',
            ...style,
          }}
          {...rest}
        />
      </div>

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
