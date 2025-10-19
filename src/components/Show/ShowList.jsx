// import { useParams, Link } from "react-router-dom";

// function ShowList({ shows, theaters, movies }) {
//   const { movieId } = useParams();
//   const movie = movies.find((m) => m.id === parseInt(movieId));

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Shows for {movie?.title}</h2>
//       <div className="grid gap-4">
//         {shows
//           .filter((show) => show.movieId === parseInt(movieId))
//           .map((show) => (
//             <Link
//               key={show.id}
//               to={`/seat-selection/${show.id}`}
//               className="bg-white p-4 rounded shadow"
//             >
//               <h3>{theaters.find((t) => t.id === show.theaterId)?.name}</h3>
//               <p>
//                 {show.date} {show.time}
//               </p>
//               <p>Available Seats: {show.availableSeats.length}</p>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// }

// // export default ShowList;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// function ShowList({ shows, theaters, movies, axiosInstance }) {
//   const { movieId } = useParams();
//   const [movieShows, setMovieShows] = useState([]);
//   const movie = movies.find((m) => m.id === parseInt(movieId));

//   useEffect(() => {
//     axiosInstance
//       .get(`/shows/movie/${movieId}`)
//       .then((response) => {
//         // console.log("Shows for movie:", response.data);
//         setMovieShows(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching shows for movie:", error);
//       });
//   }, [movieId, axiosInstance]);

//   if (!movie) return <div>Movie not found</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Shows for {movie.title}</h2>
//       <div className="grid grid-cols-1 gap-4">
//         {movieShows.map((show) => {
//           // 🔑 NEW: Safe parsing and count logic
//           let seatCount = 0;

//           // Use a try-catch block to handle potential JSON parsing errors
//           try {
//             const rawSeats = show.availableSeats;

//             if (rawSeats) {
//               // Check if the data is a JSON string (expected from backend)
//               // If it's a string, parse it. If it's something else (like an empty array from old data), use it directly.
//               const seatsArray =
//                 typeof rawSeats === "string"
//                   ? JSON.parse(rawSeats || "[]")
//                   : rawSeats;

//               // Get the length only if the result is an actual array
//               if (Array.isArray(seatsArray)) {
//                 seatCount = seatsArray.length;
//               }
//             }
//           } catch (e) {
//             // Log the error for debugging but prevent the component from crashing
//             console.error("Failed to parse availableSeats in ShowList:", e);
//             // seatCount remains 0 on error
//           }

//           return (
//             <div key={show.id} className="border p-4">
//               <p>Theater: {show.theater?.name || "Unknown"}</p>
//               <p>Date: {show.date}</p>
//               <p>Time: {show.time}</p>

//               {/* 🔑 UPDATED LINE: Use the safely calculated seatCount */}
//               <p>Available Seats: {seatCount}</p>

//               <Link
//                 to={`/seat-selection/${show.id}`}
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Select Seats
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ShowList;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function formatIndianDateTime(dateStr, timeStr) {
  const dateTimeStr = `${dateStr}T${timeStr}`;
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-IN", options);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let dayPeriod = "";
  if (hours < 12 && ampm === "AM") dayPeriod = "Morning";
  else if (hours < 5 && ampm === "PM") dayPeriod = "Afternoon";
  else if (hours < 8 && ampm === "PM") dayPeriod = "Evening";
  else dayPeriod = "Night";

  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return `${formattedDate}, ${formattedTime} (${dayPeriod})`;
}

function ShowList({ shows, theaters, movies, axiosInstance }) {
  const { movieId } = useParams();
  const [movieShows, setMovieShows] = useState([]);
  const movie = movies.find((m) => m.id === parseInt(movieId));

  useEffect(() => {
    axiosInstance
      .get(`/shows/movie/${movieId}`)
      .then((response) => setMovieShows(response.data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, [movieId, axiosInstance]);

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 p-8">
        <p className="text-xl font-semibold">Movie not found</p>
      </div>
    );

  const now = new Date();
  const upcomingShows = movieShows.filter((show) => {
    const showDateTime = new Date(`${show.date}T${show.time}`);
    return showDateTime >= now;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 select-none">
        Shows for{" "}
        <span className="text-indigo-600 bg-indigo-100 px-3 py-1 rounded-lg select-text">
          {movie.title}
        </span>
      </h2>

      {upcomingShows.length === 0 ? (
        <p className="text-gray-500 font-semibold">
          No shows available for this movie.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map((show) => {
            let seatCount = 0;
            try {
              const rawSeats = show.availableSeats;
              const seatsArray =
                typeof rawSeats === "string"
                  ? JSON.parse(rawSeats || "[]")
                  : rawSeats;
              if (Array.isArray(seatsArray)) seatCount = seatsArray.length;
            } catch {
              seatCount = 0;
            }

            return (
              <div
                key={show.id}
                className="relative rounded-xl bg-white p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Theater:{" "}
                    <span className="font-normal">
                      {show.theater?.name || "Unknown"}
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    <strong>Date & Time: </strong>
                    {formatIndianDateTime(show.date, show.time)}
                  </p>
                  <p className="text-gray-700 font-semibold mt-3">
                    Available Seats:{" "}
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {seatCount}
                    </span>
                  </p>
                </div>

                <Link
                  to={`/seat-selection/${show.id}`}
                  className="absolute bottom-6 right-6 inline-block rounded bg-indigo-600 text-white px-5 py-2 font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Select Seats
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShowList;
