"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";

import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";

import { getOrgBikes, getOrgInfo, getOrgStaff } from "@/redux/thunks/orgThunk";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import OrgInfoCard from "@/components/OrgInfoCard/OrgInfoCard";
import OrgInfoBikeTable from "@/components/OrgInfoBikeTable/OrgInfoBikeTable";
import OrgInfoStaffTable from "@/components/OrgInfoStaffTable/OrgInfoStaffTable";

import AddNewOrganizationForm from "@/components/AddNewOrganizationForm/AddNewOrganizationForm";

function Organization() {
	const dispatch = useDispatch();
	const orgInfo = useSelector((store) => store.orgs.info);
	const orgBikes = useSelector((store) => store.orgs.bikes);
	const orgStaff = useSelector((store) => store.orgs.staff);

	useEffect(() => {
		dispatch(getOrgBikes());
		dispatch(getOrgInfo());
		dispatch(getOrgStaff());
	}, [dispatch]);



	return (
		<NavLayout>
			<div className={styles.dashboardTopRow}>
				<h1> Organization Information </h1>
			</div>
			<AddNewOrganizationForm />

			<section className={styles.column}>
				{orgInfo.map((org) => (
					<section key={org.id} className={styles.contentLeft}>
						<Grid container spacing={1} sx={{ p: 0.5 }}>
							<Grid item xs={6}>
								<Typography variant="h4">{org.name}</Typography>
								<Typography variant="body2">
									{org.street_address}
								</Typography>
								<Typography
									mb
									variant="body2"
								>{`${org.city}, ${org.state} ${org.zip}`}</Typography>

								<Typography variant="h6" mb>
									Total bikes: {org.bikes_issued_total}
								</Typography>
							</Grid>
						</Grid>
						<section className={styles.contentSplitCol}>
							<section className={styles.splitContentLeft}>
								<Typography variant="h5" mb>
									Bikes
								</Typography>
								<OrgInfoBikeTable
									orgBikes={orgBikes}
									org={org}
								/>
							</section>
							<section className={styles.splitContentLeft}>
								<Typography variant="h5" mb>
									Employees
								</Typography>
								<OrgInfoStaffTable
									orgStaff={orgStaff}
									org={org}
								/>
							</section>
						</section>
					</section>
				))}

				{/* <section className={styles.scrollSideways}>
					{orgInfo.map((org) => (
						<section key={org.id} className={styles.cardWrapper}>
							<OrgInfoCard org={org} orgBikes={orgBikes} />
						</section>
					))}
				</section> */}
			</section>
		</NavLayout>
	);
}
export default ProtectedRoute(Organization);

// <div
// 	key={org.id}
// 	style={{
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "flex-start",
// 		justifyContent: "space-between",
// 		width: "100%",
// 		padding: ".25rem",
// 	}}
// >
// 	<div
// 		style={{
// 			display: "flex",
// 			flexDirection: "column",
// 			alignItems: "flex-start",
// 			justifyContent: "space-between",
// 			width: "100%",
// 			marginBottom: "1rem",
// 		}}
// 	>
// 		<p>{org.name}</p>
// 		<p>{org.street_address}</p>
// 		<p>{`${org.city}, ${org.state} ${org.zip}`}</p>
// 		<p>{org.bikes_issued_total}</p>
// 		<p>{org.bikes_in_use_total}</p>
// 	</div>

// 	<h3>Bikes</h3>
// 	{orgBikes
// 		.filter((ride) => ride.org.name === org.name)
// 		.map((bike) => (
// 			<div
// 				style={{
// 					display: "flex",
// 					alignItems: "center",
// 					justifyContent: "space-between",
// 					width: "100%",
// 				}}
// 				key={bike.id}
// 			>
// 				<div
// 					style={{
// 						display: "flex",
// 						alignItems: "center",
// 						justifyContent: "space-between",
// 						width: "50%",
// 					}}
// 				>
// 					<p>
// 						{bike.in_use
// 							? `In use`
// 							: `Available`}
// 					</p>
// 					<p>{bike.bikes.make}</p>
// 					<p>{bike.bikes.color}</p>
// 					<p>{bike.bikes.serial_number}</p>
// 					<p>{bike.bikes.notes}</p>
// 				</div>
// 				<div
// 					style={{
// 						display: "flex",
// 						alignItems: "center",
// 						justifyContent: "space-between",
// 						width: "50%",
// 					}}
// 				>
// 					{bike.in_use && (
// 						<p>
// 							{new Date(
// 								bike.check_out_date
// 							).toLocaleString()}
// 						</p>
// 					)}
// 					{bike.in_use && (
// 						<p>
// 							{new Date(
// 								bike.return_by
// 							).toLocaleString()}
// 						</p>
// 					)}
// 					{bike.in_use && (
// 						<p>
// 							{bike.appUser.first_name}{" "}
// 							{bike.appUser.last_name}
// 						</p>
// 					)}
// 				</div>
// 			</div>
// 		))}
// 	<div
// 		style={{
// 			height: "3px",
// 			backgroundColor: "blue",
// 			width: "100%",
// 			margin: " .5rem 0 .5rem 0 ",
// 		}}
// 	></div>
// </div>
