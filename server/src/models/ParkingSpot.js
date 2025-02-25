const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  availability: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    recurring: {
      type: Boolean,
      default: false
    },
    availableDays: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: []
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  images: [String],
  features: {
    covered: { type: Boolean, default: false },
    security: { type: Boolean, default: false },
    snowRemoval: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Create a geospatial index for location-based queries
parkingSpotSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema); 