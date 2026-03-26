/**
 * @file seatService.js
 * @description Handles Seat Exchange logic.
 * 
 * WHY THIS FILE EXISTS:
 * Service wrapper for seat exchange functionality.
 * 
 * WHAT WILL BREAK IF REMOVED:
 * Seat Exchange page will crash.
 */

// ⚠️ Replace with real API call using .env when backend is ready
import { seatExchangeRequests } from '../mock/mockData';

export const seatService = {
  getRequests: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(seatExchangeRequests), 500);
    });
  },
  submitRequest: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReq = {
          id: `req_${Date.now()}`,
          ...data,
          status: 'Open',
          createdAt: new Date().toISOString()
        };
        seatExchangeRequests.push(newReq);
        resolve(newReq);
      }, 600);
    });
  }
};
