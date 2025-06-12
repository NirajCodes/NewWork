import React, { useState } from 'react';
import type { StationOption } from './StationAutocomplete';

import { useApp, metroData } from '../contexts/AppContext';
import type { StationDetail } from "../types";
import type { RouteInfo, FareResult, TicketSuggestion } from "../types";
import { findRoute } from '../services/routingService';
import { calculateFare } from '../services/fareService';
import { suggestTicket } from '../services/suggestionService';

export interface RouteResult { route: RouteInfo; fare: FareResult; suggestion: TicketSuggestion; }

export const RouteFinder: React.FC = () => {
  const { language } = useApp();
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [result, setResult] = useState<RouteResult | null>(null);

  const stationOptions: StationOption[] = metroData.stations.map(s => {
    const line = metroData.lines.find(l => l.id === s.lines[0]);
    return {
      id: s.id,
      name: s.name[language],
      line: line ? line.name.en : '',
    };
  });

  const handleSubmit = () => {
    const route = findRoute(source, dest, metroData);
    if (route) {
      const fare = calculateFare(route.totalStops, 'token', metroData.fareRules, language);
      const suggestion = suggestTicket(route.totalStops, 'daily', metroData.fareRules, language);
      setResult({ route, fare, suggestion });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <StationAutocomplete onChange={setSource} stations={stationOptions} />
        <StationAutocomplete onChange={setDest} stations={stationOptions} />

      </div>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>
        {language === 'en' ? 'Find Route' : 'मार्ग खोजें'}
      </button>

      {result ? (
        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">
            {language === 'en' ? 'Route' : 'मार्ग'}
          </h2>
          <ol className="list-decimal ml-4 space-y-1">
            {result.route.path.map((st: StationDetail) => (
              <li key={st.id}>
                {st.name[language]}
                {result.route.interchanges.find(i => i.id === st.id) && (
                  <span className="ml-2 text-sm text-yellow-600">
                    {language === 'en' ? '(Interchange)' : '(इंटरचेंज)'}
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="flex gap-2 mt-2">
            {result.route.linesUsed.map(l => (
              <span key={l.id} className="px-2 py-1 text-white" style={{backgroundColor: l.color}}>
                {l.name[language]}
              </span>
            ))}
          </div>

          <p>
            {language === 'en' ? 'Stops:' : 'स्टॉप:'} {result.route.totalStops}
          </p>
          <p>
            {language === 'en' ? 'Estimated Time:' : 'अनुमानित समय:'}{' '}
            {result.route.estimatedTimeMinutes} min
          </p>
          <p>
            {language === 'en' ? 'Fare:' : 'किराया:'} ₹{result.fare.fare}
          </p>
          {result.fare.notes && <p>{result.fare.notes}</p>}
          <p className="mt-2 font-semibold">
            {language === 'en' ? 'Suggestion:' : 'सुझाव:'} {result.suggestion.bestTicket}
          </p>
          <p>{result.suggestion.details}</p>
        </div>
      ) : (
        <p>{language === 'en' ? 'No route found or not searched yet.' : 'मार्ग नहीं मिला।'}</p>
      )}
    </div>
  );
};
