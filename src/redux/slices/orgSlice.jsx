import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:[],
    bikes:[],
	staff:[]
}

const orgSlice = createSlice({
	name: "orgs",
	initialState,
	reducers: {
		setOrgInfo(state, action) {
			return {...state, info: action.payload}
		},
		setOrgBikes(state, action) {
			return {...state, bikes: action.payload}
		},
		setOrgStaff(state, action) {
			return {...state, staff: action.payload}
		},
		clearOrgData(state) {
			return initialState
		},
	},
});

export const { setOrgInfo, setOrgBikes, setOrgStaff, clearOrgData } = orgSlice.actions;

export default orgSlice.reducer;
