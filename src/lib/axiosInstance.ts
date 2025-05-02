import axios from "axios";
import { API_BASE_Url, API_URL, ROUTES } from "@/utils/constant.ts";

const API = axios.create({
  baseURL: `${API_BASE_Url}/v1`, // e.g., http://localhost:5000/v1
  withCredentials: true, // Required to send cookies
});

// Optional: Request interceptor (e.g., add headers, etc.)
API.interceptors.request.use(
  (config) => {
    // You can optionally attach something like CSRF token here
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle 401 and refresh token logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(API_URL.REFRESH_TOKENS)
    ) {
      originalRequest._retry = true;

      try {
        await API.post(API_URL.REFRESH_TOKENS, {}, { withCredentials: true }); // assumes refreshToken is in cookies
        return API(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        window.location.href = ROUTES.LOGIN; // or dispatch logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
