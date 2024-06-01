import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userList: [],
	trackingStatus: [],
};

const rewardSlice = createSlice({
	name: "reward",
	initialState,
	reducers: {
		setRewardList(state, action) {
			return { ...state, userList: action.payload };
		},
		setRewardTrackingStatus(state, action) {
			return { ...state, trackingStatus: action.payload };
		},
		clearRewardSlice(state) {
			return {...state, ...initialState};
		},
	},
});

export const { setRewardList, setRewardTrackingStatus, clearRewardSlice } =
	rewardSlice.actions;

export default rewardSlice.reducer;
