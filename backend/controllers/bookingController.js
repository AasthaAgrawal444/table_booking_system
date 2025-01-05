const Booking = require('../models/booking');
const mongoose = require('mongoose');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newBooking = new Booking({ name, email, phone, date, time, guests });
    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete a booking by ID
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectIdRegex.test(id)) {
        return res.status(400).json({ error: 'Invalid booking ID.' });
      }

    const deletedBooking = await Booking.findOneAndDelete({ _id: id });
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    console.error('Error deleting booking:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
