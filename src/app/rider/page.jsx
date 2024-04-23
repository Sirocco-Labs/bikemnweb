"use client";
import styles from "../page.module.css";
import React, { useEffect } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getAppUsers } from "@/redux/thunks/appUserDataThunk";
import RiderDetailsRow from "@/components/RiderDetailsRow/RiderDetailsRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Rider() {
	const dispatch = useDispatch();
	const appUsers = useSelector((store) => store.appUsers);

	useEffect(() => {
		dispatch(getAppUsers());
	}, [dispatch]);

	return (
		<NavLayout>
			<section className={styles.dashboardTopRow}>
				<h1> Rider Info </h1>
			</section>

			<section className={styles.content}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Username</TableCell>
								<TableCell align="right">First name</TableCell>
								<TableCell align="right">Last name</TableCell>
								<TableCell align="right">User type</TableCell>
								<TableCell align="right">
									Open to follow up communications
								</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{appUsers.map((rider) => (
								<RiderDetailsRow key={rider.id} rider={rider} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</section>
		</NavLayout>
	);
}

export default ProtectedRoute(Rider);
