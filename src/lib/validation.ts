/**
 * CLIENT-SIDE FORM VALIDATION HELPERS (Pure functions)
 * Validates user inputs with friendly Pakistani locale support.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  error: string | null;
}

export interface RentValidationResult {
  isValid: boolean;
  value: number | null;
  error: string | null;
}

/**
 * Validates a required text field with minimum character length.
 */
export function validateRequired(
  value: string | undefined | null,
  fieldName = 'This field',
  minLength = 2
): string | null {
  const trimmed = (value || '').trim();
  if (trimmed.length === 0) {
    return `${fieldName} is required.`;
  }
  if (trimmed.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters.`;
  }
  return null;
}

/**
 * Validates a Pakistani mobile number.
 * Accepts formats:
 * - 03001234567, 0300-1234567, 0300 1234567
 * - +923001234567, +92 300 1234567, +92-300-1234567
 * - 00923001234567, 0092 300 1234567
 * Returns normalized display format: 03XX-XXXXXXX
 */
export function validatePakistaniPhone(phone: string | undefined | null): PhoneValidationResult {
  const raw = (phone || '').trim();
  if (!raw) {
    return {
      isValid: false,
      normalized: '',
      error: 'Mobile number is required.',
    };
  }

  // Remove spaces, dashes, parentheses
  const cleaned = raw.replace(/[\s\-()]/g, '');

  let localNumber = '';

  if (/^03\d{9}$/.test(cleaned)) {
    localNumber = cleaned;
  } else if (/^\+923\d{9}$/.test(cleaned)) {
    localNumber = '0' + cleaned.slice(3);
  } else if (/^00923\d{9}$/.test(cleaned)) {
    localNumber = '0' + cleaned.slice(4);
  } else if (/^923\d{9}$/.test(cleaned)) {
    localNumber = '0' + cleaned.slice(2);
  } else {
    return {
      isValid: false,
      normalized: raw,
      error: 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567).',
    };
  }

  // Format as 03XX-XXXXXXX
  const normalized = `${localNumber.slice(0, 4)}-${localNumber.slice(4)}`;
  return {
    isValid: true,
    normalized,
    error: null,
  };
}

/**
 * Validates an email address.
 * When isRequired is false, an empty string is considered valid.
 */
export function validateEmail(
  email: string | undefined | null,
  isRequired = false
): string | null {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return isRequired ? 'Email address is required.' : null;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return null;
}

/**
 * Validates monthly rent in PKR.
 * Accepts digits and commas, e.g. "85,000", "85000".
 */
export function validateRent(
  rentStr: string | undefined | null,
  isRequired = true
): RentValidationResult {
  const raw = (rentStr || '').trim();
  if (!raw) {
    return {
      isValid: !isRequired,
      value: null,
      error: isRequired ? 'Expected monthly rent is required.' : null,
    };
  }

  // Strip commas, spaces, currency symbols
  const cleaned = raw.replace(/[,\sRs\.]/gi, '');
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      value: null,
      error: 'Please enter a valid numeric rental amount.',
    };
  }

  const val = parseInt(cleaned, 10);
  if (val <= 0) {
    return {
      isValid: false,
      value: null,
      error: 'Monthly rent must be greater than zero.',
    };
  }

  if (val < 5000) {
    return {
      isValid: false,
      value: val,
      error: 'Monthly rent must be at least Rs. 5,000.',
    };
  }

  return {
    isValid: true,
    value: val,
    error: null,
  };
}

/**
 * Validates maximum string length.
 */
export function validateMaxLength(
  value: string | undefined | null,
  maxLength: number,
  fieldName = 'This field'
): string | null {
  if (value && value.trim().length > maxLength) {
    return `${fieldName} cannot exceed ${maxLength} characters.`;
  }
  return null;
}

/**
 * Backward compatibility aliases
 */
export function isValidPakistaniPhone(phone: string): boolean {
  return validatePakistaniPhone(phone).isValid;
}

export function isValidEmail(email: string): boolean {
  return validateEmail(email, true) === null;
}

export function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
