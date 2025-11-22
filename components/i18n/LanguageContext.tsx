
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Define the shape of the context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define available languages
export const languages = {
  fr: { name: 'Français' },
  en: { name: 'English' },
  de: { name: 'Deutsch' },
  es: { name: 'Español' },
  ar: { name: 'العربية' },
  zh: { name: '中文' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && languages[savedLanguage as keyof typeof languages] ? savedLanguage : 'fr';
  });
  const [translations, setTranslations] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/components/i18n/locales/${language}.json`);
        if (!response.ok) {
            console.error(`Could not load ${language}.json, falling back to fr.json`);
            const fallbackResponse = await fetch(`/components/i18n/locales/fr.json`);
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
            return;
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTranslations();

    // Set document attributes for language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  }, [language]);

  const setLanguage = (lang: string) => {
    if (languages[lang as keyof typeof languages]) {
      localStorage.setItem('language', lang);
      setLanguageState(lang);
    }
  };
  
  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    if (isLoading) return '';
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key; // Return the key if translation is not found
        }
    }
    
    if (typeof result === 'string' && options) {
        return Object.entries(options).reduce<string>((acc, [optKey, optValue]) => {
            return acc.replace(`{{${optKey}}}`, String(optValue));
        }, result as string);
    }

    return typeof result === 'string' ? result : key;
  }, [translations, isLoading]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};