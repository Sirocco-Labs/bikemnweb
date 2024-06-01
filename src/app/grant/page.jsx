"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import NavLayout from "@/components/NavLayout/NavLayout";
import styles from "../page.module.css";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";


function Grant() {
	const dispatch = useDispatch();

	return (
		<NavLayout>
			<div className={styles.dashboardTopRow}>
				<h1> Grant Data </h1>
			</div>
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
export default ProtectedRoute(Grant);
