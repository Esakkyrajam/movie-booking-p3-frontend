import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 max-w-md mx-auto my-12 flex flex-col items-center justify-center rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Profile</h2>
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 w-full">
        <p className="text-lg">
          <span className="font-semibold">Email:</span>{" "}
          {user?.email || "Not logged in"}
        </p>
        <p className="text-lg mt-2">
          <span className="font-semibold">Role:</span>{" "}
          {user?.isAdmin ? "Admin" : "User"}
        </p>
      </div>

      <button
        onClick={() => navigate("/booking-history")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 font-semibold shadow-md transition"
      >
        View Booking History
      </button>
    </div>
  );
}

export default Profile;
