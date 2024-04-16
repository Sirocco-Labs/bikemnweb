"use client";
import styles from "../page.module.css";
import React, { useState } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Dashboard() {
	return (
		<NavLayout>
			<div className={styles.description}>
				<h1> Dashboard </h1>
			</div>
		</NavLayout>
	);
}

export default ProtectedRoute(Dashboard)