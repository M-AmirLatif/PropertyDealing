import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | null;
  hint?: string;
  id: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField(
    { label, error, hint, id, className = '', style, ...rest },
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

        <textarea
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          rows={rest.rows || 4}
          style={{
            width: '100%',
            padding: '12px 14px',
            backgroundColor: 'var(--surface)',
            border: error ? '1.5px solid var(--danger)' : '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-heading)',
            outlineOffset: '2px',
            resize: 'none',
            minHeight: '100px',
            lineHeight: 1.5,
            transition: 'border-color var(--duration-fast)',
            ...style,
          }}
          {...rest}
        />

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
  }
);
