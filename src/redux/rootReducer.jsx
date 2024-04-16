import { combineReducers } from "@reduxjs/toolkit";

import user from './slices/userSlice'
import auth from './slices/authSlice'
import appUsers from './slices/appUsersSlice'
import incentives from "./slices/incentivesSlice";

const rootReducer = combineReducers({
    user,
    auth,
    appUsers,
    incentives
});

export default rootReducer;
