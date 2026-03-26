/**
 * @file api.js
 * @description Centralized abstracted API service layer to interface with the backend.
 * Currently uses mock data until the real API is ready.
 */

import { pnrDetails, trains, allStations, seatExchangeRequests, proximityAlerts } from '../mock/mockData';

// TODO: replace mock logic with actual 'fetch' or 'axios' calls to your backend API

export const api = {
  searchStations: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = allStations.filter(st => st.toLowerCase().includes(query.toLowerCase()));
        resolve(results);
      }, 300);
    });
  },

  getTrainStatus: async (trainNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const train = trains.find(t => t.trainNumber === trainNumber);
        resolve(train || null);
      }, 500);
    });
  },

  getPNRStatus: async (pnrNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pnrDetails[pnrNumber] || null);
      }, 600);
    });
  },

  getRoutes: async (from, to) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock algorithmic routes response
        resolve([
          {
            id: 'route_1',
            legs: [
              { train: '12952 Rajdhani', from: 'New Delhi', to: 'Vadodara', time: '16:25 - 03:52' },
              { train: '16345 Netravati', from: 'Vadodara', to: 'Ernakulam', time: '06:07 - 14:15' }
            ],
            layover: '2h 15m'
          }
        ]);
      }, 800);
    });
  }
};
