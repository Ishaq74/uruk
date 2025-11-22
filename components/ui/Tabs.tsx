import React, { useState, createContext, useContext } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs: React.FC<{ defaultValue: string; children: React.ReactNode; className?: string }> = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`flex border-b ${className}`}>
    {children}
  </div>
);

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within a Tabs component");
  const isActive = context.activeTab === value;
  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm ${isActive ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within a Tabs component");
  return context.activeTab === value ? <div className={`py-4 ${className}`}>{children}</div> : null;
};
