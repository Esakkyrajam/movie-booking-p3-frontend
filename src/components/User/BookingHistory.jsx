// import { useEffect, useState } from "react";
// import axiosInstance from "../../api";

// // --- HELPER FUNCTION 1: Check Expiration (Uses current time: Oct 19, 2025, 7:46 AM IST)
// const isExpired = (dateString, timeString) => {
//   // Combine date and time into a single Date object
//   const showDateTime = new Date(`${dateString}T${timeString}`);
//   const now = new Date();

//   // The booking is expired if the show time is in the past
//   return showDateTime < now;
// };

// // --- HELPER FUNCTION 2: Format Time to 12-Hour Clock
// const formatTime = (time24h) => {
//   if (!time24h) return "N/A";
//   try {
//     // time24h is typically a string like "22:20:00"
//     const [hours, minutes] = time24h.split(":");

//     let h = parseInt(hours, 10);
//     const ampm = h >= 12 ? "PM" : "AM";
//     h = h % 12 || 12; // Convert '0' or '12' to '12'

//     // Returns a string like "10:20 PM"
//     return `${h}:${minutes} ${ampm}`;
//   } catch (e) {
//     console.error("Time formatting error:", e);
//     return time24h; // Return original if parsing fails
//   }
// };

// function BookingHistory({ movies, shows, theaters }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   useEffect(() => {
//     // ... (Your fetch bookings logic) ...
//     const fetchBookings = async () => {
//       try {
//         const res = await axiosInstance.get(`/bookings/user/${userId}`);
//         setBookings(res.data);
//       } catch (err) {
//         console.error("Failed to fetch bookings:", err);
//         alert("Failed to load booking history.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [userId]);

//   // ... (Your useEffect for logging state is omitted for brevity)

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;

//   if (!bookings.length)
//     return <p className="text-center text-gray-600">No bookings found.</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Booking History</h2>
//       <div className="grid gap-4">
//         {bookings.map((booking) => {
//           const showTimeDetails = booking.showTime;
//           const movieDetails = showTimeDetails?.movie;
//           const theaterDetails = showTimeDetails?.theater;
//           const seats = booking.bookedSeats.split(",");

//           // --- NEW LOGIC ---
//           const expired = isExpired(
//             showTimeDetails?.date,
//             showTimeDetails?.time
//           );
//           const statusClass = expired
//             ? "text-red-600 font-bold"
//             : "text-gray-900";

//           const readableDate = showTimeDetails?.date
//             ? new Date(showTimeDetails.date).toLocaleDateString(undefined, {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })
//             : "N/A";

//           const readableTime = formatTime(showTimeDetails?.time);
//           // -----------------

//           return (
//             <div
//               key={booking.id}
//               className={`bg-white p-4 rounded shadow ${
//                 expired ? "border-2 border-red-300" : ""
//               }`}
//             >
//               <h3>Movie: {movieDetails?.title}</h3>
//               <p>Theater: {theaterDetails?.name}</p>

//               {/* Display Show Date and the NEW 12-hour Time */}
//               <p className={statusClass}>
//                 Show: {readableDate} at {readableTime}
//                 {expired && <span className="ml-2">(EXPIRED)</span>}
//               </p>

//               <p>Seats: {seats.join(", ")}</p>
//               {/* <p>Status: {booking.status}</p> */}
//               <p>Amount: Rs. {booking.amount}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default BookingHistory;

import { useEffect, useState } from "react";
import axiosInstance from "../../api";

const isExpired = (dateString, timeString) => {
  const showDateTime = new Date(`${dateString}T${timeString}`);
  const now = new Date();
  return showDateTime < now;
};

const formatTime = (time24h) => {
  if (!time24h) return "N/A";
  try {
    const [hours, minutes] = time24h.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  } catch (e) {
    console.error("Time formatting error:", e);
    return time24h;
  }
};

function BookingHistory({ movies, shows, theaters }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/user/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        alert("Failed to load booking history.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (!bookings.length)
    return <p className="text-center text-gray-600">No bookings found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900">
        Booking History
      </h2>

      <div className="space-y-8 max-w-4xl mx-auto">
        {bookings.map((booking) => {
          const showTimeDetails = booking.showTime;
          const movieDetails = showTimeDetails?.movie;
          const theaterDetails = showTimeDetails?.theater;
          const seats = booking.bookedSeats.split(",");

          const expired = isExpired(
            showTimeDetails?.date,
            showTimeDetails?.time
          );
          const statusClass = expired
            ? "text-red-600 font-bold"
            : "text-gray-900";

          const readableDate = showTimeDetails?.date
            ? new Date(showTimeDetails.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A";

          const readableTime = formatTime(showTimeDetails?.time);

          return (
            <div
              key={booking.id}
              className={`relative bg-white rounded-3xl shadow-lg p-6 border-l-8 ${
                expired ? "border-red-500 bg-red-50" : "border-indigo-600"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-extrabold text-gray-900 select-text">
                  {movieDetails?.title}
                </h3>
                {expired && (
                  <span className="text-red-700 uppercase font-semibold tracking-wide px-3 py-1 rounded-xl bg-red-200 select-none">
                    Expired
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-gray-800 select-text">
                <div>
                  <p className="font-semibold">Theater</p>
                  <p>{theaterDetails?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Show Date</p>
                  <p>{readableDate}</p>
                </div>
                <div>
                  <p className="font-semibold">Show Time</p>
                  <p>{readableTime}</p>
                </div>
                <div>
                  <p className="font-semibold">Seats</p>
                  <p>{seats.join(", ")}</p>
                </div>
              </div>

              <hr className="my-5 border-gray-300" />

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">
                  Total Paid:{" "}
                  <span className="text-indigo-600">₹ {booking.amount}</span>
                </p>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    expired
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  } transition-colors`}
                  disabled={expired}
                  onClick={() => alert("Refund / Details functionality")}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingHistory;
