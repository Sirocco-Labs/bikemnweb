"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CreateChallengeForm from "@/components/CreateChallengeForm/CreateChallengeForm";
import ActiveChallengesView from "@/components/ActiveChallengesView/ActiveChallengesView";

import NavLayout from "@/components/NavLayout/NavLayout";
import {
	getActiveIncentives,
	getAllIncentives,
	getIncentiveCategories,
} from "@/redux/thunks/incentivesThunk";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

function Challenges() {
	const dispatch = useDispatch();

	const [value, setValue] = useState(0);

	useEffect(() => {
		dispatch(getIncentiveCategories());
		dispatch(getAllIncentives());
		dispatch(getActiveIncentives());
	}, [dispatch]);

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
						// border: "1px solid magenta",
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
								// border: "1px solid lime",
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
						sx={{ width: "75%", alignSelf:'center', alignItems:'center' }}
					>
						<Tab
							variant="contained"
							sx={{ width: "75%", my: 1 }}
							label="Active Challenges"
						/>
						<Tab
							sx={{ width: "75%", my: 1 }}
							label="Create a new Challenge"
						/>
						<Tab
							sx={{ width: "75%", my: 1 }}
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
						{/* <ViewComponent /> */}
					</TabView>
		</NavLayout>
	);
}

export default ProtectedRoute(Challenges)