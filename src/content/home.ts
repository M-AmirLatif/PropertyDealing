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
    label: 'LAHORE · RENTALS',
    title: 'Lahore rentals, shown properly.',
    subtitle:
      'Browse houses, apartments, portions and commercial spaces — then talk to the dealer directly on WhatsApp.',
    primaryCta: 'Explore properties',
    whatsappCta: 'Message on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I am exploring rental properties in Lahore and would like assistance with finding a place.',
    surveyCaption: 'ILLUSTRATIVE IMAGE · LAHORE',
  },

  areaStrip: {
    label: 'SURVEY LOCATIONS',
  },

  featured: {
    label: '01 · FEATURED REGISTER',
    title: 'Curated Lahore Residences',
    linkText: 'View all properties',
  },

  browseByType: {
    label: '02 · PROPERTY TYPOLOGIES',
    title: 'Browse By Category',
    subtitle:
      'Architectural registers organized by structure, scale, and occupancy needs.',
  },

  locations: {
    label: '03 · TERRITORIAL COVERAGE',
    title: 'Lahore Localities',
    subtitle:
      'Explore catalogued registers across Lahore’s primary residential sectors and commercial avenues.',
    footnote:
      'Sample areas for the Lahore demo — extendable to other cities.',
  },

  howItWorks: {
    label: '04 · THE RENTAL PROCESS',
    title: 'How It Works',
    subtitle:
      'From register discovery to key handover, coordinated directly through one point of contact.',
    steps: [
      {
        number: '01',
        title: 'Tell us what you need',
        description:
          'Filter by preferred Lahore locality, monthly rental bracket, and property category.',
      },
      {
        number: '02',
        title: 'Browse and shortlist',
        description:
          'Review high-resolution architectural survey photos, documented floor spaces, and save listings to compare.',
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
    label: '05 · OPERATIONAL STANDARDS',
    pullQuote:
      'A transparent advisory practice built on direct communication and accurate listings.',
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
          'No automated call centers or black-box web forms. Reach out directly on WhatsApp to speak with the consultant managing the register.',
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
      'We help owners present their properties clearly and handle enquiries across DHA, Gulberg, Bahria Town, and Johar Town.',
    primaryButton: 'List Your Property',
    secondaryButton: 'Discuss on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I own a property in Lahore that I am interested in putting up for rent. Please let me know how to proceed.',
  },

  finalCta: {
    text: 'Not sure where to start? Tell the dealer what you need.',
    buttonText: 'Chat on WhatsApp',
    whatsappMessage:
      'Hello Irfan, I am looking for a rental property in Lahore. Could you suggest options matching my requirements?',
  },
};
