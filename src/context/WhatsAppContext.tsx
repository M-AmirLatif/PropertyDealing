import { createContext, useContext, useState, type ReactNode } from 'react';
import { openWhatsApp as rawOpenWhatsApp } from '../lib/whatsapp';
import { WhatsAppDemoDialog } from '../components/ui/WhatsAppDemoDialog';

interface WhatsAppContextType {
  openWhatsApp: (message?: string) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');

  const handleOpenWhatsApp = (message?: string) => {
    rawOpenWhatsApp(message, (fallbackMsg) => {
      setDemoMessage(fallbackMsg);
      setDemoOpen(true);
    });
  };

  return (
    <WhatsAppContext.Provider value={{ openWhatsApp: handleOpenWhatsApp }}>
      {children}
      <WhatsAppDemoDialog
        open={demoOpen}
        onOpenChange={setDemoOpen}
        message={demoMessage}
      />
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp(): WhatsAppContextType {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
}
