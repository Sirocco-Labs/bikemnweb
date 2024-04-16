"use client";
import styles from "../page.module.css";
import React, { useState } from "react";

import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Organization() {
	return (
		<NavLayout>
			<div className={styles.description}>
				<h1> Organization Information </h1>
			</div>
		</NavLayout>
	);
}
export default ProtectedRoute(Organization);