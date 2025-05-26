import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:5000",
  withCredentials: true,
});
