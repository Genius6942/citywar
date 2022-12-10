import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "counter",
  initialState: {
    open: false,
  },
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = controlsSlice.actions;

export default controlsSlice.reducer;
