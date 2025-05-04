import axios from "axios";

import { API_BASE_URL, API_URL, ROUTES } from "@/utils/constant";

import { logOut } from "@/features/auth/authSlice";

import { useAppDispatch } from "@/features/hooks.ts";

const API = axios.create({
  baseURL: `${API_BASE_URL}/v1`, // e.g., http://localhost:5000/v1
  withCredentials: true, // Required to send cookies
});

const EXCLUDED_URLS = [
  API_URL.AUTH_LOGIN,
  API_URL.AUTH_REGISTER,
  API_URL.REFRESH_TOKENS,
];

// Optional: Request interceptor (e.g., add headers, etc.)
API.interceptors.request.use(
  (config) => {
    // You can optionally attach something like CSRF token here
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle 401 and refresh token logics
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // redux
    const dispatch = useAppDispatch();
    const originalRequest = error.config;

    // Handle 400 or 403 (e.g., malformed or blocked token)
    if (error.response?.status === 400 || error.response?.status === 403) {
      console.warn("Bad request or forbidden – Logging out");
      dispatch(logOut());
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !EXCLUDED_URLS.includes(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await API.post(API_URL.REFRESH_TOKENS, {}, { withCredentials: true }); // assumes refreshToken is in cookies
        return API(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        dispatch(logOut());
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
