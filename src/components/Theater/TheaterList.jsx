function TheaterList({ theaters }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Theaters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {theaters.map((theater) => (
          <div key={theater.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{theater.name}</h3>
            <p>Location: {theater.location}</p>
            <p>Seats: {theater.seatLayout.rows * theater.seatLayout.cols}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheaterList;
