"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Bikes() {
	return (
		<NavLayout>
			<div className={styles.description}>
				<h1> Manage Bike Data </h1>
			</div>
		</NavLayout>
	);
}
export default ProtectedRoute(Bikes);