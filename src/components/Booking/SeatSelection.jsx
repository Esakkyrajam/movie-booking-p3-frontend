// import { useState, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// function SeatSelection({ shows, axiosInstance, onBookingSuccess }) {
//   const { showId } = useParams();
//   const navigate = useNavigate();
//   // console.log("Axios Instance:", typeof axiosInstance.baseURL);
//   const currentShowId = parseInt(showId);
//   const show = shows.find((s) => s.id === currentShowId);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;
//   // console.log("Current show details:", show);

//   // -------------------------------
//   // HOOKS MUST COME FIRST
//   // -------------------------------
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isBooking, setIsBooking] = useState(false);
//   const [error, setError] = useState(null); // Added error state

//   // -------------------------------
//   // EARLY RETURN FOR ERROR STATE
//   // -------------------------------
//   if (!show || !show.theater) {
//     return (
//       <div className="container mx-auto p-4 text-red-600">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p>Show with ID "{showId}" not found or missing theater details.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const { rows, cols } = show.theater;

//   // -------------------------------
//   // GENERATE ALL SEATS
//   // -------------------------------
//   const allSeats = useMemo(() => {
//     const seats = [];
//     for (let r = 0; r < rows; r++) {
//       const rowLabel = String.fromCharCode(65 + r);
//       for (let c = 1; c <= cols; c++) {
//         seats.push(`${rowLabel}${c}`);
//       }
//     }
//     return seats;
//   }, [rows, cols]);

//   // -------------------------------
//   // AVAILABLE SEATS SAFE PARSING
//   // -------------------------------
//   const availableSeatsSet = useMemo(() => {
//     try {
//       const rawSeats = show.availableSeats;

//       if (!rawSeats) {
//         console.warn(
//           "Available seats data is missing. Assuming 0 available seats."
//         );
//         return new Set();
//       }

//       if (Array.isArray(rawSeats)) {
//         return new Set(rawSeats);
//       }

//       if (typeof rawSeats === "string" && rawSeats.trim().startsWith("[")) {
//         return new Set(JSON.parse(rawSeats));
//       }

//       return new Set();
//     } catch (e) {
//       console.error("Failed to parse availableSeats:", e);
//       return new Set();
//     }
//   }, [show.availableSeats]);

//   // -------------------------------
//   // OCCUPIED SEATS
//   // -------------------------------
//   const occupiedSeats = useMemo(
//     () => allSeats.filter((seat) => !availableSeatsSet.has(seat)),
//     [allSeats, availableSeatsSet]
//   );

//   // -------------------------------
//   // SEAT CLICK HANDLER
//   // -------------------------------
//   const handleSeatClick = (seat) => {
//     if (occupiedSeats.includes(seat) || isBooking) return;

//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//     setError(null); // Clear error on seat selection
//   };

//   // -------------------------------
//   // BOOKING HANDLER - CORRECTED
//   // -------------------------------
//   const handleBooking = async () => {
//     if (selectedSeats.length === 0) {
//       setError("Please select at least one seat.");
//       return;
//     }

//     // Validate seats are still available
//     const unavailableSeats = selectedSeats.filter((seat) =>
//       occupiedSeats.includes(seat)
//     );
//     if (unavailableSeats.length > 0) {
//       setError(`Seats ${unavailableSeats.join(", ")} are no longer available.`);
//       return;
//     }

//     setIsBooking(true);
//     setError(null);

//     try {
//       const bookingData = {
//         showId: currentShowId,
//         seats: selectedSeats,
//         userId: userId, // TODO: Replace with actual user ID from auth context
//         // totalPrice: selectedSeats.length * parseFloat(show.price || 0),
//       };

//       // console.log("Sending booking data:", bookingData);

//       const response = await axiosInstance.post("/bookings", bookingData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 10000,
//       });

//       // console.log("Booking successful:", response.data);

//       if (onBookingSuccess) {
//         onBookingSuccess(response.data);
//       }

//       setSelectedSeats([]);
//       navigate(
//         `/confirmation/${
//           response.data.bookingId || response.data.id || currentShowId
//         }`
//       );
//     } catch (error) {
//       console.error("Booking failed:", error);

//       if (error.response?.status === 409) {
//         // Conflict - seats might be taken
//         setError(
//           "One or more selected seats are no longer available. Please try again."
//         );
//       } else if (
//         error.response?.status >= 400 &&
//         error.response?.status < 500
//       ) {
//         setError(error.response.data?.message || "Invalid booking data");
//       } else if (error.response?.status >= 500) {
//         setError("Server error. Please try again later.");
//       } else if (error.code === "ERR_NETWORK" || error.request) {
//         setError("Network error. Please check your connection and try again.");
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   // -------------------------------
//   // SEAT CLASS
//   // -------------------------------
//   const getSeatClass = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       return "bg-blue-600 text-white shadow-lg";
//     }
//     if (occupiedSeats.includes(seat)) {
//       return "bg-red-400 text-white cursor-not-allowed opacity-50";
//     }
//     return "bg-green-400 hover:bg-green-500 text-gray-800";
//   };

//   // -------------------------------
//   // RENDER
//   // -------------------------------
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">
//         Select Seats for Show ID: {show.id} - {show.title || "Show"}
//       </h2>

//       {/* Error Display */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//           <button
//             onClick={() => setError(null)}
//             className="ml-2 text-red-700 hover:text-red-900"
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <div className="bg-white p-4 rounded shadow">
//         <div className="text-center mb-8 p-3 bg-gray-900 text-white rounded font-mono tracking-widest">
//           SCREEN
//         </div>

//         <div
//           className="gap-2 mb-4 mx-auto"
//           style={{
//             display: "grid",
//             gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//             maxWidth: `${cols * 60}px`,
//             justifyContent: "center",
//           }}
//         >
//           {allSeats.map((seat) => (
//             <button
//               key={seat}
//               onClick={() => handleSeatClick(seat)}
//               disabled={occupiedSeats.includes(seat) || isBooking}
//               className={`p-2 border rounded font-medium transition-colors duration-150 text-xs sm:text-sm disabled:cursor-not-allowed ${getSeatClass(
//                 seat
//               )}`}
//               title={
//                 occupiedSeats.includes(seat)
//                   ? "Occupied"
//                   : selectedSeats.includes(seat)
//                   ? "Selected"
//                   : "Available"
//               }
//             >
//               {seat}
//             </button>
//           ))}
//         </div>

//         <div className="flex justify-center gap-6 mt-6 text-sm">
//           <div className="flex items-center gap-1">
//             <span className="w-4 h-4 rounded bg-green-400 border"></span>
//             Available
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="w-4 h-4 rounded bg-blue-600 border"></span>
//             Selected
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="w-4 h-4 rounded bg-red-400 opacity-50 border"></span>
//             Occupied
//           </div>
//         </div>

//         <div className="mt-6 pt-4 border-t">
//           <p className="text-lg font-semibold mb-2">
//             Selected Seats:{" "}
//             <span className="text-blue-600">
//               {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
//             </span>
//           </p>
//           <p className="text-lg font-semibold mb-4">
//             Total Price:{" "}
//             <span className="text-green-700">
//               Rs.{" "}
//               {(selectedSeats.length * parseFloat(show.price || 0)).toFixed(2)}
//             </span>
//           </p>
//           <button
//             onClick={handleBooking}
//             disabled={selectedSeats.length === 0 || isBooking}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
//           >
//             {isBooking
//               ? "Processing..."
//               : `Confirm Booking for ${selectedSeats.length} Seat${
//                   selectedSeats.length !== 1 ? "s" : ""
//                 }`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// SeatSelection.propTypes = {
//   shows: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       theater: PropTypes.shape({
//         rows: PropTypes.number.isRequired,
//         cols: PropTypes.number.isRequired,
//       }).isRequired,
//       availableSeats: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.string),
//         PropTypes.string,
//       ]),
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     })
//   ).isRequired,
//   axiosInstance: PropTypes.shape({
//     post: PropTypes.func.isRequired,
//   }).isRequired,
//   onBookingSuccess: PropTypes.func.isRequired,
// };

// SeatSelection.defaultProps = {
//   shows: [],
// };

// export default SeatSelection;

import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SeatSelection({ shows, axiosInstance, onBookingSuccess }) {
  const { showId } = useParams();
  const navigate = useNavigate();

  const currentShowId = parseInt(showId);
  const show = shows.find((s) => s.id === currentShowId);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState(null);

  if (!show || !show.theater) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>Show "{showId}" not found or missing theater data.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { rows, cols } = show.theater;

  const allSeats = useMemo(() => {
    const seats = [];
    for (let r = 0; r < rows; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      for (let c = 1; c <= cols; c++) seats.push(`${rowLabel}${c}`);
    }
    return seats;
  }, [rows, cols]);

  const availableSeatsSet = useMemo(() => {
    try {
      const rawSeats = show.availableSeats;
      if (!rawSeats) return new Set();
      if (Array.isArray(rawSeats)) return new Set(rawSeats);
      if (typeof rawSeats === "string" && rawSeats.trim().startsWith("[")) {
        return new Set(JSON.parse(rawSeats));
      }
      return new Set();
    } catch {
      return new Set();
    }
  }, [show.availableSeats]);

  const occupiedSeats = useMemo(
    () => allSeats.filter((seat) => !availableSeatsSet.has(seat)),
    [allSeats, availableSeatsSet]
  );

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat) || isBooking) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
    setError(null);
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat.");
      return;
    }

    setIsBooking(true);
    setError(null);

    try {
      const bookingData = {
        showId: currentShowId,
        seats: selectedSeats,
        userId: userId,
      };

      const response = await axiosInstance.post("/bookings", bookingData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      if (onBookingSuccess) onBookingSuccess(response.data);

      setSelectedSeats([]);
      navigate(
        `/confirmation/${
          response.data.bookingId || response.data.id || currentShowId
        }`
      );
    } catch (error) {
      if (error.response?.status === 409)
        setError("Some selected seats are no longer available. Try again.");
      else if (error.response)
        setError(error.response.data?.message || "Booking failed.");
      else setError("Network error. Please check your connection.");
    } finally {
      setIsBooking(false);
    }
  };

  const getSeatImage = (seat) => {
    if (selectedSeats.includes(seat)) return "/images/seat-blue.png";
    if (occupiedSeats.includes(seat)) return "/images/seat-red.png";
    return "/images/seat-green.png";
  };

  return (
   <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-900 p-6">
  <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          {show.title || "Now Showing"}
        </h2>

        {error && (
          <div className="mb-6 bg-red-700/30 border border-red-500 text-red-300 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="relative mb-10">
          <div className="bg-gradient-to-r from-sky-400 via-blue-600 to-cyan-500 text-center py-3 rounded-lg shadow-lg text-lg font-semibold">
            SCREEN
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-3/4 h-1 bg-cyan-400 blur-xl opacity-50" />
        </div>

        <div
          className="grid gap-3 justify-center mx-auto"
          style={{ gridTemplateColumns: `repeat(${cols}, 2.8rem)` }}
        >
          {allSeats.map((seat) => (
            <img
              key={seat}
              src={getSeatImage(seat)}
              alt={seat}
              onClick={() => handleSeatClick(seat)}
              className={`w-9 h-9 sm:w-11 sm:h-11 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                occupiedSeats.includes(seat)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title={seat}
            />
          ))}
        </div>

        <div className="flex justify-center gap-5 mt-8">
          <div className="flex items-center gap-2">
            <img
              src="/images/seat-green.png"
              alt="available"
              className="w-5 h-5"
            />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/seat-blue.png"
              alt="selected"
              className="w-5 h-5"
            />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/seat-red.png"
              alt="occupied"
              className="w-5 h-5 opacity-60"
            />
            <span>Occupied</span>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center">
          <p className="text-lg mb-3">
            Selected Seats:{" "}
            <span className="text-sky-400 font-bold">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </span>
          </p>
          <p className="text-lg mb-6">
            Total:{" "}
            <span className="text-green-400 font-bold">
              Rs.{" "}
              {(selectedSeats.length * parseFloat(show.price || 0)).toFixed(2)}
            </span>
          </p>
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || isBooking}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/30 disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isBooking ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

SeatSelection.propTypes = {
  shows: PropTypes.array.isRequired,
  axiosInstance: PropTypes.object.isRequired,
  onBookingSuccess: PropTypes.func.isRequired,
};

export default SeatSelection;
