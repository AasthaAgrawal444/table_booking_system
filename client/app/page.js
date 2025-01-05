"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BookingModal from "./components/BookingModal";
import BookingSummary from "./components/BookingSummary";
import resImage from '../public/resImage.jpg'; // Import the image from the public folder
import Image from "next/image"; // Import the Image component


export default function Home() {
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [bookingSummary, setBookingSummary] = useState(null); // To store booking summary

  return (
    <div>
      <Navbar />
      <div className="landing-container">
      <Image
        src="/resImage.jpg"
        alt="Restaurant Hero"
        className="hero-image"
        fill
        // priority
        sizes="100vw"
      />
      <div className="centered-content">
      
        <h1 className="landing-title">Welcome to Our Restaurant</h1>
        <button className="book-button" onClick={() => setShowModal(true)}>
          Book a Table
        </button>
      </div>
      </div>


         {/* Booking Summary */}
      {bookingSummary && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h3>Booking Successful!</h3>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Email:</strong> {bookingSummary.email}</p>
          <p><strong>Phone:</strong> {bookingSummary.phone}</p>
          <p><strong>Date:</strong> {new Date(bookingSummary.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {bookingSummary.time}</p>
          <p><strong>Guests:</strong> {bookingSummary.guests}</p>
        </div>
      )}

        {showModal && (
          <BookingModal
            setShowModal={setShowModal}
            setBookingSummary={setBookingSummary} // Pass state updater
          />
        )}
        
      </div>
    // </div>
  );
}
