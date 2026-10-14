# The Plot Index — Lahore Property & Rental Advisory Demo Website

A high-performance, frontend-only demonstration website built for a premier property dealer / rental advisory practice in Lahore, Pakistan. Crafted to demonstrate how an editorial, architectural-grade web presence transforms rental discovery, elevates client inquiries, and establishes commercial trust.

> **Demonstration Notice:** All property listings, pricing in PKR, photography, and agent placeholders on this site are illustrative demo records created strictly for presentation purposes. No real inquiries are submitted or processed over a network.

---

## Tech Stack & Approved Dependencies

Built strictly using Vite, React 19, TypeScript, and the approved zero-runtime-cost dependency whitelist. No Tailwind, no bloated component libraries, no external backend.

### Runtime Dependencies (Strict Approved Whitelist)
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^19.3.0` | Declarative UI framework |
| `react-dom` | `^19.3.0` | React DOM renderer |
| `react-router-dom` | `^7.18.4` | Client-side Hash routing (`HashRouter`) for zero-config static hosting |
| `motion` | `^12.43.0` | Tasteful UI micro-interactions, layout transitions, and accordion animations |
| `@radix-ui/react-dialog` | `^1.3.1` | Accessible modal, drawer, and lightbox dialog primitives |
| `lucide-react` | `^1.56.0` | Sharp architectural SVG iconography |
| `@fontsource-variable/fraunces` | `^5.3.0` | Self-hosted serif display typography |
| `@fontsource-variable/hanken-grotesk` | `^5.3.0` | Self-hosted clean body typography |
| `@fontsource/dm-mono` | `^5.3.0` | Self-hosted monospaced architectural metadata font |

### Developer & Build Tooling
- **Vite 6**: Instant ESM development server and Rollup production bundler.
- **TypeScript 5.7**: Strict type system (`strict: true`, zero `any`).

---

## How to Run & Build

### Prerequisites
- Node.js LTS (v20+, v22+, or v24+)
- npm v10+

### Development Mode
```bash
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser. All pages use `HashRouter` (e.g. `/#/`, `/#/properties`), ensuring zero server rewrite requirements.

### Production Build & Preview
```bash
npm run build
npm run preview
```
The production bundle compiles into `dist/` in ~7 seconds, generating optimized, split JS chunks with tree-shaken assets and no development routes.

### Automated Test & Audit Suite
```bash
# Run all validation, filter, and admin store tests (29 automated tests)
npx tsx scratch/run-tests.ts

# Run forbidden keyword and external network scanner
node scratch/audit-scan.mjs

# Verify local image assets and check disk storage
node scratch/audit-images.mjs

# Verify route links and button actions
node scratch/audit-links.mjs
```

---

## Application Route Map

All routes run via client-side hash routing:
- `/#/` — **Homepage**: Signature Hero with rapid search drawer handoff, Curated Portions & Houses, Locality Index, Rental Process, and Dealer Commitments.
- `/#/properties` — **Listing Explorer**: Instant multi-parameter filtering (Area, Property Type, Price Brackets, Bedroom Count, Furnished Status, Availability), multi-directional sorting, active filter chips, and mobile filter drawer.
- `/#/properties/:slug` — **Property Detail**: High-resolution gallery with Radix lightbox, architectural specifications, utilities breakdown, interactive WhatsApp inquiry drawer, and related property recommendations.
- `/#/about` — **Advisory Practice**: Professional service introduction, tenant guidance, owner property marketing representation, and territorial coverage.
- `/#/contact` — **Direct Contact**: Office hours, phone lines, Lahore location details, and validated demo inquiry form with direct WhatsApp fallback.
- `/#/list-your-property` — **Owner Onboarding**: Structured 3-step listing submission form for landlords seeking professional tenant placement.
- `/#/saved` — **Saved Properties**: LocalStorage-backed shortlist with side-by-side spec comparison and batch WhatsApp share.
- `/#/demo-admin` — **Simulated Dealer Admin**: Visual prototype demonstrating inventory status toggling (Available / Rented), featured listing toggles, lead log review, and listing creation.
- `/#/styleguide` — **Design System**: Accessible in development mode (`npm run dev`) only; automatically excluded from production builds.

---

## Customizing Dealer & Property Data

### 1. Business Credentials & Contact
Configured in **[`src/config/site.ts`](file:///d:/PropertyDealing/src/config/site.ts)**:
- `dealerName`: `"Irfan Umri"`
- `brandShort`: `"Irfan Umri"`
- `phoneDisplay`: `"+92 301 6803398"`
- `phoneE164`: `"+923016803398"`
- `whatsappNumber`: `"923016803398"`
- `address`: Physical office address placeholder.
- `officeHours`: Weekly operating hours placeholder.

### 2. Property Dataset & Photography
- **Property Records**: Add or edit records in **[`src/data/properties.ts`](file:///d:/PropertyDealing/src/data/properties.ts)**.
- **Local Photography**: Place local property photography in `public/images/properties/<ID>/` (WebP or JPG format).
- **Territories**: Configure Lahore areas, sectors, and neighborhoods in **[`src/data/areas.ts`](file:///d:/PropertyDealing/src/data/areas.ts)**.
- **Categories**: Configure rental types in **[`src/data/categories.ts`](file:///d:/PropertyDealing/src/data/categories.ts)**.

---

## Strict Frontend Demo Boundaries

To uphold total integrity and comply with client presentation standards:
- **No Backend Server**: No Node/Express/Python/Go API server exists.
- **No Database**: No PostgreSQL, MongoDB, Prisma, Supabase, or Firebase.
- **No Network Data Transmission**: Form submissions display transparent simulated success dialogs; no form data leaves the client browser.
- **No Authentication**: No password storage, sessions, JWTs, or client login mechanisms.
- **No Payments or Financial Processing**: No credit card processing, bank transfer gateways, or paid API keys.
- **No Fabricated Dealer Claims**: No fake 5-star badges, years of experience, awards, or false customer counts.
- **Self-Contained Local Photography**: Zero remote hotlinking or external stock photo CDNs; all 100+ property images are stored locally in `public/`.
