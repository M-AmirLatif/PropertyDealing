import { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormErrorItem {
  fieldId: string;
  message: string;
}

interface FormErrorSummaryProps {
  errors: FormErrorItem[];
}

export function FormErrorSummary({ errors }: FormErrorSummaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0) {
      containerRef.current?.focus();
    }
  }, [errors]);

  if (!errors || errors.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, fieldId: string) => {
    e.preventDefault();
    const target = document.getElementById(fieldId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      ref={containerRef}
      role="alert"
      aria-labelledby="form-error-summary-title"
      tabIndex={-1}
      style={{
        backgroundColor: 'rgba(163, 50, 31, 0.08)',
        border: '1.5px solid var(--danger)',
        borderRadius: 'var(--radius-default)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-5)',
        outline: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: 'var(--space-2)',
        }}
      >
        <AlertCircle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />
        <h3
          id="form-error-summary-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--danger)',
            margin: 0,
          }}
        >
          Please correct the following {errors.length === 1 ? 'error' : 'errors'} before continuing:
        </h3>
      </div>

      <ul
        style={{
          margin: 0,
          paddingLeft: 'var(--space-5)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {errors.map(({ fieldId, message }) => (
          <li key={fieldId}>
            <a
              href={`#${fieldId}`}
              onClick={(e) => handleLinkClick(e, fieldId)}
              style={{
                color: 'var(--danger)',
                textDecoration: 'underline',
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
