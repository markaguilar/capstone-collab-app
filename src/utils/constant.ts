export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URL = {
  AUTH_LOGIN: `/auth/login`,
  AUTH_REGISTER: `/auth/register`,
  AUTH_ME: `/me`,
  REFRESH_TOKENS: `/auth/refresh-tokens`,
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROJECTS: "/projects",
  MY_PROJECTS: "/my-projects",
  MY_PROPOSALS: "/my-proposals",
  MESSAGES: "/messages",
};
