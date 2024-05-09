"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";

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
					sx={{ pt: 1.25 }}
				>
					Logout
				</Button>
			</section>
			<section className={styles.column}>
				<section className={styles.contentLeft}>
					<section className={styles.contentSplitCol}>
						<section className={styles.splitContentLeft}>
							<div
								style={{
									width: "600px",
									height: "600px",
									backgroundColor: "var(--bike-orange)",
								}}
							>
								<Typography variant="h5" mt align="center">
									Chart
								</Typography>
							</div>
						</section>
						<section className={styles.splitContentLeft}>
							<div
								style={{
									width: "600px",
									height: "600px",
									border: "3px solid var(--bike-blue)",
								}}
							>
								<Typography variant="h5" mt align="center">
									Table of data?
								</Typography>
							</div>
						</section>
					</section>
				</section>
			</section>
		</NavLayout>
	);
}

export default ProtectedRoute(Dashboard);
