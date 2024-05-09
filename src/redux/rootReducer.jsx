import { combineReducers } from "@reduxjs/toolkit";

import user from './slices/userSlice'
import auth from './slices/authSlice'
import appUsers from './slices/appUsersSlice'
import incentives from "./slices/incentivesSlice";
import allBikes from './slices/allBikesSlice'
import orgs from './slices/orgSlice'
import media from './slices/mediaUpload'

const rootReducer = combineReducers({
    user,
    auth,
    appUsers,
    incentives,
    allBikes,
    orgs,
    media
});

export default rootReducer;
