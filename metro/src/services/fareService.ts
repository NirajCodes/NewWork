import type { FareRules, FareResult } from '../types';

export function calculateFare(
  numStations: number,
  ticketType: 'token' | 'smartCard',
  fareRules: FareRules,
  language: 'en' | 'hi'
): FareResult {
  let fare = fareRules.baseFare + numStations * fareRules.perStationFareMultiplier;
  fare = Math.max(fareRules.minFare, Math.min(fare, fareRules.maxFare));

  if (ticketType === 'smartCard') {
    fare = fare - (fare * fareRules.smartCardDiscountPercent) / 100;
    return {
      fare,
      notes: language === 'en' ? '10% smart card discount applied' : 'स्मार्ट कार्ड पर 10% छूट',
    };
  }

  return { fare };
}
