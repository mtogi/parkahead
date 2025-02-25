const express = require('express');
const router = express.Router();
const ParkingSpot = require('../models/ParkingSpot');

// Get all parking spots
router.get('/', async (req, res) => {
  try {
    const parkingSpots = await ParkingSpot.find().populate('owner', 'name');
    res.json(parkingSpots);
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get parking spots near a location
router.get('/near', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query; // maxDistance in meters
    
    if (!lng || !lat) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }
    
    const parkingSpots = await ParkingSpot.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).populate('owner', 'name');
    
    res.json(parkingSpots);
  } catch (error) {
    console.error('Error fetching nearby parking spots:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new parking spot
router.post('/', async (req, res) => {
  try {
    const newSpot = new ParkingSpot(req.body);
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (error) {
    console.error('Error creating parking spot:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific parking spot
router.get('/:id', async (req, res) => {
  try {
    const parkingSpot = await ParkingSpot.findById(req.params.id).populate('owner', 'name phone');
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    res.json(parkingSpot);
  } catch (error) {
    console.error('Error fetching parking spot:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 