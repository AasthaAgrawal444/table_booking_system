const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const cookieParser = require('cookie-parser'); // Add this line


// Load environment variables
dotenv.config({});

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();


const allowedOrigins = [
    'http://localhost:3000',
    'https://table-booking-system-tan.vercel.app', // Add your deployed client origin
  ];

// Middleware
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Include credentials if required
  }));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Routes
app.use('/api/bookings', bookingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
