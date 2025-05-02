import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RegisterState {
  isLoading: boolean;
}

const initialState: RegisterState = {
  isLoading: false,
};

export const register = createAsyncThunk("auth/register", async () => {
  // const response = await axios.post;
});

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
  },
});
