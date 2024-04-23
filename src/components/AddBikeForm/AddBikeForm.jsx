"use client";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
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
import Collapse from "@mui/material/Collapse";
import Slide from "@mui/material/Slide";

import { addNewBike } from "@/redux/thunks/bikeThunk";

export default function AddBikeForm() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const [show, setShow] = useState(false);

	const bikeData = {
		nickname: "",
		make: "",
		color: "",
		serial_number: "",
	};

	const [form, setForm] = useState(bikeData);
	// useEffect(() => {
	// 	console.log(form);
	// }, [form]);

	const handleSubmit = () => {
		dispatch(addNewBike(form))
		setForm(bikeData)
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				height: "120px",
				marginBottom: "1.5rem",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					width: "20%",
					height: "100%",
					padding: "1rem",
				}}
			>
				{show ? (
					<Button
						variant="outlined"
						sx={{ pt: 1.25 }}
						onClick={() => {
							setShow(!show);
						}}
					>
						Close
					</Button>
				) : (
					<Button
						variant="contained"
						sx={{ pt: 1.25 }}
						onClick={() => {
							setShow(!show);
						}}
					>
						Add new bike
					</Button>
				)}
			</div>
			<div style={{ width: "auto", height: "auto" }}>
				<Slide in={show} direction="left">
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={6}>
									<p></p>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={2.5}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel
									htmlFor="bike-nickname"
									sx={{ mb: 1 }}
								>
									Nickname
								</FormLabel>
								<TextField
								autoFocus={true}
									fullWidth
									sx={{ width: "100%" }}
									id="bike-nickname"
									value={form.nickname}
									onChange={(e) =>
										setForm({
											...form,
											nickname: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2.5}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="bike-make" sx={{ mb: 1 }}>
									Make
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="bike-make"
									value={form.make}
									onChange={(e) =>
										setForm({
											...form,
											make: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2.5}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="bike-color" sx={{ mb: 1 }}>
									Color
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="bike-color"
									value={form.color}
									onChange={(e) =>
										setForm({
											...form,
											color: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2.5}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="bike-serial" sx={{ mb: 1 }}>
									Serial Number
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="bike-serial"
									value={form.serial_number}
									onChange={(e) =>
										setForm({
											...form,
											serial_number: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2}>
							<Button
								variant="contained"
								fullWidth
								sx={{ pt: 1.25, mt: 6.5 }}
								onClick={handleSubmit}
							>
								Add Bike
							</Button>
						</Grid>
					</Grid>
				</Slide>
			</div>
		</div>
	);
}
