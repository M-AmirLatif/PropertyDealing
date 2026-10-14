import type { InquiryRecord } from '../types';

/**
 * DEMONSTRATION DATA — sample inquiry records for Demo Admin lead log preview.
 * Fictional first names only; phone numbers use 03XX-XXXXXXX dummy format.
 * No real customer data.
 */
export const SAMPLE_INQUIRIES: InquiryRecord[] = [
  {
    id: 'INQ-101',
    name: 'Usman',
    phone: '0300-5129841',
    propertyId: 'P-001',
    propertyTitle: 'Modern 1 Kanal Architect-Designed Residence',
    message: 'Interested in scheduling a weekend viewing for the 1 Kanal house in DHA Phase 5. Please share visit timings.',
    date: '2026-10-12T14:30:00Z',
    status: 'new',
  },
  {
    id: 'INQ-102',
    name: 'Zainab',
    phone: '0321-4820193',
    propertyId: 'P-007',
    propertyTitle: 'Designer Furnished Studio in Prime Gulberg',
    message: 'Inquiring if the studio in Gulberg III includes dedicated parking and if utility bills are included.',
    date: '2026-10-12T11:15:00Z',
    status: 'new',
  },
  {
    id: 'INQ-103',
    name: 'Bilal',
    phone: '0333-8719204',
    propertyId: 'P-002',
    propertyTitle: 'Spacious 10 Marla Independent Upper Portion',
    message: 'Looking for a portion in DHA Phase 6 for family with two cars. Can we arrange a walkthrough tomorrow?',
    date: '2026-10-11T16:45:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-104',
    name: 'Amina',
    phone: '0302-6541298',
    propertyId: 'P-008',
    propertyTitle: 'Luxury 3-Bed Panoramic High-Rise Apartment',
    message: 'Seeking corporate lease terms for the Gulberg III 3-bed apartment on behalf of a consulting firm.',
    date: '2026-10-10T09:20:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-105',
    name: 'Hamza',
    phone: '0345-2198763',
    propertyId: 'P-004',
    propertyTitle: 'Compact 5 Marla Designer Family Home',
    message: 'Is the 5 Marla Bahria Town house available for long-term contract? We are looking for immediate possession.',
    date: '2026-10-09T18:10:00Z',
    status: 'new',
  },
  {
    id: 'INQ-106',
    name: 'Tariq',
    phone: '0301-9874561',
    propertyId: 'P-010',
    propertyTitle: 'Executive 1,800 Sq Ft Corporate Office Floor',
    message: 'Our IT team requires office space for 25 engineers in Gulberg. What is the advance security deposit requirement?',
    date: '2026-10-08T13:00:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-107',
    name: 'Fatima',
    phone: '0322-1478523',
    propertyId: 'P-006',
    propertyTitle: 'Well-Maintained 7 Marla Lower Portion',
    message: 'Checking if the Johar Town lower portion can be viewed while repainting is finishing.',
    date: '2026-10-07T15:35:00Z',
    status: 'archived',
  },
  {
    id: 'INQ-108',
    name: 'Saad',
    phone: '0334-9632581',
    propertyId: 'P-009',
    propertyTitle: 'High-Footfall Ground Floor Commercial Retail Shop',
    message: 'Inquiring about front retail signage approvals and generator backup costs for the Gulberg shop.',
    date: '2026-10-05T10:50:00Z',
    status: 'archived',
  },
];
