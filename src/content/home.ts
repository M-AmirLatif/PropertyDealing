/**
 * HOME MARKETING CONTENT
 * Centralized, easily editable homepage copy.
 *
 * NOTE FOR CLIENT/EDITOR:
 * Keep descriptions grounded and generic. Do not insert fabricated testimonials,
 * artificial 5-star badges, fake years in business, or unverified client counts.
 */

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface CommitmentItem {
  title: string;
  description: string;
}

export const HOME_CONTENT = {
  hero: {
    label: 'KASUR · RENTALS',
    title: 'Kasur rentals, shown properly.',
    subtitle:
      'Browse houses, apartments, portions and commercial spaces in Kasur — then talk to the dealer directly on WhatsApp.',
    primaryCta: 'Explore properties',
    whatsappCta: 'Message on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I am exploring rental properties in Kasur and would like assistance with finding a place.',
    surveyCaption: 'ILLUSTRATIVE IMAGE · KASUR',
  },

  areaStrip: {
    label: 'AREAS WE COVER',
  },

  featured: {
    label: '01 · FEATURED',
    title: 'Featured properties',
    linkText: 'View all properties',
  },

  browseByType: {
    label: '02 · PROPERTY TYPES',
    title: 'Browse by type',
    subtitle:
      'Houses, apartments, portions and commercial spaces organized by your needs.',
  },

  locations: {
    label: '03 · AREAS WE COVER',
    title: 'Browse by area',
    subtitle:
      'Explore rental properties across Kasur’s main residential and commercial areas.',
    footnote:
      'Sample areas for the Kasur demo — extendable to other cities and towns.',
  },

  howItWorks: {
    label: '04 · THE RENTAL PROCESS',
    title: 'How It Works',
    subtitle:
      'From browsing properties to key handover, coordinated directly through one point of contact.',
    steps: [
      {
        number: '01',
        title: 'Tell us what you need',
        description:
          'Filter by preferred Kasur area, monthly rent budget, and property type.',
      },
      {
        number: '02',
        title: 'Browse and shortlist',
        description:
          'Review clear photos, measured floor spaces, and save listings to compare.',
      },
      {
        number: '03',
        title: 'See the place',
        description:
          'Schedule an accompanied site inspection at your convenience through direct WhatsApp coordination.',
      },
      {
        number: '04',
        title: 'Agree and move in',
        description:
          'The dealer coordinates tenancy agreements, inventory checks, and key handover between owner and tenant.',
      },
    ] as StepItem[],
  },

  howWeWork: {
    label: '05 · OUR STANDARDS',
    pullQuote:
      'Direct communication, clear details, and accurate listings.',
    // NOTE FOR CLIENT / PRESENTER:
    // Replace these three principles with your actual business standards or dealer commitments.
    // Do not add fake ratings, years in business, awards, or fabricated client statistics.
    commitments: [
      {
        title: 'Clear details before you visit',
        description:
          'Every listing displays documented covered area, exact bedroom and bathroom counts, utility connections, and accurate rental figures upfront.',
      },
      {
        title: 'Direct conversation, no forms to wait on',
        description:
          'No automated call centers or long delays. Reach out directly on WhatsApp to speak with Irfan Umri.',
      },
      {
        title: 'Owners and tenants both looked after',
        description:
          'Balanced coordination that respects tenancy agreements, ensures timely documentation, and protects both parties throughout the lease term.',
      },
    ] as CommitmentItem[],
  },

  ownerCta: {
    label: '06 · PROPERTY OWNERS',
    title: 'Have a property to rent out?',
    description:
      'We help owners in Kasur present their properties clearly and handle enquiries.',
    primaryButton: 'List Your Property',
    secondaryButton: 'Discuss on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I own a property in Kasur that I am interested in putting up for rent. Please let me know how to proceed.',
  },

  finalCta: {
    text: 'Not sure where to start? Tell the dealer what you need.',
    buttonText: 'Chat on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I am looking for a rental property in Kasur. Could you suggest options matching my requirements?',
  },
};
