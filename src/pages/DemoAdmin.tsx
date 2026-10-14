import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle2, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import {
  AdminBanner,
  StatCells,
  ListingsTable,
  PropertyDrawer,
  InquiriesTable,
} from '../components/admin';
import { usePropertiesStore } from '../context/PropertiesContext';
import { SITE } from '../config/site';
import type { Property, AvailabilityStatus } from '../types';

export default function DemoAdmin() {
  const {
    properties,
    setAvailability,
    addProperty,
    updateProperty,
    resetProperties,
  } = usePropertiesStore();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

  // Success notification state
  const [notification, setNotification] = useState<{
    message: string;
    slug?: string;
  } | null>(null);

  // 1. Meta robots noindex and document.title
  useEffect(() => {
    document.title = `Demo admin preview — ${SITE.dealerName}`;

    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    let prevContent = '';

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    } else {
      prevContent = meta.content;
    }
    meta.content = 'noindex';

    return () => {
      if (created && meta && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      } else if (meta) {
        meta.content = prevContent;
      }
    };
  }, []);

  // Handlers
  const handleOpenAdd = () => {
    setPropertyToEdit(null);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (prop: Property) => {
    setPropertyToEdit(prop);
    setDrawerOpen(true);
  };

  const handleStatusChange = (id: string, status: AvailabilityStatus) => {
    setAvailability(id, status);
    const prop = properties.find((p) => p.id === id);
    if (prop) {
      setNotification({
        message: `Updated status for "${prop.title}" to ${status.replace('-', ' ')}. Public listings updated.`,
        slug: prop.slug,
      });
    }
  };

  const handleToggleFeatured = (id: string, current: boolean) => {
    updateProperty(id, { featured: !current });
    const prop = properties.find((p) => p.id === id);
    if (prop) {
      setNotification({
        message: `Listing "${prop.title}" is now ${!current ? 'FEATURED on homepage' : 'regular'}.`,
        slug: prop.slug,
      });
    }
  };

  const handleSaveProperty = (savedProperty: Property, isEdit: boolean) => {
    if (isEdit) {
      updateProperty(savedProperty.id, savedProperty);
      setNotification({
        message: `Listing "${savedProperty.title}" updated successfully.`,
        slug: savedProperty.slug,
      });
    } else {
      addProperty(savedProperty);
      setNotification({
        message: `New listing #${savedProperty.refNo} ("${savedProperty.title}") registered. View it in the live public catalog.`,
        slug: savedProperty.slug,
      });
    }
  };

  const handleResetData = () => {
    resetProperties();
    setNotification({
      message: 'Demo dataset restored to original 15 fictional Lahore properties.',
    });
  };

  return (
    <div className="demo-admin-page" style={{ backgroundColor: 'var(--surface-alt)', minHeight: '100vh' }}>
      {/* 1. Persistent Top Simulation Notice Banner */}
      <AdminBanner onReset={handleResetData} />

      {/* 2. Admin Body Section */}
      <Section
        variant="inset"
        style={{
          paddingTop: 'var(--space-5)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <Container>
          {/* Page Subtitle & Agency Meta Strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-5)',
            }}
          >
            <div>
              <span
                className="label"
                style={{
                  color: 'var(--text-brass)',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                OPERATIONAL DEMO PREVIEW · {SITE.dealerName.toUpperCase()}
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                Simulated Listing Manager &amp; Lead Log
              </h1>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-default)',
              }}
            >
              Session: <strong style={{ color: 'var(--forest-900)' }}>In-Memory Browser Tab</strong> · Resets on reload
            </div>
          </div>

          {/* Action Feedback Notification */}
          {notification && (
            <div
              role="status"
              style={{
                backgroundColor: 'var(--forest-900)',
                color: '#f4ede2',
                padding: '10px 16px',
                borderRadius: 'var(--radius-default)',
                marginBottom: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: '0.8125rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#6ee7b7', flexShrink: 0 }} />
                <span>{notification.message}</span>
                {notification.slug && (
                  <Link
                    to={`/properties/${notification.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--brass-300, #eed9a8)',
                      textDecoration: 'underline',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: '8px',
                    }}
                  >
                    Open on site <ExternalLink size={12} />
                  </Link>
                )}
              </div>

              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setNotification(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#d4ccbe',
                  cursor: 'pointer',
                  padding: '2px',
                }}
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* 3. Overview Strip */}
          <StatCells properties={properties} />

          {/* 4. Listings Manager */}
          <ListingsTable
            properties={properties}
            onAddProperty={handleOpenAdd}
            onEditProperty={handleOpenEdit}
            onStatusChange={handleStatusChange}
            onToggleFeatured={handleToggleFeatured}
          />

          {/* 5. Sample Inquiries Log */}
          <InquiriesTable />

          {/* 6. Property Drawer (Add / Edit) */}
          <PropertyDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            propertyToEdit={propertyToEdit}
            allProperties={properties}
            onSave={handleSaveProperty}
          />
        </Container>
      </Section>
    </div>
  );
}
