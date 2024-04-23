"use client";
import { useRouter} from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/utils/supabase/supabase";

import { getUserQuery } from "@/redux/thunks/userThunk";
import { setIsAuthenticated, clearAuth } from "@/redux/slices/authSlice";

export default function ProtectedRoute(Component) {
	return function useAuth(props) {
		const router = useRouter();
		const dispatch = useDispatch();
		const user = useSelector((store) => store.user);
		const auth = useSelector((store) => store.auth);


		useEffect(() => {
			const goHome = () => {
				router.push("/");
			};
				const { data } = supabase.auth.onAuthStateChange(
					(event, session) => {
						if (event === "INITIAL_SESSION") {
							if (session) {
								dispatch(getUserQuery(session.user.id));
								if (user.is_admin) {
									dispatch(
										setIsAuthenticated({
											isAuthenticated: true,
											user_id: session.user.id,
										})
									);
								}
							} else {
								goHome();
							}
						} else if (event === "SIGNED_IN") {
							if (session) {
								dispatch(getUserQuery(session.user.id));
								if (user.is_admin) {
									dispatch(
										setIsAuthenticated({
											isAuthenticated: true,
											user_id: session.user.id,
										})
									);
								}else{
									goHome();
								}
							} else {
								goHome();
							}
						} else if (event === "SIGNED_OUT") {
							dispatch(clearAuth());
							goHome();
						} else if (
							event === "PASSWORD_RECOVERY" ||
							event === "TOKEN_REFRESHED" ||
							event === "USER_UPDATED"
						) {
							dispatch(getUserQuery(session.user.id));
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
		}, [dispatch, router, auth.isAuthenticated, user.is_admin]);

		if (auth.isAuthenticated) {
			return <Component {...props} />;
		} else {
			return null;
		}

	};
}
