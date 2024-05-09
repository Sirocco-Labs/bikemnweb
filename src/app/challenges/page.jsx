"use client";
import styles from "../page.module.css"
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CreateChallengeForm from "@/components/CreateChallengeForm/CreateChallengeForm";
import ActiveChallengesView from "@/components/ActiveChallengesView/ActiveChallengesView";
import PastChallengesView from "@/components/PastChallengesView/PastChallengesView";

import NavLayout from "@/components/NavLayout/NavLayout";
import {
	getActiveIncentives,
	getAllIncentives,
	getIncentiveCategories,
	getPastIncentives,
} from "@/redux/thunks/incentivesThunk";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Challenges() {
	const dispatch = useDispatch();

	const [value, setValue] = useState(0);

	// useEffect(() => {
	// 	dispatch(getIncentiveCategories());
	// 	dispatch(getAllIncentives());
	// 	dispatch(getPastIncentives());
	// }, [dispatch]);

	const TabView = (props) => {
		const { children, value, index, ...other } = props;
		return (
			value === index && (
				<div
					role="tabpanel"
					hidden={value !== index}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						padding: "1rem",
					}}
				>
					{value === index && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								padding: ".5rem",
								width:'100%',
								alignSelf:'center',
							}}
						>
							{children}
						</div>
					)}
				</div>
			)
		);
	};

	const changeTabView = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<NavLayout>
			<h1> Challenges </h1>
			<Tabs
				variant="fullWidth"
				value={value}
				onChange={changeTabView}
				sx={{
					width: "100%",
					alignSelf: "center",
					alignItems: "center",
				}}
			>
				<Tab sx={{ width: "100%", my: 1 }} label="Active Challenges" />
				<Tab
					sx={{ width: "100%", my: 1 }}
					label="Create a new Challenge"
				/>
				<Tab
					sx={{ width: "100%", my: 1 }}
					label="Previous Challenges"
				/>
			</Tabs>

			<TabView value={value} index={0}>
				<ActiveChallengesView />
			</TabView>

			<TabView value={value} index={1}>
				<CreateChallengeForm />
			</TabView>

			<TabView value={value} index={2}>
				<PastChallengesView />
			</TabView>
		</NavLayout>
	);
}

export default ProtectedRoute(Challenges)