import axios from "axios";
import { getToken, clearAuth } from "../features/auth/utils/authStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the failed request was sent to the login endpoint
    const isLoginEndpoint = error.config?.url?.includes("/login");

    // Only force redirect if it's a 401 AND NOT a login attempt
    if (error.response?.status === 401 && !isLoginEndpoint) {
      clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;