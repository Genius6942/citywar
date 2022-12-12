import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Constants from "../../../shared/Constants";
import TileObject from "../rendering/object";

export const gridSlice = createSlice({
	name: "counter",
	initialState: Array(Constants.GAME.GRID_SIZE).fill(Array()).map(() => Array(Constants.GAME.GRID_SIZE).fill(0).map(() => null)) as (null | TileObject)[][],
	reducers: {
	},
});

// Action creators are generated for each case reducer function
export const { } = gridSlice.actions;

export default gridSlice.reducer;
