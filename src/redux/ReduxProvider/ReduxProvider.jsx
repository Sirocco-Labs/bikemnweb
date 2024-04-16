"use client";

import { store } from "../store";
import { Provider } from "react-redux";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export function ReduxProvider({ children }) {
	return (
		<Provider store={store}>
                {children}
			{/* <ProtectedRoute></ProtectedRoute> */}
		</Provider>
	);
}
