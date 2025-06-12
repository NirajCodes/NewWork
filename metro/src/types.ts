export interface LocalizedString {
  en: string;
  hi: string;
}

export interface StationDetail {
  id: string;
  name: LocalizedString;
  code: string;
  lines: string[];
  facilities: {
    lift: boolean;
    escalator: boolean;
    parking: boolean;
    atm: boolean;
    toilet: boolean;
  };
  timings: {
    firstTrain: LocalizedString;
    lastTrain: LocalizedString;
  };
  platformLayout?: LocalizedString;
  nearbyLandmarks?: LocalizedString[];
  accessibilityOptions?: LocalizedString[];
  latitude?: number;
  longitude?: number;
}

export interface Line {
  id: string;
  name: LocalizedString;
  color: string;
  stations: string[];
}

export interface FareRules {
  baseFare: number;
  perStationFareMultiplier: number;
  minFare: number;
  maxFare: number;
  smartCardDiscountPercent: number;
  touristCardOptions: {
    oneDay: { price: number; name: LocalizedString };
    threeDay: { price: number; name: LocalizedString };
  };
}

export interface MetroData {
  lines: Line[];
  stations: StationDetail[];
  fareRules: FareRules;
}

export interface RouteInfo {
  path: StationDetail[];
  linesUsed: Line[];
  interchanges: StationDetail[];
  totalStops: number;
  estimatedTimeMinutes: number;
}

export interface FareResult {
  fare: number;
  notes?: string;
}

export interface TicketSuggestion {
  bestTicket: string;
  details: string;
  monthlySavings?: number;
}
