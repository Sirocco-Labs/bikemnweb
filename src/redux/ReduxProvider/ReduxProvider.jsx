"use client";

import { store } from "../store";
import { Provider, useDispatch } from "react-redux";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";


export function ReduxProvider({ children }) {

	return (
		<Provider store={store}>
                {children}
			{/* <ProtectedRoute></ProtectedRoute> */}
		</Provider>
	);
}
