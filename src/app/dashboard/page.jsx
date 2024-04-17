"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/thunks/authThunk";

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

    useEffect(()=>{},[])

	return (
		<NavLayout>
			<h1> Dashboard </h1>
			<Button
				variant="contained"
				sx={{
					p: 1.5,
				}}
                onClick={()=>{
                    dispatch(logoutUser())
                }}
			>
				Logout
			</Button>
		</NavLayout>
	);
}

export default ProtectedRoute(Dashboard);
