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
const dhaProps = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, q: 'dha' });
assert(dhaProps.length > 0 && dhaProps.every(p => p.areaSlug.includes('dha') || p.area.toLowerCase().includes('dha')), `Area search works: found ${dhaProps.length} DHA listings`);

// 4. Price range filter
const budgetProps = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, maxRent: 100000 });
assert(budgetProps.length > 0 && budgetProps.every(p => p.rentPKR <= 100000), `Max rent filter works: all ${budgetProps.length} listings <= 100k PKR`);

// 5. Keyword search
const gulbergSearch = applyFilters(DEMO_PROPERTIES, { ...DEFAULT_FILTERS, q: 'Gulberg' });
assert(gulbergSearch.length > 0, `Keyword search finds ${gulbergSearch.length} listings mentioning 'Gulberg'`);

// 6. Sorting
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
