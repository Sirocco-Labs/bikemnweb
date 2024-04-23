import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const allBikeSlice = createSlice({
	name: "allBikes",
	initialState,
	reducers: {
		setAllBikes(state, action) {
			return action.payload
		},
		clearAllBikes(state) {
			return initialState
		},
	},
});

export const { setAllBikes, clearAllBikes } = allBikeSlice.actions;

export default allBikeSlice.reducer;
