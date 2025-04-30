import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/features/store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLoggedIn: boolean;
  isLoading: boolean;
  switch: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false,
  isLoading: false,
  switch: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    switchLogin: (state, action: PayloadAction<string>) => {
      state.switch = action.payload == "login";
    },
  },
  /*extraReducers: () => {
    builder
  }*/
});

export const { switchLogin } = loginSlice.actions;

export const selectSwitchLogin = (state: RootState) => state.login.switch;

export default loginSlice.reducer;
