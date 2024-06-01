import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	media: null,
};

const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {
		setMedia(state, action) {
			return { ...state, media: action.payload };
		},
	},
});

export const { setMedia } = mediaSlice.actions;

export default mediaSlice.reducer;
