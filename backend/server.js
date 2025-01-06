// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const bookingRoutes = require('./routes/bookingRoutes');
// const cookieParser = require('cookie-parser'); // Add this line


// // Load environment variables
// dotenv.config({});

// // Connect to MongoDB
// connectDB();

// // Initialize app
// const app = express();


// const allowedOrigins = [
//     // 'http://localhost:3000',
//     'https://table-booking-system-tan.vercel.app', // Add your deployed client origin
//   ];

// // Middleware
// app.use(express.json());

// app.use(cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
//     credentials: true, // Include credentials if required
//   }));
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// // Routes
// app.use('/api/bookings', bookingRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     connectDB();
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config({});

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Uncomment for local development
  'https://table-booking-system-7xcg1is3s-aasthas-projects-840b454f.vercel.app', // Add your deployed client origin
];

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`); // Log blocked origins
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  })
);

// Handle preflight requests
app.options('*', cors());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/bookings', bookingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
