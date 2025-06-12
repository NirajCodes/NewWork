import React, { createContext, useContext, useState, useEffect } from 'react';
import metroData from '../data/delhiMetroData';
import { dmrcStations } from '../data/dmrcStations';

export type Language = 'en' https://github.com/NirajCodes/NewWork/pull/2/conflict?name=metro%252Fsrc%252Fcomponents%252FStationInfo.tsx&base_oid=72a6048612d8a1374df02d54826fce149c73df48&head_oid=5832e4faba74d47628515312e41d2d20431e6d5d| 'hi';
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

export { metroData, dmrcStations };

