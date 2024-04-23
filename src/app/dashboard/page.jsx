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
	const user = useSelector((store) => store.user);
	const appUsers = useSelector((store) => store.appUsers);

	return (
		<NavLayout>
			<section className={styles.dashboardTopRow}>
				<h1> Dashboard </h1>

				<Button
					variant="contained"
					onClick={() => {
						dispatch(logoutUser());
					}}
                    sx={{pt:1.25}}
				>Logout</Button>

			</section>
		</NavLayout>
	);
}

export default ProtectedRoute(Dashboard);
