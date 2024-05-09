"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import NavLayout from "@/components/NavLayout/NavLayout";
import styles from "../page.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Grant() {
	const dispatch = useDispatch();

	return (
		<NavLayout>
			<div className={styles.description}>
				<h1> Grant Data </h1>
			</div>
		</NavLayout>
	);
}
export default ProtectedRoute(Grant);
