import { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SectionNumber } from '../components/ui/SectionNumber';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { Badge } from '../components/ui/Badge';
import { IconButton } from '../components/ui/IconButton';
import { SurveyFrame } from '../components/ui/SurveyFrame';
import { ArchMask } from '../components/ui/ArchMask';
import { useWhatsApp } from '../context/WhatsAppContext';
import { usePropertiesStore } from '../context/PropertiesContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyGrid } from '../components/property/PropertyGrid';
import { PropertyCardSkeleton } from '../components/property/PropertyCardSkeleton';
import { SurveyImage } from '../components/property/SurveyImage';
import { Bookmark, Share2, PhoneCall } from 'lucide-react';

interface ColorSwatch {
  name: string;
  variable: string;
  hex: string;
  role: string;
  contrastOnIvory?: string;
  contrastOnDark?: string;
  note?: string;
}

const PALETTE: ColorSwatch[] = [
  { name: 'Ivory 50', variable: '--ivory-50', hex: '#FBF8F2', role: 'Subtle cards / inner surfaces' },
  { name: 'Ivory 100', variable: '--ivory-100', hex: '#F4EFE6', role: 'Primary page background' },
  { name: 'Ivory 200', variable: '--ivory-200', hex: '#EAE3D5', role: 'Image placeholders & dividers' },
  { name: 'Line Hairline', variable: '--line', hex: '#D9D0BE', role: '1px survey borders' },
  { name: 'Line Strong', variable: '--line-strong', hex: '#BFB49C', role: 'Emphasized dividing borders' },
  { name: 'Charcoal 900', variable: '--charcoal-900', hex: '#181A17', role: 'Primary ink / headings', contrastOnIvory: '14.7:1 (AAA)' },
  { name: 'Charcoal 700', variable: '--charcoal-700', hex: '#2B2E29', role: 'Editorial body text', contrastOnIvory: '11.9:1 (AAA)' },
  { name: 'Charcoal 500', variable: '--charcoal-500', hex: '#5B5F57', role: 'Muted captions / secondary', contrastOnIvory: '5.6:1 (AA)' },
  { name: 'Forest 900', variable: '--forest-900', hex: '#1F2A22', role: 'Deep architectural surface' },
  { name: 'Forest 700', variable: '--forest-700', hex: '#2F3F33', role: 'Dark surface borders & focus' },
  { name: 'Olive 500', variable: '--olive-500', hex: '#6E7A58', role: 'Subtle brand tint' },
  { name: 'Olive 200', variable: '--olive-200', hex: '#C9D0B5', role: 'Muted text on dark surface', contrastOnDark: '9.0:1 (AAA)' },
  { name: 'Brass 500', variable: '--brass-500', hex: '#B08A4E', role: 'DECORATION ONLY: corner marks, rules, index numbers', contrastOnDark: '4.3:1 (UI)', note: 'Never used for body text' },
  { name: 'Copper 600', variable: '--copper-600', hex: '#9A4F2A', role: 'Accent links & labels', contrastOnIvory: '5.2:1 (AA)' },
  { name: 'WhatsApp Green', variable: '--whatsapp', hex: '#0F7A3F', role: 'Action CTAs only', note: '5.6:1 contrast with white text' },
  { name: 'Status Danger', variable: '--danger', hex: '#A3321F', role: 'Validation & warnings' },
  { name: 'Status Warning', variable: '--warning', hex: '#8A6A1F', role: 'Pending status' },
  { name: 'Status Success', variable: '--success', hex: '#2F6B3F', role: 'Available status' },
];

export default function StyleGuide() {
  const { openWhatsApp } = useWhatsApp();
  const { properties } = usePropertiesStore();
  const [selectedChips, setSelectedChips] = useState<string[]>(['1-kanal', 'ideal-garden']);

  const toggleChip = (id: string) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: 'var(--space-10)' }}>
      {/* Overview Title Banner */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span className="label" style={{ color: 'var(--copper-600)' }}>
              QA Verification Index · Internal Spec
            </span>
            <h1 style={{ fontSize: 'var(--fs-h1)', margin: 0 }}>
              Plot Index Design System
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)', maxWidth: '65ch', marginTop: 'var(--space-2)' }}>
              Contemporary architectural real-estate editorial design system for Kasur property
              dealers. Monospaced survey reference marks, Fraunces serif headlines, and hairline
              brass brackets.
            </p>
          </div>
        </Container>
      </Section>

      {/* 1. Color Palette & WCAG AA Contrast */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="01 · Color Tokens"
            title="Chromatic Palette & Contrast Verifications"
            description="All color pairings meet WCAG AA contrast standards (minimum 4.5:1 for body copy and 3.0:1 for graphical UI elements)."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {PALETTE.map((swatch) => (
              <div
                key={swatch.variable}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    height: '72px',
                    backgroundColor: swatch.hex,
                    borderBottom: '1px solid var(--border)',
                    position: 'relative',
                  }}
                />
                <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                      {swatch.name}
                    </strong>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {swatch.hex}
                    </code>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {swatch.role}
                  </span>
                  {swatch.contrastOnIvory && (
                    <span
                      className="label"
                      style={{ color: 'var(--success)', fontSize: '0.65rem', marginTop: '4px' }}
                    >
                      ✓ Contrast: {swatch.contrastOnIvory}
                    </span>
                  )}
                  {swatch.contrastOnDark && (
                    <span
                      className="label"
                      style={{ color: 'var(--brass-500)', fontSize: '0.65rem', marginTop: '4px' }}
                    >
                      ✓ On Dark: {swatch.contrastOnDark}
                    </span>
                  )}
                  {swatch.note && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--copper-600)',
                        marginTop: '2px',
                      }}
                    >
                      {swatch.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Typography Scale */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="02 · Typography Scale"
            title="Fluid Type Scale & Editorial Hierarchy"
            description="Editorial Fraunces display headings with tight tracking, paired with Hanken Grotesk body copy and DM Mono survey notation."
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-default)',
            }}
          >
            <div>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Display Serif — Fraunces Variable (clamp 3rem → 7rem)
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display)', lineHeight: 'var(--lh-display)', letterSpacing: 'var(--tracking-display)', margin: 'var(--space-2) 0 0' }}>
                Architectural Survey
              </p>
            </div>

            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Heading 1 — Fraunces (clamp 2.4rem → 4.5rem)
              </span>
              <h1 style={{ margin: 'var(--space-2) 0 0' }}>
                Rental Portions &amp; Family Residences
              </h1>
            </div>

            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Heading 2 — Fraunces (clamp 1.9rem → 3rem)
              </span>
              <h2 style={{ margin: 'var(--space-2) 0 0' }}>
                Ideal Garden · Block A Listings
              </h2>
            </div>

            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Heading 3 — Fraunces (1.5rem)
              </span>
              <h3 style={{ margin: 'var(--space-2) 0 0' }}>
                10 Marla Upper Portion with Independent Gate
              </h3>
            </div>

            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Body Copy — Hanken Grotesk (1.0625rem / 1.6 line-height)
              </span>
              <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--text-body)' }}>
                Located in a quiet tree-lined boulevard in Kasur, this property features
                separate electricity and gas meters, solid teak wood fittings, imported tiled
                washrooms, and dedicated covered car porch parking.
              </p>
            </div>

            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)' }}>
                Mono Metadata &amp; Reference — DM Mono (0.72rem / 0.12em tracking)
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                <span className="label" style={{ color: 'var(--copper-600)' }}>
                  REF 042 · 1 KANAL · RS. 95,000/MONTH
                </span>
                <span className="label" style={{ color: 'var(--forest-900)' }}>
                  RAILWAY ROAD · COMMERCIAL PLOT
                </span>
                <span className="label" style={{ color: 'var(--brass-500)' }}>
                  THE PLOT INDEX · KASUR
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Buttons & Interactive Controls */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="03 · Buttons & States"
            title="Button Variants, Sizes & Touch Targets"
            description="Polymorphic buttons satisfying 44px touch targets with responsive hover sliding arrows and accessible focus indicators."
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-default)',
            }}
          >
            {/* Variants */}
            <div>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
                Core Variants
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="primary" withArrow>Primary with Arrow</Button>
                <Button variant="secondary">Secondary Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="whatsapp">WhatsApp Action</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
                Sizes (Sm: 44px min, Md: 48px, Lg: 54px)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
                <Button size="sm">Small (44px)</Button>
                <Button size="md">Medium (48px)</Button>
                <Button size="lg">Large (54px)</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
                Icon Buttons (44px Minimum Touch Target)
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                <IconButton aria-label="Bookmark property" variant="default">
                  <Bookmark size={18} />
                </IconButton>
                <IconButton aria-label="Share listing" variant="outline">
                  <Share2 size={18} />
                </IconButton>
                <IconButton aria-label="Call dealer" variant="outline">
                  <PhoneCall size={18} />
                </IconButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Chips & Badges */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="04 · Chips & Status Badges"
            title="Selection Chips & Status Badges"
            description="Pill-shaped selection filters and status indicators for listing availability, furnishing, and feature highlights."
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-default)',
            }}
          >
            {/* Chips */}
            <div>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
                Interactive Filter Chips (Click to Toggle)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <Chip
                  selected={selectedChips.includes('all')}
                  onClick={() => toggleChip('all')}
                  count={24}
                >
                  All Properties
                </Chip>
                <Chip
                  selected={selectedChips.includes('1-kanal')}
                  onClick={() => toggleChip('1-kanal')}
                  count={8}
                >
                  1 Kanal
                </Chip>
                <Chip
                  selected={selectedChips.includes('10-marla')}
                  onClick={() => toggleChip('10-marla')}
                  count={12}
                >
                  10 Marla
                </Chip>
                <Chip
                  selected={selectedChips.includes('ideal-garden')}
                  onClick={() => toggleChip('ideal-garden')}
                  count={14}
                >
                  Ideal Garden
                </Chip>
                <Chip
                  selected={selectedChips.includes('model-garden')}
                  onClick={() => toggleChip('model-garden')}
                  count={6}
                >
                  Model Garden
                </Chip>
              </div>
            </div>

            {/* Badges */}
            <div className="hairline-top" style={{ paddingTop: 'var(--space-4)' }}>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
                Listing Status Badges
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <Badge variant="available">Available Now</Badge>
                <Badge variant="available">Available 1st Nov</Badge>
                <Badge variant="rented">Rented</Badge>
                <Badge variant="reserved">Reserved</Badge>
                <Badge variant="featured">Featured Listing</Badge>
                <Badge variant="furnished">Furnished</Badge>
                <Badge variant="neutral">Direct Owner</Badge>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. SurveyFrame (Signature Element) */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="05 · The Signature Frame"
            title="SurveyFrame & Architectural Corner Marks"
            description="Four brass L-shaped corner marks sit outside the photograph edges. Hover over the frame on desktop to observe the marks tightening inward by 4px."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Light Frame */}
            <div>
              <SurveyFrame
                caption="REF 007 · IDEAL GARDEN · 1 KANAL"
                aspectRatio="16/10"
                markColor="brass"
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #EAE3D5 0%, #D9D0BE 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--charcoal-700)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  [ Architectural Survey Photo ]
                </div>
              </SurveyFrame>
            </div>

            {/* Secondary Frame */}
            <div>
              <SurveyFrame
                caption="REF 014 · MODEL GARDEN · 10 MARLA RESIDENCE"
                aspectRatio="16/10"
                markColor="brass"
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #D9D0BE 0%, #BFB49C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--charcoal-900)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  [ Standard Rental Inspection ]
                </div>
              </SurveyFrame>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. ArchMask & Section Number */}
      <Section variant="inset" className="hairline-bottom">
        <Container>
          <SectionHeader
            label="06 · Architectural Framing"
            title="ArchMask & Index Numerals"
            description="Clips imagery to a distinctive rounded or pointed arch reflecting regional heritage brick masonry and traditional pointed arch profiles."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Rounded Arch Mask (Hero Portrait)
              </span>
              <ArchMask aspectRatio="3/4" type="rounded">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 50% 30%, #EAE3D5, #BFB49C)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal-700)',
                  }}
                >
                  Rounded Arch
                </div>
              </ArchMask>
            </div>

            <div>
              <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Pointed Arch Mask (Heritage Profile)
              </span>
              <ArchMask aspectRatio="3/4" type="pointed">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 50% 30%, #D9D0BE, #2F3F33)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  Pointed Arch
                </div>
              </ArchMask>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span className="label" style={{ color: 'var(--text-muted)', display: 'block' }}>
                  Index Numeral (On Light)
                </span>
                <SectionNumber number="01" />
              </div>
              <div
                style={{
                  backgroundColor: 'var(--forest-900)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-default)',
                }}
              >
                <span className="label" style={{ color: 'var(--brass-500)', display: 'block' }}>
                  Index Numeral (On Dark Surface)
                </span>
                <SectionNumber number="04" isDark />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. WhatsApp Demo Mode Dialog Trigger */}
      <Section variant="inset">
        <Container>
          <SectionHeader
            label="07 · Communication Trigger"
            title="Interactive WhatsApp Demo Dialog"
            description="Test the zero-configuration WhatsApp demo dialog. When no WhatsApp number is set in site config, users receive this modal with a copyable pre-formatted message."
          />

          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
                Test WhatsApp Inquiry Routing
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginTop: '4px' }}>
                Invokes the Radix Dialog simulation since no real dealer phone is configured in site.ts.
              </p>
            </div>

            <Button
              variant="whatsapp"
              size="md"
              onClick={() =>
                openWhatsApp(
                  'Assalam-o-Alaikum, I am testing the WhatsApp inquiry modal from the Plot Index Style Guide.'
                )
              }
            >
              Trigger WhatsApp Demo Dialog
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8. Reusable Property Components & Card Variants */}
      <Section variant="inset" className="hairline-top">
        <Container>
          <SectionHeader
            label="08 · Reusable Property Components"
            title="Card Variants, States & Architectural Framing"
            description="Components read data exclusively through usePropertiesStore(). Demonstrating lead editorial, compact grid, horizontal row, status variants, and image fallback tiles."
          />

          {/* Lead Variant */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Variant: Lead Editorial Card (4:3 / 16:10 Primary Showcase)
            </span>
            {properties[0] && (
              <div style={{ maxWidth: '780px' }}>
                <PropertyCard property={properties[0]} variant="lead" priority />
              </div>
            )}
          </div>

          {/* Compact Grid Variants */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Variant: Compact Card Grid (Available, Available-Soon, Furnished)
            </span>
            <PropertyGrid columns={3}>
              {properties.slice(1, 4).map((p) => (
                <PropertyCard key={p.id} property={p} variant="compact" />
              ))}
            </PropertyGrid>
          </div>

          {/* Status Variations: Rented and Commercial */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Status Variations: Rented (Muted) &amp; Commercial (Shop/Office)
            </span>
            <PropertyGrid columns={2}>
              {/* Rented House */}
              {properties.find((p) => p.status === 'rented') && (
                <PropertyCard
                  property={properties.find((p) => p.status === 'rented')!}
                  variant="compact"
                />
              )}
              {/* Commercial Shop */}
              {properties.find((p) => p.type === 'commercial') && (
                <PropertyCard
                  property={properties.find((p) => p.type === 'commercial')!}
                  variant="compact"
                />
              )}
            </PropertyGrid>
          </div>

          {/* Row Variant */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Variant: Row Card (Horizontal List Context)
            </span>
            {properties[7] && (
              <PropertyCard property={properties[7]} variant="row" />
            )}
          </div>

          {/* Skeleton Loader & Error Fallback Tile */}
          <div>
            <span className="label" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Loading Skeleton &amp; Image Error Fallback Tile
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              <div>
                <span className="label" style={{ color: 'var(--brass-500)', display: 'block', marginBottom: 'var(--space-2)' }}>
                  Shimmer Skeleton Loader
                </span>
                <PropertyCardSkeleton />
              </div>

              <div>
                <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginBottom: 'var(--space-2)' }}>
                  Image Error Fallback Tile (Simulated Missing Asset)
                </span>
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                    padding: '8px',
                  }}
                >
                  <SurveyImage
                    src="/images/simulated-missing-photo.webp"
                    alt="Simulated missing asset for fallback verification"
                    aspectRatio="16/10"
                  />
                  <div style={{ padding: 'var(--space-3)' }}>
                    <span className="label" style={{ color: 'var(--text-muted)' }}>
                      Graceful degradation when image fails to load
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
