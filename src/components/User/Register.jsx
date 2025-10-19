// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axiosInstance from "../../api"; // import the axios instance
// import axios from "axios"; // <-- ADD THIS LINE
// function Register({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/auth/register", {
//         email,
//         password,
//       });
//       alert(response.data); // "User registered successfully"
//       navigate("/login"); // redirect to login page
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <div className="bg-white p-4 rounded shadow">
//         {error && <p className="text-red-600">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <button
//           onClick={handleRegister}
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });
      alert(response.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg border border-gray-300">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6 tracking-wider">
          Create an Account
        </h2>

        <p className="text-center mb-8 text-indigo-600 font-light italic select-none">
          Join us and book your favorite movie seats!
        </p>

        <div className="bg-gray-50 rounded-xl p-6 space-y-6 shadow-inner">
          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded-md text-center font-semibold">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoComplete="new-password"
          />
          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold tracking-wide shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
