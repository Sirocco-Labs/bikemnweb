"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import AddBikeForm from "@/components/AddBikeForm/AddBikeForm";
import { getAllBikes } from "@/redux/thunks/bikeThunk";
import { getOrgInfo, getOrgBikes } from "@/redux/thunks/orgThunk";

import AllBikesTable from "@/components/AllBikesTable/AllBikesTable";

function Bikes() {
	const dispatch = useDispatch();
	const allBikes = useSelector((store) => store.allBikes);
	const orgInfo = useSelector((store) => store.orgs.info);
	const orgBikes = useSelector((store) => store.orgs.bikes);

	useEffect(() => {
		dispatch(getAllBikes());
		dispatch(getOrgBikes());
		dispatch(getOrgInfo());
	}, [dispatch]);

	return (
		<NavLayout>
			<section className={styles.dashboardTopRow}>
				<h1> Bike Info </h1>
			</section>
			<AddBikeForm />
			<h2  className={styles.mb}>All bikes</h2>
			<section className={styles.column}>
				<AllBikesTable allBikes={allBikes} orgInfo={orgInfo} />
			</section>
		</NavLayout>
	);
}
export default ProtectedRoute(Bikes);
