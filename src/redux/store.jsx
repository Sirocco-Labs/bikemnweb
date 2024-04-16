import { configureStore} from "@reduxjs/toolkit";
import {createLogger}  from "redux-logger";

import rootReducer from "./rootReducer";

// import supabaseAuthMiddleware from "./middleware/supabaseAuthMiddleware";

const logger = createLogger()

export const store = configureStore({
	reducer: rootReducer,
	middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== "production",
});
