
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export interface StationOption {
  id: string;
  name: string;
  line: string;
}

interface Props {
  onChange: (id: string) => void;
  stations: StationOption[];
}

export const StationAutocomplete: React.FC<Props> = ({ onChange, stations }) => {
  const { language } = useApp();
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (Speech) {
      const rec = new Speech();
      rec.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      rec.onresult = (e: SpeechRecognitionEvent) => {
        const text = e.results[0][0].transcript;
        setQuery(text);
        setShow(true);
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, [language]);

  const lineColors: Record<string, string> = {
    'Red Line': '#d32f2f',
    'Blue Line': '#2196f3',
    'Blue Line branch': '#64b5f6',
    'Yellow Line': '#fdd835',
    'Green Line': '#43a047',
    'Green Line branch': '#a5d6a7',
    'Violet Line': '#8e24aa',
    'Magenta Line': '#e91e63',
    'Pink Line': '#ff69b4',
    'Orange Line': '#ff9800',
    'Grey Line': '#9e9e9e',
  };
  const filtered = stations.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      setListening(true);
      recognitionRef.current!.start();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder={language === 'en' ? 'Select station' : 'स्टेशन चुनें'}
          value={query}
          onFocus={() => setShow(true)}
          onChange={e => {
            setQuery(e.target.value);
            setShow(true);
          }}
          onBlur={() => setTimeout(() => setShow(false), 100)}
        />
        {recognitionRef.current && (
          <button
            type="button"
            aria-label="voice search"
            className="px-2"
            onClick={startListening}
          >
            {listening ? '🎤...' : '🎤'}
          </button>
        )}
      </div>
      {show && query && (
        <ul className="absolute z-10 bg-white dark:bg-gray-700 w-full max-h-40 overflow-auto border">
          {filtered.map(st => (
            <li
              key={st.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onMouseDown={() => {
                onChange(st.id);
                setQuery(st.name);
                setShow(false);
              }}
            >
              <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: lineColors[st.line] || '#999'}} />
              {st.name}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
