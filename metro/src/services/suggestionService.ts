import type { FareRules, TicketSuggestion } from '../types';

export function suggestTicket(
  numStations: number,
  usage: 'single' | 'daily' | 'tourist',
  fareRules: FareRules,
  language: 'en' | 'hi'
): TicketSuggestion {
  if (usage === 'tourist') {
    const option = fareRules.touristCardOptions.oneDay;
    return {
      bestTicket: option.name[language],
      details: language === 'en'
        ? `Unlimited travel for a day at ₹${option.price}`
        : `एक दिन के लिए असीमित यात्रा ₹${option.price}`,
    };
  }

  const singleFare = fareRules.baseFare + numStations * fareRules.perStationFareMultiplier;
  const discounted = singleFare - (singleFare * fareRules.smartCardDiscountPercent) / 100;

  if (usage === 'daily') {
    return {
      bestTicket: language === 'en' ? 'Smart Card' : 'स्मार्ट कार्ड',
      details: language === 'en'
        ? 'Best for regular commuters with 10% discount'
        : 'नियमित यात्रियों के लिए 10% छूट',
      monthlySavings: (singleFare - discounted) * 40,
    };
  }

  return {
    bestTicket: language === 'en' ? 'Token' : 'टोकन',
    details: '',
  };
}
