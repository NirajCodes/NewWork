import React, { useState } from 'react';
import { StationAutocomplete } from './StationAutocomplete';
import { useApp, metroData } from '../contexts/AppContext';

export const StationInfo: React.FC = () => {
  const { language } = useApp();
  const [selected, setSelected] = useState('');

  const station = metroData.stations.find(s => s.id === selected);

  return (
    <div className="space-y-4">
      <StationAutocomplete onChange={setSelected} />
      {station && (
        <div className="border p-4 rounded">
          <h2 className="font-bold text-lg mb-2">{station.name[language]}</h2>
          <p>{language === 'en' ? 'Code' : 'कोड'}: {station.code}</p>
          <p>{language === 'en' ? 'Lines' : 'लाइन'}: {station.lines.join(', ')}</p>
          <p>{language === 'en' ? 'Facilities' : 'सुविधाएँ'}:</p>
          <ul className="list-disc ml-5">
            {Object.entries(station.facilities).map(([k,v]) => (
              <li key={k}>{k}: {v ? 'Yes' : 'No'}</li>
            ))}
          </ul>
          {station.latitude && station.longitude && (
            <a
              className="text-blue-500"
              href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
              target="_blank" rel="noopener noreferrer"
            >
              Google Maps
            </a>
          )}
        </div>
      )}
    </div>
  );
};
