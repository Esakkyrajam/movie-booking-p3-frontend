// import { useState } from "react";
// import axiosInstance from "../../api";

// function AdminPanel({
//   movies,
//   setMovies,
//   theaters,
//   setTheaters,
//   shows,
//   setShows,
//   axiosInstance,
// }) {
//   const [movie, setMovie] = useState({
//     title: "",
//     genre: "",
//     duration: "",
//     rating: "",
//     poster: "",
//   });
//   const [theater, setTheater] = useState({
//     name: "",
//     location: "",
//     rows: "",
//     cols: "",
//   });
//   const [show, setShow] = useState({
//     movieId: "",
//     theaterId: "",
//     date: "",
//     time: "",
//     price: "",
//   });

//   const handleAddMovie = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/movies", movie);
//       setMovies([...movies, response.data]);
//       setMovie({ title: "", genre: "", duration: "", rating: "", poster: "" });
//     } catch (error) {
//       console.error("Error adding movie:", error);
//       alert("Failed to add movie. Ensure you are logged in as an admin.");
//     }
//   };

//   const handleAddTheater = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/theaters", {
//         ...theater,
//         seatLayout: {
//           rows: parseInt(theater.rows),
//           cols: parseInt(theater.cols),
//         },
//       });
//       setTheaters([...theaters, response.data]);
//       setTheater({ name: "", location: "", rows: "", cols: "" });
//     } catch (error) {
//       console.error("Error adding theater:", error);
//       alert("Failed to add theater. Ensure you are logged in as an admin.");
//     }
//   };

//   const handleAddShow = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/shows", {
//         movieId: parseInt(show.movieId),
//         theaterId: parseInt(show.theaterId),
//         date: show.date,
//         time: show.time,
//         price: parseFloat(show.price),
//       });
//       setShows([...shows, response.data]);
//       setShow({ movieId: "", theaterId: "", date: "", time: "", price: "" });
//     } catch (error) {
//       console.error(
//         "Error adding show:",
//         error.response?.data || error.message
//       );
//       alert("Failed to add show. Ensure you are logged in as an admin.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Admin Panel</h2>

//       {/* Add Movie Form */}
//       <div className="mb-8">
//         <h3 className="text-xl mb-2">Add Movie</h3>
//         <form onSubmit={handleAddMovie}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={movie.title}
//             onChange={(e) => setMovie({ ...movie, title: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Genre"
//             value={movie.genre}
//             onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Duration"
//             value={movie.duration}
//             onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Rating"
//             value={movie.rating}
//             onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Poster URL"
//             value={movie.poster}
//             onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Add Movie
//           </button>
//         </form>
//       </div>

//       {/* Add Theater Form */}
//       <div className="mb-8">
//         <h3 className="text-xl mb-2">Add Theater</h3>
//         <form onSubmit={handleAddTheater}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={theater.name}
//             onChange={(e) => setTheater({ ...theater, name: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={theater.location}
//             onChange={(e) =>
//               setTheater({ ...theater, location: e.target.value })
//             }
//             className="border p-2 mr-2"
//           />
//           <input
//             type="number"
//             placeholder="Rows"
//             value={theater.rows}
//             onChange={(e) => setTheater({ ...theater, rows: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="number"
//             placeholder="Columns"
//             value={theater.cols}
//             onChange={(e) => setTheater({ ...theater, cols: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Add Theater
//           </button>
//         </form>
//       </div>

//       {/* Add Show Form */}
//       <div>
//         <h3 className="text-xl mb-2">Add Show</h3>
//         <form onSubmit={handleAddShow}>
//           <select
//             value={show.movieId}
//             onChange={(e) => setShow({ ...show, movieId: e.target.value })}
//             className="border p-2 mr-2"
//           >
//             <option value="">Select Movie</option>
//             {movies.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.title}
//               </option>
//             ))}
//           </select>
//           <select
//             value={show.theaterId}
//             onChange={(e) => setShow({ ...show, theaterId: e.target.value })}
//             className="border p-2 mr-2"
//           >
//             <option value="">Select Theater</option>
//             {theaters.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="date"
//             value={show.date}
//             onChange={(e) => setShow({ ...show, date: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="time"
//             value={show.time}
//             onChange={(e) => setShow({ ...show, time: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="number"
//             step="0.01"
//             placeholder="Price"
//             value={show.price}
//             onChange={(e) => setShow({ ...show, price: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Add Show
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;

import { useState, useRef } from "react";

function AdminPanel({
  movies,
  setMovies,
  theaters,
  setTheaters,
  shows,
  setShows,
  axiosInstance,
}) {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    duration: "",
    rating: "",
    poster: "",
  });

  const [theater, setTheater] = useState({
    name: "",
    location: "",
    rows: "",
    cols: "",
  });

  const [show, setShow] = useState({
    movieId: "",
    theaterId: "",
    date: "",
    time: "",
    price: "",
  });

  // Refs for moving focus on enter key
  const movieRefs = useRef([]);
  const theaterRefs = useRef([]);
  const showRefs = useRef([]);

  // Helper to handle "Enter" key to move focus to next field
  const handleKeyDown = (e, refArray, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = refArray.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/movies", movie);
      setMovies([...movies, response.data]);
      setMovie({ title: "", genre: "", duration: "", rating: "", poster: "" });
      movieRefs.current[0].focus();
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Ensure you are logged in as an admin.");
    }
  };

  const handleAddTheater = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/theaters", {
        ...theater,
        seatLayout: {
          rows: parseInt(theater.rows),
          cols: parseInt(theater.cols),
        },
      });
      setTheaters([...theaters, response.data]);
      setTheater({ name: "", location: "", rows: "", cols: "" });
      theaterRefs.current[0].focus();
    } catch (error) {
      console.error("Error adding theater:", error);
      alert("Failed to add theater. Ensure you are logged in as an admin.");
    }
  };

  const handleAddShow = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/shows", {
        movieId: parseInt(show.movieId),
        theaterId: parseInt(show.theaterId),
        date: show.date,
        time: show.time,
        price: parseFloat(show.price),
      });
      setShows([...shows, response.data]);
      setShow({ movieId: "", theaterId: "", date: "", time: "", price: "" });
      showRefs.current[0].focus();
    } catch (error) {
      console.error(
        "Error adding show:",
        error.response?.data || error.message
      );
      alert("Failed to add show. Ensure you are logged in as an admin.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10 select-text">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
        Admin Panel
      </h2>

      {/* Add Movie Card */}
      <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Add Movie</h3>
        <form
          onSubmit={handleAddMovie}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            {
              placeholder: "Title",
              value: movie.title,
              setter: (v) => setMovie({ ...movie, title: v }),
            },
            {
              placeholder: "Genre",
              value: movie.genre,
              setter: (v) => setMovie({ ...movie, genre: v }),
            },
            {
              placeholder: "Duration",
              value: movie.duration,
              setter: (v) => setMovie({ ...movie, duration: v }),
            },
            {
              placeholder: "Rating",
              value: movie.rating,
              setter: (v) => setMovie({ ...movie, rating: v }),
            },
            {
              placeholder: "Poster URL",
              value: movie.poster,
              setter: (v) => setMovie({ ...movie, poster: v }),
            },
          ].map(({ placeholder, value, setter }, idx) => (
            <input
              key={placeholder}
              type="text"
              ref={(el) => (movieRefs.current[idx] = el)}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, movieRefs, idx)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            type="submit"
            className="col-span-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Movie
          </button>
        </form>
      </section>

      {/* Add Theater Card */}
      <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Add Theater</h3>
        <form
          onSubmit={handleAddTheater}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            {
              placeholder: "Name",
              value: theater.name,
              setter: (v) => setTheater({ ...theater, name: v }),
              type: "text",
            },
            {
              placeholder: "Location",
              value: theater.location,
              setter: (v) => setTheater({ ...theater, location: v }),
              type: "text",
            },
            {
              placeholder: "Rows",
              value: theater.rows,
              setter: (v) => setTheater({ ...theater, rows: v }),
              type: "number",
            },
            {
              placeholder: "Columns",
              value: theater.cols,
              setter: (v) => setTheater({ ...theater, cols: v }),
              type: "number",
            },
          ].map(({ placeholder, value, setter, type }, idx) => (
            <input
              key={placeholder}
              type={type}
              ref={(el) => (theaterRefs.current[idx] = el)}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, theaterRefs, idx)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            type="submit"
            className="col-span-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Theater
          </button>
        </form>
      </section>

      {/* Add Show Card */}
      <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Add Show</h3>
        <form
          onSubmit={handleAddShow}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <select
            value={show.movieId}
            onChange={(e) => setShow({ ...show, movieId: e.target.value })}
            ref={(el) => (showRefs.current[0] = el)}
            onKeyDown={(e) => handleKeyDown(e, showRefs, 0)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Movie</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
          <select
            value={show.theaterId}
            onChange={(e) => setShow({ ...show, theaterId: e.target.value })}
            ref={(el) => (showRefs.current[1] = el)}
            onKeyDown={(e) => handleKeyDown(e, showRefs, 1)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Theater</option>
            {theaters.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={show.date}
            onChange={(e) => setShow({ ...show, date: e.target.value })}
            ref={(el) => (showRefs.current[2] = el)}
            onKeyDown={(e) => handleKeyDown(e, showRefs, 2)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="time"
            value={show.time}
            onChange={(e) => setShow({ ...show, time: e.target.value })}
            ref={(el) => (showRefs.current[3] = el)}
            onKeyDown={(e) => handleKeyDown(e, showRefs, 3)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={show.price}
            onChange={(e) => setShow({ ...show, price: e.target.value })}
            ref={(el) => (showRefs.current[4] = el)}
            onKeyDown={(e) => handleKeyDown(e, showRefs, 4)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="col-span-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Show
          </button>
        </form>
      </section>
    </div>
  );
}

export default AdminPanel;
