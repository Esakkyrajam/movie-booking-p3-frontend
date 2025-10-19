function MovieList({ movies }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p>
              {movie.genre} | {movie.duration} | {movie.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
