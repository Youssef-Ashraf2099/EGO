import axisios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1", // use relative path to your backend API prefix
  withCredentials: true,
});
export default axiosInstance;
