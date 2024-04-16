"use client";
import styles from "../page.module.css";
import React, { useState } from "react";

import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Rider() {
	return (
		<NavLayout>
			<div className={styles.description}>
				<h1> Rider Information </h1>
			</div>
		</NavLayout>
	);
}

export default ProtectedRoute(Rider)