import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bookmark, MessageSquare, Trash2, Search, Info, AlertTriangle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PropertyCard } from '../components/property/PropertyCard';
import { useFavorites } from '../context/FavoritesContext';
import { usePropertiesStore } from '../context/PropertiesContext';
import { useWhatsApp } from '../context/WhatsAppContext';
import { SITE } from '../config/site';
import { buildShortlistMessage } from '../lib/whatsapp';

export default function Saved() {
  const { favoriteIds, clearFavorites } = useFavorites();
  const { getById } = usePropertiesStore();
  const { openWhatsApp } = useWhatsApp();

  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  useEffect(() => {
    document.title = `Saved Properties Shortlist — ${SITE.dealerName}`;
  }, []);

  // Map favoriteIds to actual property objects in the order they were saved
  const savedProperties = favoriteIds
    .map((id) => getById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const count = savedProperties.length;

  const handleShareShortlist = () => {
    const msg = buildShortlistMessage(savedProperties);
    openWhatsApp(msg);
  };

  const handleConfirmClear = () => {
    clearFavorites();
    setIsConfirmClearOpen(false);
  };

  return (
    <Section variant="default">
      <Container>
        {/* Page Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div>
            <span
              className="label"
              style={{
                color: 'var(--copper-600)',
                display: 'block',
                marginBottom: 'var(--space-2)',
              }}
            >
              PERSONAL SELECTION REGISTER
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 'var(--lh-h1)',
                color: 'var(--text-heading)',
                margin: 0,
              }}
            >
              Saved properties
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--text-muted)',
                margin: 'var(--space-2) 0 0 0',
              }}
            >
              {count === 0
                ? 'You have not shortlisted any properties yet.'
                : `${count} ${count === 1 ? 'property' : 'properties'} saved to this browser's register.`}
            </p>
          </div>

          {/* Action Buttons (Share & Clear) */}
          {count > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button
                type="button"
                variant="whatsapp"
                size="md"
                onClick={handleShareShortlist}
              >
                <MessageSquare size={16} style={{ marginRight: '6px' }} />
                Share shortlist on WhatsApp
              </Button>

              <button
                type="button"
                onClick={() => setIsConfirmClearOpen(true)}
                style={{
                  height: '42px',
                  padding: '0 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--danger)',
                  cursor: 'pointer',
                  transition: 'background-color var(--duration-fast)',
                }}
              >
                <Trash2 size={13} />
                <span>Clear all</span>
              </button>
            </div>
          )}
        </div>

        {/* Local Storage Privacy Notice */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: 'var(--ivory-100)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-default)',
            marginBottom: 'var(--space-6)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
          }}
        >
          <Info size={13} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
          <span>
            Saved listings are stored locally in your browser (LocalStorage). No account is required and no data is sent to a server.
          </span>
        </div>

        {/* Content: List or Empty State */}
        {count === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              padding: 'clamp(2.5rem, 6vw, 4.5rem)',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--ivory-200)',
                color: 'var(--copper-600)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <Bookmark size={24} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--text-heading)',
                margin: '0 0 var(--space-2) 0',
              }}
            >
              No saved properties yet
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: 'var(--space-5)',
              }}
            >
              Browse the Lahore rentals catalog and click the bookmark icon on any property to save it to your personal shortlist.
            </p>

            <Button to="/properties" variant="primary" size="md">
              <Search size={15} style={{ marginRight: '6px' }} />
              Browse property register
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {savedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} variant="compact" />
            ))}
          </div>
        )}

        {/* Clear All Confirmation Dialog */}
        <Dialog.Root open={isConfirmClearOpen} onOpenChange={setIsConfirmClearOpen}>
          <Dialog.Portal>
            <Dialog.Overlay
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(24, 26, 23, 0.65)',
                backdropFilter: 'blur(3px)',
                zIndex: 1000,
              }}
            />
            <Dialog.Content
              aria-describedby="clear-dialog-desc"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '420px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-default)',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-overlay)',
                zIndex: 1001,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
                <AlertTriangle size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                <Dialog.Title
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    margin: 0,
                  }}
                >
                  Clear all saved properties?
                </Dialog.Title>
              </div>

              <p
                id="clear-dialog-desc"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: '0 0 var(--space-5) 0',
                }}
              >
                This will remove all {count} {count === 1 ? 'property' : 'properties'} from your saved shortlist. You can always save listings again while browsing.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsConfirmClearOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmClear}
                  style={{ backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                >
                  Clear shortlist
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </Section>
  );
}
