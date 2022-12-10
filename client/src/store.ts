import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./controls/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ controls: controlsReducer });
export type IRootState = ReturnType<typeof rootReducer>;

export default configureStore({
	reducer: rootReducer,
});
