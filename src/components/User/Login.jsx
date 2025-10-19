// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../api";

// function Login({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axiosInstance.post("/auth/login", {
//         email,
//         password,
//       });
//       const { token, id, email2, admin } = response.data;

//       // Save user in state (and optionally in localStorage)
//       setUser({ id, email: email2, admin, token: token });
//       localStorage.setItem("user", JSON.stringify(response.data));

//       // const uuu = localStorage.getItem("user");

//       // console.log("Login successful, user data saved.>>>>>>>>", uuu);

//       navigate("/"); // redirect to homepage
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
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
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token, id, email2, admin } = response.data;

      setUser({ id, email: email2, admin, token: token });
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/"); // Redirect after login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-300">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6 tracking-wide">
          Cinema Booking
        </h2>

        <p className="text-center text-gray-600 mb-8 font-light italic select-none">
          Log in to book your perfect seats!
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
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoComplete="current-password"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold tracking-wide shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
