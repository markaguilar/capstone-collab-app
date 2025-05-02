import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "@/lib/axiosInstance.ts";
import { API_URL } from "@/utils/constant.ts";
import { RootState } from "@/features/store.ts";

interface RegisterPayload {
  name: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: object;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  user: {},
  isAuthenticated: false,
  status: "idle",
  error: "",
};

export const signUp = createAsyncThunk(
  "auth/sinup",
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const res = await API.post(API_URL.AUTH_REGISTER, payload);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const res = await API.post(API_URL.AUTH_LOGIN, payload);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await API.get(API_URL.AUTH_ME);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "UnAuthorized",
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(me.pending, (state) => {
      state.isLoading = true;
      state.status = "loading";
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
    });
    builder.addCase(me.rejected, (state) => {
      state.isLoading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.status = "failed";
    });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
