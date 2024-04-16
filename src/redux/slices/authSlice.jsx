import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user_id:'',
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setIsAuthenticated(state, action) {
			return { ...state, isAuthenticated: action.payload.isAuthenticated, user_id:action.payload.user_id };
		},
		clearAuth(state) {
			return { ...state, ...initialState };
		},
	},
});

export const { setIsAuthenticated, clearAuth } = authSlice.actions;

export default authSlice.reducer;
