import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/features/store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isLoginMode: boolean;
}

const initialState: GlobalState = {
  isLoginMode: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<string>) => {
      state.isLoginMode = action.payload == "login";
    },
  },
});

export const { setAuthMode } = globalSlice.actions;

export const selectIsLoginMode = (state: RootState) => state.global.isLoginMode;

export default globalSlice.reducer;
