"use client";
import styles from "../../app/page.module.css";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slide from "@mui/material/Slide";


import { addNewOrg } from "@/redux/thunks/orgThunk";

export default function AddNewOrganizationForm() {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const orgData = {
		name: "",
		street_address: "",
		city: "",
		state: "",
		zip: "",
	};

	const [form, setForm] = useState(orgData);


	const handleSubmit = () => {
		dispatch(addNewOrg(form));
		setForm(orgData);
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
						New organization
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
						<Grid item xs={2}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="org-name" sx={{ mb: 1 }}>
									Name
								</FormLabel>
								<TextField
									autoFocus={true}
									fullWidth
									sx={{ width: "100%" }}
									id="org-name"
									value={form.name}
									onChange={(e) =>
										setForm({
											...form,
											name: e.target.value,
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
								<FormLabel
									htmlFor="org-street_address"
									sx={{ mb: 1 }}
								>
									Street address
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="org-street_address"
									value={form.street_address}
									onChange={(e) =>
										setForm({
											...form,
											street_address: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="org-city" sx={{ mb: 1 }}>
									City
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="org-city"
									value={form.city}
									onChange={(e) =>
										setForm({
											...form,
											city: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={1}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="org-state" sx={{ mb: 1 }}>
									State
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="org-state"
									value={form.state}
									onChange={(e) =>
										setForm({
											...form,
											state: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={1.25}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel htmlFor="org-zip" sx={{ mb: 1 }}>
									Zip code
								</FormLabel>
								<TextField
									fullWidth
									sx={{ width: "100%" }}
									id="org-zip"
									value={form.zip}
									onChange={(e) =>
										setForm({
											...form,
											zip: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={2.25}>
							<Button
								variant="contained"
								fullWidth
								sx={{ pt: 1.25, mt: 6.5 }}
								onClick={handleSubmit}
							>
								Add Organization
							</Button>
						</Grid>
					</Grid>
				</Slide>
			</div>
		</div>
	);
}
