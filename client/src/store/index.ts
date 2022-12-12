import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "../controls/data";
import { combineReducers } from "redux";

const store = configureStore({
	reducer: { controls: controlsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export default store;