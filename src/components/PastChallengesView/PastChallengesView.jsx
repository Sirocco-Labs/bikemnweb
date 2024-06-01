"use client";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {
	getActiveIncentives,
	getAllIncentives,
	getPastIncentives,
} from "@/redux/thunks/incentivesThunk";
import PastChallengesRow from "../PastChallengesRow/PastChallengesRow";

export default function PastChallengesView() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPastIncentives());
	}, [dispatch]);

	const pastChallenges = useSelector(
		(store) => store.incentives.pastIncentives
	);


	return pastChallenges ? (
		<TableContainer component={Paper}>
			<Table size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align="left">Description</TableCell>
						<TableCell align="left">Goal</TableCell>
						<TableCell align="left">Category</TableCell>
						<TableCell align="left">Start Date</TableCell>
						<TableCell align="left">End Date</TableCell>
						<TableCell align="left"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pastChallenges.map((item) => (
						<PastChallengesRow
							key={item.id}
							item={item}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<></>
	);
}
