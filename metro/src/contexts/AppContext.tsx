import React, { createContext, useContext, useState, useEffect } from 'react';
import metroData from '../data/delhiMetroData';

export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

interface AppState {
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() =>
    (localStorage.getItem('lang') as Language) || 'en'
  );
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('lang', l);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppContext');
  return ctx;
};

export { metroData };
