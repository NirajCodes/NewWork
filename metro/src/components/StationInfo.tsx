import React, { useState } from 'react';
import { StationAutocomplete } from './StationAutocomplete';
import type { StationOption } from './StationAutocomplete';
import { useApp, metroData, dmrcStations } from '../contexts/AppContext';

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '');

import { useApp, metroData } from '../contexts/AppContext';


export const StationInfo: React.FC = () => {
  const { language } = useApp();
  const [selected, setSelected] = useState('');


  const stationOptions: StationOption[] = dmrcStations.map(s => ({
    id: slug(s.name),
    name: s.name,
    line: s.line,
  }));

  const station = metroData.stations.find(s => s.id === selected);
  const extra = dmrcStations.find(s => slug(s.name) === selected);

  return (
    <div className="space-y-4">
      <StationAutocomplete onChange={setSelected} stations={stationOptions} />

  const station = metroData.stations.find(s => s.id === selected);

  return (
    <div className="space-y-4">
      <StationAutocomplete onChange={setSelected} />

      {station && (
        <div className="border p-4 rounded">
          <h2 className="font-bold text-lg mb-2">{station.name[language]}</h2>
          <p>{language === 'en' ? 'Code' : 'कोड'}: {station.code}</p>

          <p>{language === 'en' ? 'Lines' : 'लाइन'}:</p>
          <ul className="flex gap-2 mb-2">
            {station.lines.map(id => {
              const line = metroData.lines.find(l => l.id === id)!;
              return (
                <li key={id} className="px-2 py-1 text-white" style={{backgroundColor: line.color}}>
                  {line.name[language]}
                </li>
              );
            })}
          </ul>

          <p>{language === 'en' ? 'Lines' : 'लाइन'}: {station.lines.join(', ')}</p>

          <p>{language === 'en' ? 'Facilities' : 'सुविधाएँ'}:</p>
          <ul className="list-disc ml-5">
            {Object.entries(station.facilities).map(([k,v]) => (
              <li key={k}>{k}: {v ? 'Yes' : 'No'}</li>
            ))}
          </ul>
          {station.latitude && station.longitude && (
            <div className="mt-2">
              <a
                className="text-blue-500 underline"
                href={`https://maps.google.com/?q=${station.latitude},${station.longitude}`}
                target="_blank" rel="noopener noreferrer"
              >
                Google Maps
              </a>
              <iframe
                className="w-full h-60 mt-2"
                src={`https://maps.google.com/maps?q=${station.latitude},${station.longitude}&z=15&output=embed`}
              />
            </div>
          )}
        </div>
      )}
      {!station && extra && (
        <div className="border p-4 rounded">
          <h2 className="font-bold text-lg mb-2">{extra.name}</h2>
          <p>{language === 'en' ? 'Line' : 'लाइन'}: {extra.line}</p>
          {extra.lat && extra.lng && (
            <div className="mt-2">
              <a
                className="text-blue-500 underline"
                href={`https://maps.google.com/?q=${extra.lat},${extra.lng}`}
                target="_blank" rel="noopener noreferrer"
              >
                Google Maps
              </a>
              <iframe
                className="w-full h-60 mt-2"
                src={`https://maps.google.com/maps?q=${extra.lat},${extra.lng}&z=15&output=embed`}
              />
            </div>

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
