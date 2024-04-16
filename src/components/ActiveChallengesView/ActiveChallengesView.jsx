"use client";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


import { getActiveIncentives } from "@/redux/thunks/incentivesThunk";
import ActiveChallengesRow from "../ActiveChallengesRow/ActiveChallengesRow";



export default function ActiveChallengesView(){
const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getActiveIncentives())

    },[])

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