import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const appUsersSlice = createSlice({
	name: "appUsers",
	initialState,
	reducers: {
		setAppUsers(state, action) {
			return action.payload
		},
		clearAppUsersData(state) {
			return initialState
		},
	},
});

export const { setAppUsers, clearAppUsersData } = appUsersSlice.actions;

export default appUsersSlice.reducer;
