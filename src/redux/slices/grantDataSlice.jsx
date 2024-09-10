import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	rides: [],
	challenges: [],
	surveys: [],
};

const grantDataSlice = createSlice({
	name: "grant",
	initialState,
	reducers: {
		setGrantUserData(state, action) {
			return { ...state, users: action.payload };
		},
		setGrantRideData(state, action) {
			return { ...state, rides: action.payload };
		},
		setGrantChallengeData(state, action) {
			return { ...state, challenges: action.payload };
		},
		setGrantSurveyData(state, action) {
			return { ...state, surveys: action.payload };
		},
		clearGrantData(state) {
			return initialState;
		},
	},
});

export const {
	setGrantUserData,
	setGrantRideData,
	setGrantChallengeData,
	setGrantSurveyData,
	clearGrantData,
} = grantDataSlice.actions;

export default grantDataSlice.reducer;
