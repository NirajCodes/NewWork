import React from 'react';
import { useApp } from '../contexts/AppContext';

interface Props {
  page: 'route' | 'station';
  setPage: (p: 'route' | 'station') => void;
}

export const Navbar: React.FC<Props> = ({ page, setPage }) => {
  const { language, setLanguage, theme, setTheme } = useApp();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
      <div className="space-x-4">
        <button className={`px-2 ${page === 'route' ? 'font-bold' : ''}`} onClick={() => setPage('route')}>
          {language === 'en' ? 'Route Finder' : 'मार्ग खोजक'}
        </button>
        <button className={`px-2 ${page === 'station' ? 'font-bold' : ''}`} onClick={() => setPage('station')}>
          {language === 'en' ? 'Station Info' : 'स्टेशन जानकारी'}
        </button>
      </div>
      <div className="space-x-2">
        <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}>
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  );
};
