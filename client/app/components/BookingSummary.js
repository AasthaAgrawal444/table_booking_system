'use client';

export default function BookingSummary({ details }) {
  return (
    <div className="booking-summary">
      <h2>Booking Confirmed!</h2>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Date:</strong> {details.date}
      </p>
      <p>
        <strong>Time:</strong> {details.time}
      </p>
      <p>
        <strong>Guests:</strong> {details.guests}
      </p>
      <p>
        <strong>Contact:</strong> {details.contact}
      </p>
    </div>
  );
}
