import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Self-hosted typography via Fontsource */
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';

/* Plot Index design tokens, base reset, and utilities */
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';

import App from './App';

/* Disable automatic browser scroll restoration so SPA route transitions cleanly start at (0, 0) */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
