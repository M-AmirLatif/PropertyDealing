import {
  HeroSection,
  AreaStrip,
  FeaturedSection,
  TypeIndex,
  LocationsSection,
  HowItWorks,
  TrustSection,
  OwnerCta,
  FinalCta,
} from '../components/home';

export default function Home() {
  return (
    <div className="home-page-layout">
      {/* 1. Hero with asymmetric layout and overlapping search card */}
      <HeroSection />

      {/* 2. Thin horizontal mono index of areas */}
      <AreaStrip />

      {/* 3. Featured properties: 7-col lead card + 3 compact cards */}
      <FeaturedSection />

      {/* 4. Typology index with live sticky image preview */}
      <TypeIndex />

      {/* 5. Full-bleed dark forest-900 locations register */}
      <LocationsSection />

      {/* 6. Four numbered steps on a drawn line */}
      <HowItWorks />

      {/* 7. How We Work / Trust commitments with pull-quote */}
      <TrustSection />

      {/* 8. Owner CTA banner with interior photo */}
      <OwnerCta />

      {/* 9. Direct dealer WhatsApp enquiry strip */}
      <FinalCta />
    </div>
  );
}
