import { supabase } from "../../utils/supabase/supabase"
import { setIsAuthenticated, clearAuth } from "../slices/authSlice"
import { getUserQuery } from "../thunks/userThunk";

// const supabaseAuthMiddleware = (store) => (next) => (action) => {
// 	const { dispatch, getState } = store;
// 	const subscription = supabase.auth.onAuthStateChange((event, session) => {
// 		const { user } = getState();
// 		switch (event) {
// 			case "INITIAL_SESSION":
// 			case "SIGNED_IN":
// 				dispatch(getUserQuery(session?.user.id)); // Fetch user data
// 				if (user.is_admin) {
// 					dispatch(setIsAuthenticated({ user_id: user.user_id })); // Set authentication status
// 				}
// 				break;
// 			case "SIGNED_OUT":
// 				dispatch(clearAuth()); // Clear authentication status
// 				// Redirect or perform other actions
// 				break;
// 			case "PASSWORD_RECOVERY":
// 			case "TOKEN_REFRESHED":
// 			case "USER_UPDATED":
// 				if (user.is_admin) {
// 					dispatch(setIsAuthenticated({ user_id: user.user_id })); // Update authentication status
// 				}
// 				break;
// 			default:
// 				break;
// 		}
// 	});
//     const result = next(action);

//     return () => {
// 		subscription.unsubscribe();
// 	};
// };

// export default supabaseAuthMiddleware
