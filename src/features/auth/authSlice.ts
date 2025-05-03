import { AxiosError } from "axios";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import API from "@/lib/axiosInstance";
import { API_URL } from "@/utils/constant";
import { RootState } from "@/features/store";

import { AuthState, LoginPayload, RegisterPayload } from "@/types/authTypes";

const initialState: AuthState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  isLoginMode: true,
};

export const signUp = createAsyncThunk(
  "auth/signup",
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
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setAuthMode: (state, action: PayloadAction<string>) => {
      state.isLoginMode = action.payload == "login";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = "failed";
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
      state.status = "failed";
      state.isAuthenticated = false;
    });
    builder.addCase(me.pending, (state) => {
      state.isAuthenticated = false;
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
      state.user = null;
      state.isAuthenticated = false;
      state.status = "failed";
    });
  },
});

export const { logOut, setAuthMode } = authSlice.actions;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsLoginMode = (state: RootState) => state.auth.isLoginMode;

export default authSlice.reducer;
