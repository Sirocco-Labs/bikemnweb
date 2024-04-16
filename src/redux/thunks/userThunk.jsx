import { supabase } from "../../utils/supabase/supabase";
import { setUser, clearUserData } from "../slices/userSlice";

export const getUserQuery = (id) => async (dispatch) => {
	console.log("IN USER THUNK ----> getUserQuery(id): ", id);
	try {
		const response = await supabase
			.from("users")
			.select(`*`)
			.eq("user_id", id)
			.single();
		if (response.error) {
			console.log("SUPABASE GET USER ERROR!: ", response.error);
		} else {
			console.log("SUPABASE GET USER SUCCESS!: ", response.data);
			await dispatch(setUser(response.data));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> getUserQuery(id): ", error);
	}
};
