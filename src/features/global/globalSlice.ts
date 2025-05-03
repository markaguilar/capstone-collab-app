import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/features/store";

/**
 * Global UI state slice
 *
 * Manages global UI states such as loading indicators that are used across
 * multiple components in the application.
 */
interface GlobalState {
  isLoading: boolean;
}

const initialState: GlobalState = {
  isLoading: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;

export const selectIsGlobalLoading = (state: RootState) =>
  state.global.isLoading;

export default globalSlice.reducer;
