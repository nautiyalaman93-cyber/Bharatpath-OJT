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

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Helper to get token (assuming standard localStorage implementation)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const seatService = {
  getRequests: async (trainNumber) => {
    try {
      const url = trainNumber ? `${BASE_URL}/api/seats/all?trainNumber=${encodeURIComponent(trainNumber)}` : `${BASE_URL}/api/seats/all`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch seat requests');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching seat requests:', error);
      return [];
    }
  },
  
  getMyRequests: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/seats/my-requests`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch user seat requests');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching my seat requests:', error);
      return [];
    }
  },

  getMyConversations: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/seats/conversations`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch conversations');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  },

  submitRequest: async (data) => {
    // data may include: { pnr, trainNumber, coach, currentSeat, wantedSeat, userLat, userLng }
    const response = await fetch(`${BASE_URL}/api/seats/request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      // Throw the server's error message so the UI can display it
      throw new Error(responseData.message || 'Failed to submit seat request');
    }
    return responseData.data;
  },

  // --- Messages ---
  sendMessage: async (requestId, text, receiverId = null) => {
    try {
      const body = { text };
      if (receiverId) body.receiverId = receiverId;

      const response = await fetch(`${BASE_URL}/api/seats/${requestId}/message`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getMessages: async (requestId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/seats/${requestId}/messages`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  deleteRequest: async (requestId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/seats/${requestId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete seat request');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting seat request:', error);
      throw error;
    }
  }
};
