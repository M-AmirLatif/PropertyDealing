import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Property, AvailabilityStatus } from '../types';
import { DEMO_PROPERTIES } from '../data/properties';

export interface PropertiesStoreType {
  properties: Property[];
  getBySlug: (slug: string) => Property | undefined;
  getById: (id: string) => Property | undefined;
  setAvailability: (id: string, status: AvailabilityStatus) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  resetProperties: () => void;
}

const PropertiesContext = createContext<PropertiesStoreType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(DEMO_PROPERTIES);

  const getBySlug = (slug: string): Property | undefined => {
    return properties.find((p) => p.slug === slug);
  };

  const getById = (id: string): Property | undefined => {
    return properties.find((p) => p.id === id);
  };

  const setAvailability = (id: string, status: AvailabilityStatus) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const addProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const resetProperties = () => {
    setProperties(DEMO_PROPERTIES);
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        getBySlug,
        getById,
        setAvailability,
        addProperty,
        updateProperty,
        resetProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesStore(): PropertiesStoreType {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('usePropertiesStore must be used within a PropertiesProvider');
  }
  return context;
}

/**
 * Backward compatibility alias
 */
export const useProperties = usePropertiesStore;
