"use client";
import styles from "../page.module.css";
import React, { useEffect } from "react";

import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";

import { getOrgBikes, getOrgInfo, getOrgStaff } from "@/redux/thunks/orgThunk";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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



			</section>
		</NavLayout>
	);
}
export default ProtectedRoute(Organization);

