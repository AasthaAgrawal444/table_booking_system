import React, { useState } from "react";
// import styles from "../styles/BookingForm.module.css";
import Image from "next/image";
// import CloseIcon from "./public/close-icon.svg";

export default function BookingForm({ setShowModal, setBookingSummary }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be a valid 10-digit number.";
    if (!formData.date.trim()) newErrors.date = "Date is required.";
    else if (new Date(formData.date) < new Date())
      newErrors.date = "Date cannot be in the past.";
    if (!formData.time.trim()) newErrors.time = "Time is required.";
    if (!formData.guests.trim() || formData.guests <= 0)
      newErrors.guests = "Guests must be at least 1.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(errorData.msg || "Failed to create booking");
      }

      const data = await response.json();
      console.log(data);
      setBookingSummary(data.booking); // Pass booking data to summary
      setShowModal(false); // Close modal
    } catch (error) {
      alert(error.message || "Something went wrong.");
    }
  };

  // Generate time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const times = [];
    let hour = 18; // 6:00 PM
    let minute = 0;

    for (let i = 0; i < 12; i++) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const time = `${formattedHour}:${minute === 0 ? "00" : minute} ${ampm}`;
      times.push(time);

      minute = minute === 0 ? 30 : 0; // Toggle between 00 and 30 minutes
      if (minute === 0) hour++; // Move to the next hour if it's 00 minutes
    }

    return times;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowModal(false)}>
          {/* <Image src={CloseIcon} alt="Close" /> */}
        </button>
        <h2>Book a Table</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
            {errors.date && <p className={styles.error}>{errors.date}</p>}
          </label>
          <label>
            Time:
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={styles.timeSelect}
            >
              <option value="">Select a time</option>
              {generateTimeSlots().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && <p className={styles.error}>{errors.time}</p>}
          </label>
          <label>
            Guests:
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
            />
            {errors.guests && <p className={styles.error}>{errors.guests}</p>}
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
