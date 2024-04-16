"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/utils/supabase/supabase";

import { getUserQuery } from "@/redux/thunks/userThunk";
import { setIsAuthenticated, clearAuth } from "@/redux/slices/authSlice";

import LoginForm from "../LoginForm/LoginForm";

export default function ProtectedRoute(Component){
	return function useAuth(props){
		const router = useRouter()
		const dispatch = useDispatch();
		const user = useSelector((store) => store.user);
		const auth = useSelector((store) => store.auth);

		useEffect(() => {
			const authenticate = () => {
				const { data } = supabase.auth.onAuthStateChange(
					(event, session) => {
						if (
							event === "INITIAL_SESSION" ||
							event === "SIGNED_IN"
						) {
							if (session) {
								dispatch(getUserQuery(session.user.id));
								if (user.is_admin) {
									dispatch(
										setIsAuthenticated({ isAuthenticated:true,
											user_id: session.user.id,
										})
									);
								}
							} else {
								router.push("/");
							}
						} else if (event === "SIGNED_OUT") {
							dispatch(clearAuth());
							router.push("/");
						} else if (
							event === "PASSWORD_RECOVERY" ||
							event === "TOKEN_REFRESHED" ||
							event === "USER_UPDATED"
						) {
							if (user.is_admin) {
								dispatch(
									setIsAuthenticated({
										isAuthenticated: true,
										user_id: session.user.id,
									})
								);
							}
						}
					}
				);
				return () => {
					data.subscription.unsubscribe();
				};
			};
			authenticate();
		}, [dispatch, router, user.is_admin]);

		return auth.user_id ? <Component {...props} /> : null;
	}

};

// useEffect(() => {
// 		const authenitcate = async () => {
// 			const { data } = await supabase.auth.onAuthStateChange(
// 				(event, session) => {
// 					if (
// 						event === "INITIAL_SESSION" ||
// 						event === "SIGNED_IN"
// 					) {
// 						dispatch(getUserQuery(session.user.id));
// 						if (user.is_admin) {
// 							dispatch(
// 								setIsAuthenticated({
// 									user_id: session.user.id,
// 								})
// 							);
// 						}
// 					} else if (event === "SIGNED_OUT") {
// 						dispatch(clearAuth());
// 						router.push("/login");
// 					} else if (
// 						event === "PASSWORD_RECOVERY" ||
// 						event === "TOKEN_REFRESHED" ||
// 						event === "USER_UPDATED"
// 					) {
// 						if (user.is_admin) {
// 							dispatch(
// 								setIsAuthenticated({
// 									user_id: session.user.id,
// 								})
// 							);
// 						}
// 					}
// 				}
// 			);
// 			return () => {
// 				data.subscription.unsubscribe();
// 			};
// 		};
// 		authenitcate();
// 	}, [dispatch, router, user.is_admin]);
// const { data } = supabase.auth.onAuthStateChange((event, session) => {
// 	if (event === "INITIAL_SESSION") {
// 		dispatch(getUserQuery(session?.user.id));
// 		if (user.is_admin) {
// 			dispatch(setIsAuthenticated({ user_id: session?.user.id }));
// 		} else {
// 			router.push("/login");
// 		}
// 	} else if (event === "SIGNED_IN") {
// 		dispatch(getUserQuery(session.user.id));
// 		if (user.is_admin) {
// 			dispatch(setIsAuthenticated({ user_id: session?.user.id }));
// 		}
// 		// handle sign in event
// 	} else if (event === "SIGNED_OUT") {
// 		dispatch(clearAuth());
// 		router.push("/login");
// 		// handle sign out event
// 	} else if (event === "PASSWORD_RECOVERY") {
// 		dispatch(setIsAuthenticated({ user_id: session?.user.id }));
// 		// handle password recovery event
// 	} else if (event === "TOKEN_REFRESHED") {
// 		if (user.is_admin) {
// 			dispatch(setIsAuthenticated({ user_id: session?.user.id }));
// 		}
// 		// handle token refreshed event
// 	} else if (event === "USER_UPDATED") {
// 		if (user.is_admin) {
// 			dispatch(setIsAuthenticated({ user_id: session?.user.id }));
// 		}
// 		// handle user updated event
// 	}
// });
// return () => {
// 	data.subscription.unsubscribe();
// };
// });
