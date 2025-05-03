import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/features/store.ts";

interface GlobalState {
  isLoading: boolean;
}

const initialState: GlobalState = {
  isLoading: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const selectIsGlobalLoading = (state: RootState) =>
  state.global.isLoading;

export default globalSlice.reducer;
