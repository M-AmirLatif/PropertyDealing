import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft, AlertTriangle, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminBannerProps {
  onReset: () => void;
}

export function AdminBanner({ onReset }: AdminBannerProps) {
  const [resetFeedback, setResetFeedback] = useState(false);

  const handleReset = () => {
    onReset();
    setResetFeedback(true);
    setTimeout(() => {
      setResetFeedback(false);
    }, 2500);
  };

  return (
    <aside
      aria-label="Simulation notice"
      style={{
        width: '100%',
        backgroundColor: '#1b2019',
        color: '#f4ede2',
        borderBottom: '2px solid var(--brass-500)',
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          rgba(216, 200, 168, 0.04),
          rgba(216, 200, 168, 0.04) 12px,
          transparent 12px,
          transparent 24px
        )`,
        padding: '14px clamp(1rem, 3vw, 2.5rem)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px 20px',
        }}
      >
        {/* Left: Hatched status badge & honesty notice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(212, 160, 23, 0.18)',
              border: '1px solid var(--brass-500)',
              color: 'var(--brass-300, #eed9a8)',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            <AlertTriangle size={12} style={{ color: 'var(--brass-500)' }} />
            SIMULATED PREVIEW
          </span>

          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              lineHeight: 1.4,
              color: '#d4ccbe',
            }}
          >
            <strong style={{ color: '#fff', fontWeight: 600 }}>Not a real admin panel.</strong> No login, no server.
            Changes exist only in this browser tab and reset on refresh.
          </p>
        </div>

        {/* Right: Navigation & Reset demo data */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {resetFeedback && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#6ee7b7',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Check size={13} /> Original 15 restored
            </span>
          )}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleReset}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#f4ede2',
              fontSize: '0.75rem',
              padding: '6px 12px',
            }}
          >
            <RotateCcw size={13} style={{ marginRight: '6px' }} />
            Reset demo data
          </Button>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--brass-300, #eed9a8)',
              textDecoration: 'none',
              padding: '6px 10px',
              borderRadius: 'var(--radius-default)',
              border: '1px solid transparent',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ArrowLeft size={13} />
            Back to website
          </Link>
        </div>
      </div>
    </aside>
  );
}
