const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, deleteBooking } = require('../controllers/bookingController');

// Routes for bookings
router.post('/', createBooking); // Create a booking
router.get('/', getAllBookings); // Get all bookings
router.delete('/:id', deleteBooking); // Delete a booking by ID

module.exports = router;
