// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// function Navbar({ user, setUser }) {
//   const navigate = useNavigate();

//   // Helper function to handle robust logout
//   const handleLogout = () => {
//     // 1. Clear the user state in the parent component
//     setUser(null);
//     // 2. Clear user data from local storage (CRITICAL for security/session)
//     localStorage.removeItem("user");
//     // 3. Redirect to the homepage or login page
//     navigate("/login");
//   };

//   // Determine if the user has admin privileges
//   // CRITICAL: Ensure the user object exists AND has the isAdmin property set to true
//   // const uuu = localStorage.getItem("user");
//   // console.log("Navbar user data from localStorage:", uuu);
//   const isAdmin = user && user.admin === true;
//   console.log("Navbar isAdmin check:", isAdmin);

//   return (
//     <nav className="bg-blue-600 p-4 text-white">
//       <div className="container mx-auto flex justify-between">
//         <Link to="/" className="text-2xl font-bold">
//           Movie Booking
//         </Link>
//         <div>
//           {user ? (
//             <>
//               {/* Conditional link for Admin Panel using the calculated isAdmin */}
//               {isAdmin && (
//                 <Link to="/admin" className="mr-4">
//                   Admin Panel
//                 </Link>
//               )}

//               <Link to="/profile" className="mr-4">
//                 Profile
//               </Link>
//               <Link to="/booking-history" className="mr-4">
//                 Booking History
//               </Link>

//               <button onClick={handleLogout} className="mr-4">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="mr-4">
//                 Login
//               </Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAdmin = user && user.admin === true;

  return (
    <nav className="bg-white shadow-md border-b border-gray-300 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-gray-900 select-none"
        >
          Movie Booking
        </Link>

        <div className="flex items-center space-x-6 text-lg font-medium text-gray-800">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-indigo-600 hover:underline transition"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/profile"
                className="hover:text-indigo-600 hover:underline transition"
              >
                Profile
              </Link>
              <Link
                to="/booking-history"
                className="hover:text-indigo-600 hover:underline transition"
              >
                Booking History
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-600 hover:underline transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-indigo-600 hover:underline transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
