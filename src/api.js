import axios from "axios";

const API_URL = "http://localhost:8080/"; // your Spring Boot backend

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.id;
  const token = user?.token;
  // console.log(
  //   "Token from storage:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
  //   user
  // );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
