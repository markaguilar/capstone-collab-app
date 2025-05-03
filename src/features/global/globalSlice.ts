import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/features/store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  switch: boolean;
}

const initialState: GlobalState = {
  switch: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    switchLogin: (state, action: PayloadAction<string>) => {
      state.switch = action.payload == "login";
    },
  },
});

export const { switchLogin } = globalSlice.actions;

export const selectSwitchLogin = (state: RootState) => state.global.switch;

export default globalSlice.reducer;
