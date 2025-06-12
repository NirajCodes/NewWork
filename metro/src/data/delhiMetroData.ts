import type { MetroData } from '../types';

const metroData: MetroData = {
  lines: [
    {
      id: 'red',
      name: { en: 'Red Line', hi: 'लाल लाइन' },
      color: '#d32f2f',
      stations: ['R1', 'R2', 'I1', 'R3'],
    },
    {
      id: 'blue',
      name: { en: 'Blue Line', hi: 'नीली लाइन' },
      color: '#2196f3',
      stations: ['B1', 'I1', 'B2'],
    },
  ],
  stations: [
    {
      id: 'R1',
      name: { en: 'Rithala', hi: 'रिठाला' },
      code: 'RI',
      lines: ['red'],
      facilities: { lift: true, escalator: true, parking: false, atm: false, toilet: true },
      timings: { firstTrain: { en: '05:30', hi: '05:30' }, lastTrain: { en: '23:30', hi: '23:30' } },
      latitude: 28.721, longitude: 77.107,
    },
    {
      id: 'R2',
      name: { en: 'Netaji Subhash Place', hi: 'नेताजी सुभाष प्लेस' },
      code: 'NSP',
      lines: ['red'],
      facilities: { lift: true, escalator: true, parking: true, atm: true, toilet: true },
      timings: { firstTrain: { en: '05:35', hi: '05:35' }, lastTrain: { en: '23:35', hi: '23:35' } },
      latitude: 28.689, longitude: 77.148,
    },
    {
      id: 'I1',
      name: { en: 'Kashmere Gate', hi: 'कश्मीरी गेट' },
      code: 'KG',
      lines: ['red', 'blue'],
      facilities: { lift: true, escalator: true, parking: true, atm: true, toilet: true },
      timings: { firstTrain: { en: '05:20', hi: '05:20' }, lastTrain: { en: '23:40', hi: '23:40' } },
      latitude: 28.667, longitude: 77.227,
    },
    {
      id: 'R3',
      name: { en: 'Shastri Park', hi: 'शास्त्री पार्क' },
      code: 'SP',
      lines: ['red'],
      facilities: { lift: true, escalator: true, parking: false, atm: false, toilet: false },
      timings: { firstTrain: { en: '05:25', hi: '05:25' }, lastTrain: { en: '23:45', hi: '23:45' } },
      latitude: 28.678, longitude: 77.233,
    },
    {
      id: 'B1',
      name: { en: 'Dwarka', hi: 'द्वारका' },
      code: 'DW',
      lines: ['blue'],
      facilities: { lift: true, escalator: true, parking: true, atm: true, toilet: true },
      timings: { firstTrain: { en: '05:15', hi: '05:15' }, lastTrain: { en: '23:25', hi: '23:25' } },
      latitude: 28.592, longitude: 77.043,
    },
    {
      id: 'B2',
      name: { en: 'Rajiv Chowk', hi: 'राजीव चौक' },
      code: 'RC',
      lines: ['blue'],
      facilities: { lift: true, escalator: true, parking: true, atm: true, toilet: true },
      timings: { firstTrain: { en: '05:25', hi: '05:25' }, lastTrain: { en: '23:35', hi: '23:35' } },
      latitude: 28.632, longitude: 77.219,
    },
  ],
  fareRules: {
    baseFare: 10,
    perStationFareMultiplier: 2,
    minFare: 10,
    maxFare: 50,
    smartCardDiscountPercent: 10,
    touristCardOptions: {
      oneDay: { price: 200, name: { en: '1 Day Pass', hi: '1 दिन पास' } },
      threeDay: { price: 500, name: { en: '3 Day Pass', hi: '3 दिन पास' } },
    },
  },
};

export default metroData;
