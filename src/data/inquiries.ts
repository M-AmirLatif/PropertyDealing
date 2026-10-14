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
    propertyTitle: '1 Kanal Contemporary House in Ideal Garden',
    message: 'Interested in scheduling a weekend viewing for the 1 Kanal house in Ideal Garden. Please share visit timings.',
    date: '2026-10-12T14:30:00Z',
    status: 'new',
  },
  {
    id: 'INQ-102',
    name: 'Zainab',
    phone: '0321-4820193',
    propertyId: 'P-007',
    propertyTitle: 'Furnished Studio Apartment in Garden View',
    message: 'Inquiring if the studio in Garden View includes dedicated parking and if utility bills are included.',
    date: '2026-10-12T11:15:00Z',
    status: 'new',
  },
  {
    id: 'INQ-103',
    name: 'Bilal',
    phone: '0333-8719204',
    propertyId: 'P-002',
    propertyTitle: '10 Marla Upper Portion in Model Garden',
    message: 'Looking for a portion in Model Garden for family with two cars. Can we arrange a walkthrough tomorrow?',
    date: '2026-10-11T16:45:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-104',
    name: 'Amina',
    phone: '0302-6541298',
    propertyId: 'P-008',
    propertyTitle: '3-Bed Apartment in Model Garden',
    message: 'Seeking lease terms for the Model Garden 3-bed apartment on behalf of a local consulting office.',
    date: '2026-10-10T09:20:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-105',
    name: 'Hamza',
    phone: '0345-2198763',
    propertyId: 'P-004',
    propertyTitle: '5 Marla Family House in London City',
    message: 'Is the 5 Marla London City house available for long-term contract? We are looking for immediate possession.',
    date: '2026-10-09T18:10:00Z',
    status: 'new',
  },
  {
    id: 'INQ-106',
    name: 'Tariq',
    phone: '0301-9874561',
    propertyId: 'P-010',
    propertyTitle: 'Commercial Office Floor on Circle Road',
    message: 'Our organization requires office space on Circle Road. What is the advance security deposit requirement?',
    date: '2026-10-08T13:00:00Z',
    status: 'contacted',
  },
  {
    id: 'INQ-107',
    name: 'Fatima',
    phone: '0322-1478523',
    propertyId: 'P-006',
    propertyTitle: '7 Marla Ground Floor Portion in London City',
    message: 'Checking if the London City ground floor portion can be viewed this afternoon.',
    date: '2026-10-07T15:35:00Z',
    status: 'archived',
  },
  {
    id: 'INQ-108',
    name: 'Saad',
    phone: '0334-9632581',
    propertyId: 'P-009',
    propertyTitle: 'Ground Floor Commercial Shop on Railway Road',
    message: 'Inquiring about shopfront display access and commercial lease terms for the Railway Road retail space.',
    date: '2026-10-05T10:50:00Z',
    status: 'archived',
  },
];
