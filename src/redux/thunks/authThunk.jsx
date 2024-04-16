import { supabase } from "@/utils/supabase/supabase";

import { getUserQuery } from "./userThunk";

export const loginUser = (credentials) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> loginUser(credentials): ", credentials);
	try {
		const response = await supabase.auth.signInWithPassword(credentials);
		if (response.error) {
			console.log("SUPABASE LOGIN ERROR!: ", response.error.message);
		} else {
			console.log("SUPABASE LOGIN SUCCESS!: ", response.data);
			const id = response.data.user.id;
			await dispatch(getUserQuery(id));
		}
	} catch (error) {
		console.log("AUTH THUNK ERROR --> loginUser():", error);
	}
};
