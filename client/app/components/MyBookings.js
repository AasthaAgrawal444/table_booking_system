// 'use client';

// import { useState, useEffect } from 'react';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/bookings");
//         const data = await response.json();
//         setBookings(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         alert("Failed to load bookings. Please try again.");
//       }
//     };

//     fetchBookings();
//   }, []);

//   // Delete booking
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         alert("Booking deleted successfully!");
//         setBookings(bookings.filter((booking) => booking._id !== id));
//       } else {
//         alert("Failed to delete booking. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>My Bookings</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.name}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.time}</td>
//                 <td>
//                   <button onClick={() => handleDelete(booking._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
// import styles from '../styles/MyBookings.module.css'; // Assuming your CSS file is named MyBookings.module.css

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to load bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  // Format date as dd-MM-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Delete booking
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Booking deleted successfully!");
        setBookings(bookings.filter((booking) => booking._id !== id));
      } else {
        alert("Failed to delete booking. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="my-bookings">
      <h1>All Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>No. of Guests</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{formatDate(booking.date)}</td>
                <td>{booking.guests}</td>
                <td>{booking.time}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

