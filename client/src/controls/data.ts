import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
	name: "counter",
	initialState: {
		open: false,
		selected: {
			x: 0,
			y: 0,
			name: ''
		}
	},
	reducers: {
		open: (state, action: PayloadAction<{ x: number, y: number }>) => {
			state.open = true;
			state.selected = { ...state.selected, ...action.payload, name: "Empty" };
		},
		close: (state) => {
			state.open = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { open, close } = controlsSlice.actions;

export default controlsSlice.reducer;
