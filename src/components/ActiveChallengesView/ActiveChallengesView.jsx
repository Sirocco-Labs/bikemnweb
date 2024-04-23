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


import ActiveChallengesRow from "../ActiveChallengesRow/ActiveChallengesRow";
import { getActiveIncentives } from "@/redux/thunks/incentivesThunk";


export default function ActiveChallengesView(){
const dispatch = useDispatch()
useEffect(() => {
	dispatch(getActiveIncentives());
}, [dispatch]);

    const active = useSelector((store)=>store.incentives.activeIncentives)

    return (
		<TableContainer
        component={Paper}
        >
			<Table
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align="left">Description</TableCell>
						<TableCell align="left">Goal</TableCell>
						<TableCell align="left">Category</TableCell>
						<TableCell align="left">Start Date</TableCell>
						<TableCell align="left">End Date</TableCell>
						<TableCell align="left">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{active.map((item) => (
						<ActiveChallengesRow key={item.id} item={item}/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}