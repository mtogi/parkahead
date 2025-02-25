const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const ParkingSpot = require('../models/ParkingSpot');

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const { spot, user, date, startTime, endTime } = req.body;
    
    // Check if the spot exists
    const parkingSpot = await ParkingSpot.findById(spot);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    
    // Check if the spot is already reserved for the requested time
    const conflictingReservation = await Reservation.findOne({
      spot,
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
      ]
    });
    
    if (conflictingReservation) {
      return res.status(400).json({ message: 'This spot is already reserved for the requested time' });
    }
    
    // Calculate total price (simplified)
    const totalPrice = parkingSpot.price;
    
    // Create the reservation
    const newReservation = new Reservation({
      spot,
      user,
      date: new Date(date),
      startTime,
      endTime,
      totalPrice
    });
    
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reservations
router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId })
      .populate('spot')
      .sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    res.json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 