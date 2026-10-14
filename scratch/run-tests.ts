import {
  validateRequired,
  validatePakistaniPhone,
  validateEmail,
  validateRent,
  validateMaxLength,
} from '../src/lib/validation';
import { DEMO_PROPERTIES } from '../src/data/properties';
import { applyFilters, sortProperties, DEFAULT_FILTERS } from '../src/lib/filters';

let passCount = 0;
let failCount = 0;

function assert(cond: boolean, desc: string) {
  if (cond) {
    console.log(`  ✓ ${desc}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${desc}`);
    failCount++;
  }
}

console.log('=== TEST SUITE 1: FORM VALIDATION LOGIC ===');

// 1. Phone validation
const p1 = validatePakistaniPhone('03001234567');
assert(p1.isValid && p1.normalized === '0300-1234567', 'Standard 11-digit mobile (03001234567) normalizes to 0300-1234567');

const p2 = validatePakistaniPhone('+92 321 9876543');
assert(p2.isValid && p2.normalized === '0321-9876543', 'International format (+92 321 9876543) normalizes to 0321-9876543');

const p3 = validatePakistaniPhone('0092-333-5551234');
assert(p3.isValid && p3.normalized === '0333-5551234', 'Double-zero prefix (0092-333-5551234) normalizes to 0333-5551234');

const p4 = validatePakistaniPhone('923451122334');
assert(p4.isValid && p4.normalized === '0345-1122334', 'Plain 92 prefix (923451122334) normalizes to 0345-1122334');

const p5 = validatePakistaniPhone('04235881234');
assert(!p5.isValid, 'PTCL landline (042...) is rejected as mobile');

const p6 = validatePakistaniPhone('12345');
assert(!p6.isValid, 'Short phone number is rejected');

const p7 = validatePakistaniPhone('');
assert(!p7.isValid, 'Empty phone number is rejected');

// 2. Email validation
assert(validateEmail('test@example.com') === null, 'Valid email passes');
assert(validateEmail('bad-email') !== null, 'Invalid email fails');
assert(validateEmail('', false) === null, 'Optional empty email passes');
assert(validateEmail('', true) !== null, 'Required empty email fails');

// 3. Rent validation
const r1 = validateRent('85,000');
assert(r1.isValid && r1.value === 85000, 'Rent with comma parses correctly (85,000 -> 85000)');

const r2 = validateRent('Rs. 150000');
assert(r2.isValid && r2.value === 150000, 'Rent with Rs. prefix parses correctly');

const r3 = validateRent('3000');
assert(!r3.isValid && r3.error?.includes('Rs. 5,000'), 'Rent below minimum 5,000 fails');

const r4 = validateRent('abc');
assert(!r4.isValid, 'Non-numeric rent fails');

// 4. Required and max length
assert(validateRequired('John Doe', 'Name') === null, 'Non-empty required text passes');
assert(validateRequired('', 'Name') !== null, 'Empty required text fails');
assert(validateMaxLength('abc', 5) === null, 'Text within limit passes');
assert(validateMaxLength('abcdef', 5) !== null, 'Text exceeding limit fails');

console.log('\n=== TEST SUITE 2: PROPERTY FILTER & SEARCH LOGIC ===');

// 1. Initial full set
assert(DEMO_PROPERTIES.length === 15, `Dataset contains exactly 15 properties (got ${DEMO_PROPERTIES.length})`);

// 2. Filter by type
const portions = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, types: ['portion'] });
assert(portions.length > 0 && portions.every(p => p.type === 'portion'), `Type filter works: found ${portions.length} portions`);

// 3. Filter by area
const gardenProps = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, q: 'Garden' });
assert(gardenProps.length > 0 && gardenProps.every(p => p.areaSlug.includes('garden') || p.area.toLowerCase().includes('garden') || p.title.toLowerCase().includes('garden')), `Area search works: found ${gardenProps.length} Garden listings`);

// 4. Price range filter
const budgetProps = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, maxRent: 50000 });
assert(budgetProps.length > 0 && budgetProps.every(p => p.rentPKR <= 50000), `Max rent filter works: all ${budgetProps.length} listings <= 50k PKR`);

// 5. Keyword search
const londonSearch = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, q: 'London' });
assert(londonSearch.length > 0, `Keyword search finds ${londonSearch.length} listings mentioning 'London'`);

// 6. Verify Kasur area distribution across the 15 properties
import { KASUR_AREAS } from '../src/data/areas';
const areaCounts = KASUR_AREAS.map(a => ({
  slug: a.slug,
  count: DEMO_PROPERTIES.filter(p => p.areaSlug === a.slug).length,
}));
assert(areaCounts.reduce((sum, a) => sum + a.count, 0) === 15, 'All 15 properties are distributed across Kasur areas');
assert(areaCounts.find(a => a.slug === 'ideal-garden')?.count === 2, 'Ideal Garden has 2 properties');
assert(areaCounts.find(a => a.slug === 'model-garden')?.count === 2, 'Model Garden has 2 properties');
assert(areaCounts.find(a => a.slug === 'garden-view')?.count === 2, 'Garden View has 2 properties');
assert(areaCounts.find(a => a.slug === 'london-city')?.count === 2, 'London City has 2 properties');
assert(areaCounts.find(a => a.slug === 'elite-city')?.count === 2, 'Elite City has 2 properties');
assert(areaCounts.find(a => a.slug === 'shah-inayat-colony')?.count === 1, 'Shah Inayat Colony has 1 property');
assert(areaCounts.find(a => a.slug === 'wapda-colony')?.count === 1, 'Wapda Colony has 1 property');
assert(areaCounts.find(a => a.slug === 'railway-road')?.count === 2, 'Railway Road has 2 properties');
assert(areaCounts.find(a => a.slug === 'circle-road')?.count === 1, 'Circle Road has 1 property');

// 7. Restored Property Types & Specs Verification
const houses = DEMO_PROPERTIES.filter(p => p.type === 'house');
const portionsList = DEMO_PROPERTIES.filter(p => p.type === 'portion');
const apartments = DEMO_PROPERTIES.filter(p => p.type === 'apartment');
const commercials = DEMO_PROPERTIES.filter(p => p.type === 'commercial');
assert(houses.length === 5, `Restored house count is 5 (got ${houses.length})`);
assert(portionsList.length === 3, `Restored portion count is 3 (got ${portionsList.length})`);
assert(apartments.length === 4, `Restored apartment count is 4 (got ${apartments.length})`);
assert(commercials.length === 3, `Restored commercial count is 3 (got ${commercials.length})`);

// 8. Furnished status
const furnishedProps = DEMO_PROPERTIES.filter(p => p.furnished);
assert(furnishedProps.length === 2, `Restored furnished count is 2 (got ${furnishedProps.length})`);
assert(furnishedProps.some(p => p.id === 'P-007') && furnishedProps.some(p => p.id === 'P-013'), 'Furnished properties are P-007 and P-013');

// 9. Availability status & featured counts
const rentedProps = DEMO_PROPERTIES.filter(p => p.status === 'rented');
const soonProps = DEMO_PROPERTIES.filter(p => p.status === 'available-soon');
const availProps = DEMO_PROPERTIES.filter(p => p.status === 'available');
assert(rentedProps.length === 1 && rentedProps[0].id === 'P-011', `Exactly 1 rented property: P-011 (got ${rentedProps.map(p => p.id).join(', ')})`);
assert(soonProps.length === 2 && soonProps.some(p => p.id === 'P-006') && soonProps.some(p => p.id === 'P-015'), `Exactly 2 available-soon properties: P-006, P-015`);
assert(availProps.length === 12, `Exactly 12 available properties (got ${availProps.length})`);

const featuredProps = DEMO_PROPERTIES.filter(p => p.featured);
assert(featuredProps.length === 5, `Featured properties count is 5 (got ${featuredProps.length})`);

// 10. All referenced property images exist on disk
import fs from 'fs';
let missingImages = 0;
DEMO_PROPERTIES.forEach(p => {
  p.images.forEach(img => {
    if (!fs.existsSync('public' + img.src) || !fs.existsSync('public' + img.srcSmall)) {
      missingImages++;
    }
  });
});
assert(missingImages === 0, `All property images and thumbnails exist on disk (missing: ${missingImages})`);

// 11. Sorting
const sortedRentAsc = sortProperties(DEMO_PROPERTIES, 'rent-asc');
let isAscending = true;
for (let i = 1; i < sortedRentAsc.length; i++) {
  if (sortedRentAsc[i].rentPKR < sortedRentAsc[i - 1].rentPKR) isAscending = false;
}
assert(isAscending, 'Sorting by rent-asc produces monotonically non-decreasing rent');

console.log('\n=== TEST SUITE 3: ADMIN STORE SIMULATION LOGIC ===');

let adminProps = [...DEMO_PROPERTIES];

// Toggle status
const pP1 = adminProps.find(p => p.id === 'P-001')!;
adminProps = adminProps.map(p => p.id === 'P-001' ? { ...p, status: 'rented' as const } : p);
assert(adminProps.find(p => p.id === 'P-001')?.status === 'rented', 'Status change to rented reflects in state');

// Toggle featured
const origFeat = pP1.featured;
adminProps = adminProps.map(p => p.id === 'P-001' ? { ...p, featured: !origFeat } : p);
assert(adminProps.find(p => p.id === 'P-001')?.featured === !origFeat, 'Featured flag toggles cleanly');

// Add property
const newProp = {
  ...adminProps[0],
  id: 'P-999',
  slug: 'test-admin-added-listing',
  title: 'Test Admin Listing',
};
adminProps = [newProp, ...adminProps];
assert(adminProps.length === 16 && adminProps[0].id === 'P-999', 'Adding property increases count to 16 and prepends');

// Reset store
adminProps = [...DEMO_PROPERTIES];
assert(adminProps.length === 15 && adminProps.find(p => p.id === 'P-001')?.status === 'available', 'Reset restores original 15 properties');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
