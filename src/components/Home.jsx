// import { Link } from "react-router-dom";

// function Home({ movies, theaters, shows }) {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Movie Booking</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <h2 className="text-2xl font-semibold mb-2">Movies</h2>
//           {movies.map((movie) => (
//             <Link
//               key={movie.id}
//               to={`/shows/${movie.id}`}
//               className="block p-2 bg-white rounded shadow mb-2"
//             >
//               <img
//                 src={movie.poster}
//                 alt={movie.title}
//                 className="w-32 h-48 object-cover inline-block mr-2"
//               />
//               <div className="inline-block">
//                 <h3>{movie.title}</h3>
//                 <p>
//                   {movie.genre} | {movie.duration} | {movie.rating}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <div>
//           <h2 className="text-2xl font-semibold mb-2">Theaters</h2>
//           {theaters.map((theater) => (
//             <div key={theater.id} className="p-2 bg-white rounded shadow mb-2">
//               <h3>{theater.name}</h3>
//               <p>{theater.location}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h2 className="text-2xl font-semibold mb-2">Upcoming Shows</h2>
//           {shows.map((show) => (
//             <Link
//               key={show.id}
//               to={`/seat-selection/${show.id}`}
//               className="block p-2 bg-white rounded shadow mb-2"
//             >
//               <h3>{movies.find((m) => m.id === show.movieId)?.title}</h3>
//               <p>
//                 {theaters.find((t) => t.id === show.theaterId)?.name} |{" "}
//                 {show.date} {show.time}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const cardVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

function Home({ movies, theaters, shows }) {
  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-20">
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight mb-14 select-none">
        Welcome to Movie Booking
      </h1>

      {/* Grid Container */}
      <div
        className="grid gap-10 md:gap-12 
                      grid-cols-1 
                      md:grid-cols-[2fr,1.2fr] lg:grid-cols-[3fr,1.5fr] max-w-7xl mx-auto"
      >
        {/* Left Main Featured - Movies Collection */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-gray-900 border-b-4 border-indigo-600 inline-block pb-2 tracking-wide select-none animate-gradient-x bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
            Movies Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={cardVariants}
                className="rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-400 cursor-pointer transform hover:scale-105 relative overflow-hidden border border-gray-200"
              >
                <Link to={`/shows/${movie.id}`} className="block w-full h-full">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-72 object-cover object-center rounded-t-xl transition-transform duration-500 hover:scale-110"
                  />
                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-gray-600 mb-3 flex flex-wrap gap-2">
                      <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium select-none">
                        {movie.genre}
                      </span>
                      <span className="inline-block text-sm font-semibold select-none">
                        {movie.duration} mins
                      </span>
                      <span className="inline-flex items-center gap-1 text-yellow-500 font-semibold select-none">
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.757 4.635 1.122 6.545z" />
                        </svg>
                        {movie.rating}
                      </span>
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right Sidebar with Theaters and Upcoming Shows */}
        <aside className="flex flex-col gap-10">
          {/* Theaters Section - compact */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 border-b-4 border-indigo-600 inline-block pb-2 tracking-wide select-none animate-gradient-x bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              Theaters
            </h2>
            <div className="flex flex-col gap-5 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {theaters.map((theater) => (
                <motion.div
                  key={theater.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: theater.id * 0.1 }}
                  className="p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-default"
                >
                  <h3 className="text-xl font-semibold text-gray-900 select-text">
                    {theater.name}
                  </h3>
                  <p className="text-gray-700 select-text">
                    {theater.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Upcoming Shows Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-gray-900 border-b-4 border-indigo-600 inline-block pb-2 tracking-wide select-none animate-gradient-x bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              Upcoming Shows
            </h2>
            <div className="max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200 space-y-4">
              {shows.map((show) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: show.id * 0.1 }}
                  className="block p-4 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <Link
                    to={`/seat-selection/${show.id}`}
                    className="flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {movies.find((m) => m.id === show.movieId)?.title}
                    </h3>
                    <p className="text-gray-700 select-text">
                      {theaters.find((t) => t.id === show.theaterId)?.name} |{" "}
                      {formatIndianDateTime(show.date, show.time)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Home;
