/**
 * @file seatController.js
 * @description Handles Seat Exchange (P2P Swap) requests.
 */

const SeatRequest = require('../models/SeatRequest');
const Message = require('../models/Message');
const { fetchWithKeyRotation } = require('../services/apiService');

// -----------------------------------------------------------------------
// Helper: Haversine formula to calculate distance between two GPS coords.
// Returns distance in kilometers.
// -----------------------------------------------------------------------
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// -----------------------------------------------------------------------
// @route   POST /api/seats/request
// @desc    Create a new seat swap request
// @access  Protected
//
// VALIDATION FLOW:
// 1. Validate PNR is real and belongs to the given trainNumber.
// 2. If user sends their GPS coordinates, check proximity to train (≤50km).
// 3. If all checks pass, create the SeatRequest.
// -----------------------------------------------------------------------
const createRequest = async (req, res) => {
  const { pnr, trainNumber, coach, currentSeat, wantedSeat, userLat, userLng } = req.body;

  if (!pnr || !trainNumber || !coach || !currentSeat || !wantedSeat) {
    return res.status(400).json({ message: 'Please fill in all required fields (pnr, trainNumber, coach, currentSeat, wantedSeat).' });
  }

  // ----- Step 1: Validate PNR -----
  let journeyDate = new Date().toISOString().split('T')[0]; // fallback to today
  try {
    const pnrData = await fetchWithKeyRotation(`/api/v3/getPNRStatus?pnrNumber=${pnr}`);
    const pnrInfo = pnrData && pnrData.data ? pnrData.data : null;

    if (!pnrInfo) {
      return res.status(400).json({ message: 'Invalid PNR. Could not verify your booking.' });
    }

    // Check train number matches (API may return as string or number)
    const pnrTrain = String(pnrInfo.trainNumber || pnrInfo.train_number || '').trim();
    const reqTrain = String(trainNumber).trim();
    if (pnrTrain && pnrTrain !== reqTrain) {
      return res.status(400).json({
        message: `PNR ${pnr} is for Train ${pnrTrain}, but you entered Train ${reqTrain}. Please check your details.`,
      });
    }

    // Extract journey date from PNR if available
    if (pnrInfo.dateOfJourney || pnrInfo.doj) {
      journeyDate = pnrInfo.dateOfJourney || pnrInfo.doj;
    }
  } catch (pnrErr) {
    // If PNR API is down, we still proceed but log the warning
    console.warn('⚠️ PNR validation skipped — API unavailable:', pnrErr.message);
  }

  // ----- Step 2: Geolocation Proximity Check -----
  // Only run if the frontend sent coordinates
  if (userLat !== undefined && userLng !== undefined) {
    try {
      const trainStatusData = await fetchWithKeyRotation(`/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`);
      const trainInfo = trainStatusData && trainStatusData.data ? trainStatusData.data : null;

      if (trainInfo) {
        // Try to get train's current coordinates
        // The IRCTC API returns currentStation with lat/lng in some versions
        const trainLat = trainInfo.currentLat || trainInfo.lat || trainInfo.latitude;
        const trainLng = trainInfo.currentLng || trainInfo.lng || trainInfo.longitude;

        if (trainLat && trainLng) {
          const distanceKm = haversineDistance(
            parseFloat(userLat), parseFloat(userLng),
            parseFloat(trainLat), parseFloat(trainLng)
          );

          console.log(`📍 User ↔ Train distance: ${distanceKm.toFixed(1)} km`);

          // Threshold: user must be within 50 km of the train's current position
          if (distanceKm > 50) {
            return res.status(403).json({
              message: `You appear to be ${Math.round(distanceKm)} km away from Train ${trainNumber}. Seat exchange is only allowed for passengers currently on the train.`,
            });
          }
        } else {
          // Train coordinates not available in API response — skip geo check
          console.warn('⚠️ Train coordinates not found in Live Status API. Skipping geo check.');
        }
      }
    } catch (geoErr) {
      // If live status API fails, skip geo check (don't block the user)
      console.warn('⚠️ Geo check skipped — Live Status API unavailable:', geoErr.message);
    }
  }

  // ----- Step 3: Create the Seat Swap Request -----
  try {
    const newRequest = await SeatRequest.create({
      user: req.user._id,
      trainNumber,
      journeyDate,
      coach,
      currentSeat,
      wantedSeat,
      status: 'open',
    });

    const populated = await newRequest.populate('user', 'name avatar');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error('Create Seat Request Error:', error.message);
    res.status(500).json({ message: 'Failed to create seat request.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/seats/all
// @desc    Get all open seat swap requests
// @access  Public
// -----------------------------------------------------------------------
const getAllRequests = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Auto-close expired requests (where journeyDate < today)
    // Note: This logic assumes journeyDate is in YYYY-MM-DD or YYYYMMDD format that is comparable
    await SeatRequest.updateMany(
      { journeyDate: { $lt: todayStr }, status: 'open' },
      { status: 'closed' }
    );

    const filter = { status: 'open' };
    if (req.query.trainNumber) {
      filter.trainNumber = req.query.trainNumber;
    }
    const requests = await SeatRequest.find(filter)
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    console.error('Get Seat Requests Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch seat requests.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/seats/my-requests
// @desc    Get requests created by the logged in user
// @access  Protected
// -----------------------------------------------------------------------
const getMyRequests = async (req, res) => {
  try {
    const requests = await SeatRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Get My Requests Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch your requests.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/seats/conversations
// @desc    Get requests where the user has sent or received messages (excluding their own)
// @access  Protected
// -----------------------------------------------------------------------
const getMyConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    });
    
    const requestIds = [...new Set(messages.map(m => m.seatRequest.toString()))];
    
    const requests = await SeatRequest.find({
      _id: { $in: requestIds },
      user: { $ne: req.user._id } 
    }).populate('user', 'name avatar').sort({ createdAt: -1 });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Get My Conversations Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch conversations.' });
  }
};

// -----------------------------------------------------------------------
// @route   DELETE /api/seats/:id
// @desc    Close/delete your own seat swap request
// @access  Protected
// -----------------------------------------------------------------------
const deleteRequest = async (req, res) => {
  try {
    const request = await SeatRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Seat request not found.' });
    }

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own requests.' });
    }

    request.status = 'closed';
    await request.save();

    res.json({ success: true, message: 'Seat request closed successfully.' });
  } catch (error) {
    console.error('Delete Seat Request Error:', error.message);
    res.status(500).json({ message: 'Failed to delete seat request.' });
  }
};

// -----------------------------------------------------------------------
// @route   POST /api/seats/:id/message
// @desc    Send a message to the owner of a seat request
// @access  Protected
// -----------------------------------------------------------------------
const sendMessage = async (req, res) => {
  const { text, receiverId } = req.body;
  try {
    const request = await SeatRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Seat request not found.' });

    // Determine receiver:
    // 1. If sender is someone ELSE, receiver is automatically the request owner.
    // 2. If sender is the OWNER, they must provide a receiverId (the person they are replying to).
    let receiver = request.user;
    
    const isOwner = request.user.toString() === req.user._id.toString();
    
    if (isOwner) {
      if (!receiverId) {
        return res.status(400).json({ message: 'As the owner, you must provide a receiverId to reply.' });
      }
      receiver = receiverId;
    }

    // Safety check: Cannot message yourself
    if (receiver.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot send a message to yourself.' });
    }

    const message = await Message.create({
      seatRequest: request._id,
      sender: req.user._id,
      receiver,
      text
    });

    const populated = await message.populate('sender', 'name avatar');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error('Send Message Error:', error.message);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};

// -----------------------------------------------------------------------
// @route   GET /api/seats/:id/messages
// @desc    Get all messages for a specific seat request (only for sender or receiver)
// @access  Protected
// -----------------------------------------------------------------------
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ seatRequest: req.params.id })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });
      
    // Basic filter: only return messages if current user is involved
    const filtered = messages.filter(msg => 
      msg.sender._id.toString() === req.user._id.toString() || 
      msg.receiver.toString() === req.user._id.toString()
    );

    res.json({ success: true, data: filtered });
  } catch (error) {
    console.error('Get Messages Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
};

module.exports = { createRequest, getAllRequests, getMyRequests, deleteRequest, sendMessage, getMessages, getMyConversations };
