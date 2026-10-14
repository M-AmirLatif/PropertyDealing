import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import {
  DetailBreadcrumb,
  DetailHeader,
  Gallery,
  SpecStrip,
  AmenitiesList,
  NearbyList,
  ContactPanel,
  MobileContactBar,
  RelatedProperties,
  NotFoundProperty,
} from '../components/detail';
import { usePropertiesStore } from '../context/PropertiesContext';
import { SITE, DEMO_DISCLAIMER } from '../config/site';

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug } = usePropertiesStore();

  const property = slug ? getBySlug(slug) : undefined;

  // Scroll to top on navigation/slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  // Update document title
  useEffect(() => {
    if (property) {
      document.title = `${property.title} — ${property.area} | ${SITE.dealerName}`;
    } else {
      document.title = `Property Not Found | ${SITE.dealerName}`;
    }
  }, [property]);

  // If property slug does not resolve, render designed 404 state
  if (!property) {
    return <NotFoundProperty />;
  }

  const savedSearch = typeof window !== 'undefined'
    ? sessionStorage.getItem('last_properties_search') || ''
    : '';
  const backUrl = `/properties${savedSearch}`;

  const descriptionParagraphs = Array.isArray(property.description)
    ? property.description
    : [String(property.description)];

  return (
    <article className="property-detail-page">
      <Section
        variant="default"
        style={{
          paddingTop: 'var(--space-4)',
          paddingBottom: 'clamp(80px, 12vw, 110px)', // clearance for mobile contact bar
        }}
      >
        <Container>
          {/* 1. Breadcrumbs & Back Navigation */}
          <DetailBreadcrumb property={property} />

          {/* 2. Detail Header Block */}
          <DetailHeader property={property} />

          {/* 3. Hero Visual Gallery with Lightbox */}
          <Gallery images={property.images} />

          {/* 4. Two-Column Main Layout (Desktop: Content + Sticky Contact Panel) */}
          <div
            className="property-detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 360px',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Main Column */}
            <div className="property-detail-main">
              {/* Key Metric Spec Strip */}
              <SpecStrip property={property} />

              {/* Highlights Block */}
              {property.highlights && property.highlights.length > 0 && (
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <span
                    className="label"
                    style={{
                      color: 'var(--copper-600)',
                      display: 'block',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    SURVEY HIGHLIGHTS
                  </span>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {property.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: 'var(--text-heading)',
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(176, 138, 78, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          <Check size={12} style={{ color: 'var(--brass-500)' }} />
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description (2 paragraphs) */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--text-heading)',
                    margin: '0 0 var(--space-3) 0',
                    fontWeight: 600,
                  }}
                >
                  About This Property
                </h2>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'var(--text-body)',
                  }}
                >
                  {descriptionParagraphs.map((paragraph, index) => (
                    <p key={index} style={{ margin: 0 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amenities & Facilities */}
              <AmenitiesList amenities={property.amenities} />

              {/* Neighbourhood & Vicinity */}
              <NearbyList nearby={property.nearby} />

              {/* Visible Neutral Demo Disclaimer Banner */}
              <div
                style={{
                  margin: 'var(--space-6) 0',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--ivory-100)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <AlertTriangle
                  size={18}
                  style={{ color: 'var(--brass-500)', flexShrink: 0, marginTop: '2px' }}
                />
                <div>
                  <strong
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-heading)',
                      display: 'block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '2px',
                    }}
                  >
                    Demonstration Notice
                  </strong>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    Demonstration listing. This property is fictional and is not available for rent. {DEMO_DISCLAIMER}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Contact Panel (Desktop) */}
            <div className="property-detail-sidebar">
              <ContactPanel property={property} />
            </div>
          </div>

          {/* 5. Related Properties */}
          <RelatedProperties currentProperty={property} />

          {/* 6. Bottom Navigation Return */}
          <div
            style={{
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <Link
              to={backUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--copper-600)',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to property register</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* 7. Mobile Fixed Bottom Contact Bar */}
      <MobileContactBar property={property} />

      <style>{`
        @media (max-width: 1023px) {
          .property-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .property-detail-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </article>
  );
}
