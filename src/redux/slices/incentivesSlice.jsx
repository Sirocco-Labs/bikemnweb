import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	categories:[],
    allIncentives:[],
	activeIncentives:[]
};

const incentiveSlice = createSlice({
	name: "incentives",
	initialState,
	reducers: {
		setIncentiveCategories(state, action) {
			return {...state, categories: action.payload}
		},
		setAllIncentives(state, action) {
			return {...state, allIncentives: action.payload}
		},
		setActiveIncentives(state, action) {
			return {...state, activeIncentives: action.payload}
		},
		clearIncentives(state) {
			return { ...state, ...initialState };
		},
	},
});

export const { setIncentiveCategories, setAllIncentives, setActiveIncentives } =
	incentiveSlice.actions;

export default incentiveSlice.reducer;