import { useCallback } from 'react';
import { SITE, hasPhone } from '../config/site';
import { useWhatsApp } from '../context/WhatsAppContext';

/**
 * Reusable hook for handling dealer phone calls.
 * If a valid E.164 phone number is configured, it triggers a native tel: link.
 * If no real number is configured yet (demo mode), it opens the demo fallback dialog.
 */
export function useDealerPhone() {
  const { openWhatsApp } = useWhatsApp();

  const handleCallDealer = useCallback((customContext?: string) => {
    if (hasPhone && SITE.phoneE164) {
      window.location.href = `tel:${SITE.phoneE164}`;
    } else {
      const message = customContext ||
        `Hello Irfan, I am attempting to contact ${SITE.dealerName} regarding rental properties in Lahore.`;
      openWhatsApp(message);
    }
  }, [openWhatsApp]);

  return {
    phoneDisplay: SITE.phoneDisplay,
    hasPhone,
    callDealer: handleCallDealer,
  };
}
