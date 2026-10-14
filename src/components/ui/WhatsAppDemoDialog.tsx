import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageSquare, Copy, Check, X, Info } from 'lucide-react';
import { SITE } from '../../config/site';

interface WhatsAppDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export function WhatsAppDemoDialog({
  open,
  onOpenChange,
  message,
}: WhatsAppDemoDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard fails
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(24, 26, 23, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            animation: 'fadeIn 150ms ease-out',
          }}
        />
        <Dialog.Content
          aria-describedby="whatsapp-demo-desc"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '520px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            boxShadow: 'var(--shadow-overlay)',
            padding: 'var(--space-6)',
            zIndex: 1001,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-default)',
                  backgroundColor: 'rgba(15, 122, 63, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--whatsapp)',
                }}
              >
                <MessageSquare size={20} />
              </div>
              <div>
                <Dialog.Title
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--text-heading)',
                    lineHeight: '1.2',
                    margin: 0,
                  }}
                >
                  WhatsApp Demo Mode
                </Dialog.Title>
                <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginTop: '2px' }}>
                  Simulated Lead Link
                </span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close dialog"
                style={{
                  padding: 'var(--space-2)',
                  color: 'var(--text-muted)',
                  borderRadius: 'var(--radius-default)',
                  lineHeight: 0,
                }}
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description
            id="whatsapp-demo-desc"
            style={{
              fontSize: 'var(--fs-small)',
              color: 'var(--text-body)',
              lineHeight: '1.5',
              marginBottom: 'var(--space-4)',
            }}
          >
            No dealer phone number has been linked yet for {SITE.dealerName}. In production, clicking this
            action directly launches WhatsApp to message the agent.
          </Dialog.Description>

          <div
            style={{
              marginBottom: 'var(--space-4)',
              backgroundColor: 'var(--ivory-100)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              padding: 'var(--space-3) var(--space-4)',
            }}
          >
            <div
              className="label"
              style={{
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Prepared Message:</span>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: copied ? 'var(--whatsapp)' : 'var(--copper-600)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--text-body)',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}
            >
              {message}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(176, 138, 78, 0.08)',
              border: '1px solid rgba(176, 138, 78, 0.25)',
              borderRadius: 'var(--radius-default)',
              padding: 'var(--space-3)',
              display: 'flex',
              gap: 'var(--space-3)',
              alignItems: 'flex-start',
              fontSize: '0.785rem',
              color: 'var(--charcoal-700)',
              lineHeight: '1.45',
            }}
          >
            <Info size={16} style={{ color: 'var(--brass-500)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>For Presenter / Client:</strong> To enable real WhatsApp routing, set{' '}
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', backgroundColor: 'var(--ivory-200)', padding: '1px 4px' }}>
                whatsappNumber: &quot;923001234567&quot;
              </code>{' '}
              in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>src/config/site.ts</code>.
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            <Dialog.Close asChild>
              <button
                type="button"
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--fs-small)',
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--forest-900)',
                  color: 'var(--text-on-dark)',
                  borderRadius: 'var(--radius-default)',
                  fontWeight: 500,
                }}
              >
                Understood
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
