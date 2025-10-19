// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { useState } from "react";
// // import Navbar from "./components/Navbar";
// // import Home from "./components/Home";
// // import Login from "./components/User/Login";
// // import Register from "./components/User/Register";
// // import Profile from "./components/User/Profile";
// // import BookingHistory from "./components/User/BookingHistory";
// // import MovieList from "./components/Movie/MovieList";
// // import TheaterList from "./components/Theater/TheaterList";
// // import ShowList from "./components/Show/ShowList";
// // import SeatSelection from "./components/Booking/SeatSelection";
// // import Payment from "./components/Payment/Payment";
// // import AdminPanel from "./components/Admin/AdminPanel";

// // // Mock data
// // const mockMovies = [
// //   {
// //     id: 1,
// //     title: "Inception",
// //     genre: "Sci-Fi",
// //     duration: "2h 28m",
// //     rating: "PG-13",
// //     poster:
// //       "https://m.media-amazon.com/images/S/pv-target-images/cc72ff2193c0f7a85322aee988d6fe1ae2cd9f8800b6ff6e8462790fe2aacaf3.jpg",
// //   },
// //   {
// //     id: 2,
// //     title: "The Dark Knight",
// //     genre: "Action",
// //     duration: "2h 32m",
// //     rating: "PG-13",
// //     poster:
// //       "data:image/jpeg;base64,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",
// //   },
// // ];

// // const mockTheaters = [
// //   {
// //     id: 1,
// //     name: "City Cinema",
// //     location: "Downtown",
// //     seatLayout: { rows: 5, cols: 10 },
// //   },
// //   {
// //     id: 2,
// //     name: "Starplex",
// //     location: "Uptown",
// //     seatLayout: { rows: 6, cols: 8 },
// //   },
// // ];

// // const mockShows = [
// //   {
// //     id: 1,
// //     movieId: 1,
// //     theaterId: 1,
// //     date: "2025-10-12",
// //     time: "18:00",
// //     availableSeats: ["A1", "A2", "B1", "B2"],
// //   },
// //   {
// //     id: 2,
// //     movieId: 2,
// //     theaterId: 2,
// //     date: "2025-10-12",
// //     time: "20:00",
// //     availableSeats: ["C1", "C2", "D1", "D2"],
// //   },
// // ];

// // const mockBookings = [
// //   {
// //     id: 1,
// //     userId: 1,
// //     showId: 1,
// //     seats: ["A1", "A2"],
// //     status: "confirmed",
// //     amount: 20,
// //   },
// // ];

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [movies, setMovies] = useState(mockMovies);
// //   const [theaters, setTheaters] = useState(mockTheaters);
// //   const [shows, setShows] = useState(mockShows);
// //   const [bookings, setBookings] = useState(mockBookings);

// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gray-100">
// //         <Navbar user={user} setUser={setUser} />
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={<Home movies={movies} theaters={theaters} shows={shows} />}
// //           />
// //           <Route path="/login" element={<Login setUser={setUser} />} />
// //           <Route path="/register" element={<Register setUser={setUser} />} />
// //           <Route path="/profile" element={<Profile user={user} />} />
// //           <Route
// //             path="/booking-history"
// //             element={
// //               <BookingHistory
// //                 bookings={bookings}
// //                 movies={movies}
// //                 shows={shows}
// //                 theaters={theaters}
// //               />
// //             }
// //           />
// //           <Route path="/movies" element={<MovieList movies={movies} />} />
// //           <Route
// //             path="/theaters"
// //             element={<TheaterList theaters={theaters} />}
// //           />
// //           <Route
// //             path="/shows/:movieId"
// //             element={
// //               <ShowList shows={shows} theaters={theaters} movies={movies} />
// //             }
// //           />
// //           <Route
// //             path="/seat-selection/:showId"
// //             element={
// //               <SeatSelection
// //                 shows={shows}
// //                 setShows={setShows}
// //                 bookings={bookings}
// //                 setBookings={setBookings}
// //               />
// //             }
// //           />
// //           <Route
// //             path="/payment/:bookingId"
// //             element={<Payment bookings={bookings} setBookings={setBookings} />}
// //           />
// //           <Route
// //             path="/admin"
// //             element={
// //               <AdminPanel
// //                 movies={movies}
// //                 setMovies={setMovies}
// //                 theaters={theaters}
// //                 setTheaters={setTheaters}
// //                 shows={shows}
// //                 setShows={setShows}
// //               />
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Login from "./components/User/Login";
// import Register from "./components/User/Register";
// import Profile from "./components/User/Profile";
// import BookingHistory from "./components/User/BookingHistory";
// import MovieList from "./components/Movie/MovieList";
// import TheaterList from "./components/Theater/TheaterList";
// import ShowList from "./components/Show/ShowList";
// import SeatSelection from "./components/Booking/SeatSelection";
// import Payment from "./components/Payment/Payment";
// import AdminPanel from "./components/Admin/AdminPanel";

// function App() {
//   const [user, setUser] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [theaters, setTheaters] = useState([]);
//   const [shows, setShows] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState(null);

//   const API_URL = "http://localhost:8080";

//   // 🔑 Use useMemo to create a single Axios instance with dynamic token injection.
//   const axiosInstance = useMemo(() => {
//     const instance = axios.create({
//       baseURL: API_URL,
//       headers: {
//         "Content-Type": "application/json",
//         // NOTE: We REMOVE the hardcoded Authorization header here.
//       },
//     });

//     // 🔑 REQUEST INTERCEPTOR: Inject the latest token before every request.
//     instance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//           // Set Authorization header for protected endpoints
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // RESPONSE INTERCEPTOR: Handle global errors like 401/403 (unauthorized/forbidden).
//     instance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         const status = error.response?.status;
//         if (status === 401 || status === 403) {
//           // Unauthorized or Forbidden (often due to invalid token)
//           setError("Session expired or unauthorized. Please log in again.");
//           localStorage.removeItem("token");
//           setUser(null);
//         } else if (status && status >= 500) {
//           setError("Server error. Please try again later.");
//         } else if (!status) {
//           // Network errors (e.g., server is down)
//           setError("Network error. Could not connect to the server.");
//         } else {
//           setError(
//             error.message || "An unknown error occurred. Status: " + status
//           );
//         }
//         return Promise.reject(error);
//       }
//     );

//     return instance;
//   }, [API_URL]);

//   // ❌ Removed the old useEffect that tried to update defaults—the interceptor handles it now.

//   // ✅ Fetch all public and user-specific data
//   useEffect(() => {
//     const fetchData = async () => {
//       // Reset error state before fetching
//       setError(null);
//       try {
//         // Fetch public data in parallel
//         const [movieRes, theaterRes, showRes] = await Promise.all([
//           axiosInstance.get("/movies"),
//           axiosInstance.get("/theaters"),
//           axiosInstance.get("/shows"),
//         ]);

//         setMovies(movieRes.data);
//         setTheaters(theaterRes.data);
//         setShows(showRes.data);

//         // Fetch protected data only if a user is logged in
//         if (localStorage.getItem("token")) {
//           // We don't need to check the 'user' state directly, as the token existence
//           // is the source of truth for attempting a protected request.
//           const bookingRes = await axiosInstance.get("/bookings/history");
//           setBookings(bookingRes.data);
//         } else {
//           setBookings([]); // Clear bookings if logged out
//         }
//       } catch (err) {
//         console.error("❌ Error fetching initial data:", err.message);
//         // The interceptor already handles setting the error state for 401/403/500
//       }
//     };

//     fetchData();
//   }, [user, axiosInstance]); // Re-run when user state changes (e.g., after login/logout)

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         {error && (
//           <div className="bg-red-500 text-white p-2 text-center fixed w-full z-50">
//             {error}
//           </div>
//         )}

//         <Navbar user={user} setUser={setUser} />

//         <Routes>
//           <Route
//             path="/"
//             element={<Home movies={movies} theaters={theaters} shows={shows} />}
//           />
//           <Route
//             path="/login"
//             element={<Login setUser={setUser} axiosInstance={axiosInstance} />}
//           />
//           <Route
//             path="/register"
//             element={
//               <Register setUser={setUser} axiosInstance={axiosInstance} />
//             }
//           />
//           <Route path="/profile" element={<Profile user={user} />} />
//           <Route
//             path="/booking-history"
//             element={
//               <BookingHistory
//                 bookings={bookings}
//                 movies={movies}
//                 shows={shows}
//                 theaters={theaters}
//               />
//             }
//           />
//           <Route path="/movies" element={<MovieList movies={movies} />} />
//           <Route
//             path="/theaters"
//             element={<TheaterList theaters={theaters} />}
//           />
//           <Route
//             path="/shows/:movieId"
//             element={
//               <ShowList
//                 shows={shows}
//                 theaters={theaters}
//                 movies={movies}
//                 axiosInstance={axiosInstance}
//               />
//             }
//           />
//           <Route
//             path="/seat-selection/:showId"
//             element={
//               <SeatSelection
//                 shows={shows}
//                 setShows={setShows}
//                 bookings={bookings}
//                 setBookings={setBookings}
//                 axiosInstance={axiosInstance}
//               />
//             }
//           />
//           <Route
//             path="/payment/:bookingId"
//             element={
//               <Payment
//                 bookings={bookings}
//                 setBookings={setBookings}
//                 axiosInstance={axiosInstance}
//               />
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <AdminPanel
//                 movies={movies}
//                 setMovies={setMovies}
//                 theaters={theaters}
//                 setTheaters={setTheaters}
//                 shows={shows}
//                 setShows={setShows}
//                 axiosInstance={axiosInstance}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import BookingHistory from "./components/User/BookingHistory";
import MovieList from "./components/Movie/MovieList";
import TheaterList from "./components/Theater/TheaterList";
import ShowList from "./components/Show/ShowList";
import SeatSelection from "./components/Booking/SeatSelection";
import Payment from "./components/Payment/Payment";
import AdminPanel from "./components/Admin/AdminPanel";
// import axiosInstance from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  // console.log("App rendered. Current user:", user);
  const API_URL = "http://localhost:8080/"; // 🔑 ADDED '/api' to be consistent with backend

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          // Log out user on unauthorized access
          setError("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("token");
          setUser(null);
        } else if (status && status >= 500) {
          setError("Server error. Please try again later.");
        } else if (!status) {
          setError("Network error. Could not connect to the server.");
        } else {
          setError(error.response?.data?.message || error.message);
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }, []);

  // 🔑 CONSOLIDATED FETCH FUNCTIONS (including a reusable fetchShows)
  const fetchShows = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/shows");
      // console.log("Fetched shows:", res.data);
      setShows(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch shows:", err);
      return [];
    }
  }, [axiosInstance]);

  const fetchAllData = useCallback(async () => {
    setError(null);
    try {
      // Fetch public data (Movies and Theaters)
      const [movieRes, theaterRes] = await Promise.all([
        axiosInstance.get("/movies"),
        axiosInstance.get("/theaters"),
      ]);

      setMovies(movieRes.data);
      setTheaters(theaterRes.data);
      await fetchShows(); // Fetch shows using the dedicated function

      // Fetch protected data only if a token exists
      if (localStorage.getItem("token")) {
        const bookingRes = await axiosInstance.get("/bookings/history");
        setBookings(bookingRes.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("❌ Error fetching initial data:", err.message);
      // Error interceptor handles setting global error state
    }
  }, [axiosInstance, fetchShows]); // Depend on axiosInstance and fetchShows

  useEffect(() => {
    fetchAllData();
  }, [user, fetchAllData]); // Re-run when user state changes (login/logout) or fetchAllData changes

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {error && (
          // Added top padding to prevent content overlap with fixed navbar
          <div className="bg-red-500 text-white p-2 text-center fixed w-full top-0 z-50">
            {error}
          </div>
        )}

        <Navbar user={user} setUser={setUser} />

        {/* 🔑 Padding to ensure content is visible below the fixed error/navbar */}
        <div className={error ? "pt-16" : "pt-12"}>
          <Routes>
            <Route
              path="/"
              element={
                <Home movies={movies} theaters={theaters} shows={shows} />
              }
            />
            <Route
              path="/login"
              element={
                <Login setUser={setUser} axiosInstance={axiosInstance} />
              }
            />
            <Route
              path="/register"
              element={
                <Register setUser={setUser} axiosInstance={axiosInstance} />
              }
            />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="/booking-history"
              element={
                <BookingHistory
                  bookings={bookings}
                  movies={movies}
                  shows={shows}
                  theaters={theaters}
                />
              }
            />
            <Route path="/movies" element={<MovieList movies={movies} />} />
            <Route
              path="/theaters"
              element={<TheaterList theaters={theaters} />}
            />

            {/* 🔑 Passed axiosInstance to ShowList for fetching data by movie ID */}
            <Route
              path="/shows/:movieId"
              element={
                <ShowList
                  shows={shows}
                  theaters={theaters}
                  movies={movies}
                  axiosInstance={axiosInstance}
                />
              }
            />

            {/* 🔑 CRITICAL FIX: Use the backend-integrated approach */}
            <Route
              path="/seat-selection/:showId"
              element={
                <SeatSelection
                  shows={shows}
                  axiosInstance={axiosInstance}
                  // Pass the show fetch function as the success callback
                  onBookingSuccess={fetchShows}
                  // Removed: setShows, bookings, setBookings props (they are now managed by the server API)
                />
              }
            />
            <Route
              path="/payment/:bookingId"
              element={
                <Payment
                  bookings={bookings}
                  setBookings={setBookings}
                  axiosInstance={axiosInstance}
                />
              }
            />
            {/* 💳 Payment page */}
            <Route
              path="/confirmation/:bookingId"
              element={
                <Payment bookings={bookings} setBookings={setBookings} />
              }
            />
            <Route
              path="/admin"
              element={
                <AdminPanel
                  movies={movies}
                  setMovies={setMovies}
                  theaters={theaters}
                  setTheaters={setTheaters}
                  shows={shows}
                  setShows={setShows}
                  axiosInstance={axiosInstance}
                  isAdmin={true}
                  user={user}
                  setUser={setUser}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
