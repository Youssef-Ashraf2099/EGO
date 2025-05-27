import axios from "axios"; // TYPO - should be "axios"from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1", // relative path that works in both dev and production
  withCredentials: true,
});
export default axiosInstance;
