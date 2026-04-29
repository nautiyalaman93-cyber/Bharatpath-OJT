/**
 * @file trainController.js
 * @description Handles Live Train Status and Train Search.
 *
 * HOW IT WORKS:
 * - Checks an in-memory cache first (5 minute TTL) to save API quota.
 * - If cache miss → tries real API with key rotation.
 * - If API fails → returns mock JSON.
 *
 * ROUTES HANDLED:
 * - GET /api/trains/status?number=12952&date=20241225  → Live Status
 * - GET /api/trains/search?from=NDLS&to=MMCT&date=20241225 → Search Trains
 */

const { fetchWithKeyRotation } = require('../services/apiService');
const trainMock = require('../mock/trainMock.json');

// -----------------------------------------------------------------------
// In-Memory Cache (5 minute TTL)
// Key format: 'status_{trainNo}_{date}' or 'search_{from}_{to}_{date}'
// -----------------------------------------------------------------------
const trainCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves a value from the cache if it exists and has not expired.
 * @param {string} key
 */
const getCached = (key) => {
  const entry = trainCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    trainCache.delete(key); // Remove stale entry
    return null;
  }
  return entry.data;
};

/**
 * Stores a value in the cache with a 5-min expiry.
 * @param {string} key
 * @param {*} data
 */
const setCache = (key, data) => {
  trainCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
};

// -----------------------------------------------------------------------
// @route   GET /api/trains/status
// @desc    Get live running status of a train
// @access  Public
// -----------------------------------------------------------------------
const getTrainStatus = async (req, res) => {
  const { number, date } = req.query;

  if (!number) {
    return res.status(400).json({ message: 'Train number is required.' });
  }

  // Check cache first
  const cacheKey = `status_${number}_${date || 'today'}`;
  const cached = getCached(cacheKey);
  if (cached) {
    console.log(`✅ Cache HIT for ${cacheKey}`);
    return res.json({ success: true, data: cached, fromCache: true });
  }

  try {
    console.log(`🔄 Cache MISS for ${cacheKey} — calling API`);
    const data = await fetchWithKeyRotation(`/api/v1/liveTrainStatus?trainNo=${number}&startDay=1`);
    setCache(cacheKey, data.data);
    return res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Train Status API Error:', error.message);
    // Return specific mock if available, else first mock
    const specificMock = trainMock[number] || Object.values(trainMock)[0];
    return res.json({ success: true, data: specificMock, isMock: true, note: 'All API keys failed, showing mock data.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/trains/search
// @desc    Search trains between two stations on a given date
// @access  Public
// -----------------------------------------------------------------------
const searchTrains = async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ message: 'Please provide from, to, and date query params.' });
  }

  // Check cache first
  const cacheKey = `search_${from}_${to}_${date}`;
  const cached = getCached(cacheKey);
  if (cached) {
    console.log(`✅ Cache HIT for ${cacheKey}`);
    return res.json({ success: true, data: cached, fromCache: true });
  }

  try {
    console.log(`🔄 Cache MISS for ${cacheKey} — calling API`);
    const data = await fetchWithKeyRotation(`/api/v3/trainBetweenStations?fromStationCode=${from}&toStationCode=${to}&dateOfJourney=${date}`);
    setCache(cacheKey, data.data);
    return res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Train Search API Error:', error.message);
    const mockTrains = [
      { trainNumber: '12952', trainName: 'Mumbai Rajdhani Express', departure: '16:55', arrival: '08:35', duration: '15h 40m', availableClasses: ['1A', '2A', '3A'], runningDays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
      { trainNumber: '12002', trainName: 'New Delhi Shatabdi', departure: '06:00', arrival: '10:45', duration: '4h 45m', availableClasses: ['CC', 'EC'], runningDays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
      { trainNumber: '12622', trainName: 'Tamil Nadu Express', departure: '21:05', arrival: '06:15', duration: '33h 10m', availableClasses: ['SL', '3A', '2A', '1A'], runningDays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
      { trainNumber: '12050', trainName: 'Gatimaan Express', departure: '08:10', arrival: '09:50', duration: '1h 40m', availableClasses: ['CC', 'EC'], runningDays: ['Mon','Tue','Wed','Thu','Sat','Sun'] },
      { trainNumber: '12434', trainName: 'Chennai Rajdhani', departure: '15:35', arrival: '20:45', duration: '29h 10m', availableClasses: ['1A', '2A', '3A'], runningDays: ['Wed','Fri'] },
    ];
    return res.json({ success: true, data: mockTrains, isMock: true, note: 'Showing sample data — live API temporarily unavailable.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/trains/stations/search
// @desc    Search stations by partial name or code
// @access  Public
// -----------------------------------------------------------------------
const searchStations = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Please provide a query.' });
  }

  try {
    const data = await fetchWithKeyRotation(`/api/v1/searchStation?query=${query}`);
    return res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Station Search API Error:', error.message);
    const stationMock = require('../mock/stationMock.json');
    const matched = stationMock.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    return res.json({ success: true, data: matched, isMock: true, note: 'All API keys failed, showing mock data.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/trains/connecting
// @desc    Search for connecting journeys (mock fallback implemented)
// @access  Public
// -----------------------------------------------------------------------
const getConnectingJourneys = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ message: 'Please provide from and to query params.' });
  }

  const mockRoutes = [
    {
      label: 'Option 1: via Vadodara',
      reliability: 'High Reliability',
      totalDuration: '21h 50m',
      legs: [
        { train: '12952 Rajdhani', from: from.split(' | ')[0] || 'Origin', to: 'Vadodara', time: '16:25 – 03:52' },
      ],
      layover: { station: 'Vadodara Jn', duration: '2h 15m' },
      legs2: [
        { train: '16345 Netravati', from: 'Vadodara', to: to.split(' | ')[0] || 'Dest', time: '06:07 – 14:15' },
      ],
    },
    {
      label: 'Option 2: via Mumbai',
      reliability: 'Standard',
      totalDuration: '28h 20m',
      legs: [
        { train: '12952 Rajdhani', from: from.split(' | ')[0] || 'Origin', to: 'Mumbai Central', time: '16:25 – 08:35' },
      ],
      layover: { station: 'Mumbai Central', duration: '4h 45m' },
      legs2: [
        { train: '16312 Kochuveli Exp', from: 'Mumbai Central', to: to.split(' | ')[0] || 'Dest', time: '13:20 – 16:40' },
      ],
    },
  ];

  return res.json({ success: true, data: mockRoutes, isMock: true });
};

module.exports = { getTrainStatus, searchTrains, searchStations, getConnectingJourneys };
