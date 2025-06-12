import React, { useState } from 'react';
import { useApp, metroData } from '../contexts/AppContext';

interface Props {
  onChange: (id: string) => void;
}

export const StationAutocomplete: React.FC<Props> = ({ onChange }) => {
  const { language } = useApp();
  const [query, setQuery] = useState('');

  const stations = metroData.stations.filter(s =>
    s.name[language].toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder={language === 'en' ? 'Select station' : 'स्टेशन चुनें'}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onBlur={() => setQuery('')}
      />
      {query && (
        <ul className="absolute z-10 bg-white dark:bg-gray-700 w-full max-h-40 overflow-auto border">
          {stations.map(st => (
            <li
              key={st.id}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onMouseDown={() => {
                onChange(st.id);
                setQuery(st.name[language]);
              }}
            >
              {st.name[language]} ({st.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
