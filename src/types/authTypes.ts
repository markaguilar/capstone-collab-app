export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  email: string;
  isEmailVerified: boolean;
}

export interface AuthState {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isLoginMode: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type LoginInputs = {
  email: string;
  password: string;
  rememberMe?: boolean | undefined;
};

export type RegisterInputs = {
  role: string;
  name: string;
  username: string;
  email: string;
  password: string;
};
