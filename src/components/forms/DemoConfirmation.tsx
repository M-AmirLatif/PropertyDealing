import { MessageSquare, RotateCcw, Info } from 'lucide-react';
import { SITE } from '../../config/site';
import { useWhatsApp } from '../../context/WhatsAppContext';
import { Button } from '../ui/Button';

interface DemoConfirmationProps {
  title?: string;
  whatsappMessage: string;
  onReset: () => void;
  enteredSummary?: Array<{ label: string; value: string }>;
}

export function DemoConfirmation({
  title = 'Demo submission complete',
  whatsappMessage,
  onReset,
  enteredSummary,
}: DemoConfirmationProps) {
  const { openWhatsApp } = useWhatsApp();

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        margin: 'var(--space-4) 0',
      }}
    >
      {/* Animated Checkmark SVG */}
      <div style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="var(--success)"
            strokeWidth="2.5"
            strokeOpacity="0.3"
          />
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="var(--success)"
            strokeWidth="2.5"
            className="demo-check-circle"
          />
          <path
            d="M17 28.5L24.5 36L39 20"
            stroke="var(--success)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="demo-check-path"
          />
        </svg>
      </div>

      <span
        className="label"
        style={{
          color: 'var(--success)',
          display: 'block',
          marginBottom: 'var(--space-2)',
        }}
      >
        SIMULATED WORKFLOW
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
          fontWeight: 600,
          color: 'var(--text-heading)',
          margin: '0 0 var(--space-3) 0',
        }}
      >
        {title}
      </h2>

      {/* Explicit Honest Body Text */}
      <div
        style={{
          maxWidth: '56ch',
          margin: '0 auto var(--space-5) auto',
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: 'rgba(47, 107, 63, 0.08)',
          border: '1px solid rgba(47, 107, 63, 0.25)',
          borderRadius: 'var(--radius-default)',
          textAlign: 'left',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Info size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: 'var(--text-heading)',
            margin: 0,
          }}
        >
          <strong>This is a demonstration. Nothing was sent or saved.</strong> In the live version, this inquiry would be delivered directly to {SITE.dealerName} in {SITE.city} for immediate review and follow-up.
        </p>
      </div>

      {/* Summary of Entered Values (if provided) */}
      {enteredSummary && enteredSummary.length > 0 && (
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto var(--space-6) auto',
            textAlign: 'left',
            backgroundColor: 'var(--ivory-100)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            padding: 'var(--space-4)',
          }}
        >
          <span
            className="label"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            SUMMARY OF ENTERED DETAILS
          </span>
          <dl
            style={{
              margin: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
            }}
          >
            {enteredSummary.map(({ label, value }) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt style={{ color: 'var(--text-muted)' }}>{label}:</dt>
                <dd style={{ margin: 0, color: 'var(--text-heading)', fontWeight: 500 }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="button"
          variant="whatsapp"
          size="lg"
          onClick={() => openWhatsApp(whatsappMessage)}
        >
          <MessageSquare size={16} style={{ marginRight: '8px' }} />
          Send this by WhatsApp instead
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onReset}
        >
          <RotateCcw size={15} style={{ marginRight: '8px' }} />
          Start over
        </Button>
      </div>

      <style>{`
        .demo-check-circle {
          stroke-dasharray: 164;
          stroke-dashoffset: 164;
          animation: drawCircle 450ms ease-out forwards;
        }
        .demo-check-path {
          stroke-dasharray: 35;
          stroke-dashoffset: 35;
          animation: drawCheck 350ms 350ms ease-out forwards;
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .demo-check-circle,
          .demo-check-path {
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
