"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";

import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { updateBikeOrgAssignment } from "@/redux/thunks/bikeThunk";
import { addBikeNote } from "@/redux/thunks/bikeThunk";

import OrgAssignmentForm from "../OrgAssignmentForm/OrgAssignmentForm";

export default function BikeRowDialog({ bike, open, setOpen }) {
	const dispatch = useDispatch();

	const orgInfo = useSelector((store) => store.orgs.info);
	const orgBikes = useSelector((store) => store.orgs.bikes);

	const option = { org_id: 0, chosen: false };

	const [orgChoice, setOrgChoice] = useState(option);

	const saveNotes = () => {
		let noteArr = bike.notes ? [...bike.notes, bikeNotes] : [bikeNotes];
		const payload = {
			id: bike.id,
			note: noteArr,
		};
		console.log("payload", payload);
		dispatch(addBikeNote(payload));
		handlePaneSwitch();
	};

	const assignControl = {
		panel: false,
		slide: false,
	};
	const changeControl = {
		panel: false,
		slide: false,
	};
	const notesControl = {
		panel: false,
		slide: false,
	};

	const [assign, setAssign] = useState(assignControl);

	const [change, setChange] = useState(changeControl);

	const [notes, setNotes] = useState(notesControl);

	const handleClose = () => {
		setOpen(false);
		setChange(changeControl);
		setNotes(notesControl);
		setAssign(assignControl);
		setOrgChoice(option);
	};

	const handlePaneSwitch = (val) => {
		function clear() {
			setChange(changeControl);
			setNotes(notesControl);
			setAssign(assignControl);
			setOrgChoice(option);
			setBikeNotes('')
		}
		clear();
		switch (val) {
			case 1:
				return setAssign((last) => ({
					...last,
					panel: true,
					slide: true,
				}));
			case 2:
				return setChange((last) => ({
					...last,
					panel: true,
					slide: true,
				}));
			case 3:
				return setNotes((last) => ({
					...last,
					panel: true,
					slide: true,
				}));
			case "clear":
				return clear();
			default:
				return;
		}
	};

	const already = () => {
		let found = false;
		for (let ride of orgBikes) {
			if (ride.bikes.id === bike.id && ride.org) {
				found = true;
			}
		}
		return found;
	};

	const isOrg = () => {
		let found = "";
		for (let ride of orgBikes) {
			if (ride.bikes.id === bike.id && ride.org) {
				found = ride.org.name;
			}
		}
		return found;
	};

	const [bikeNotes, setBikeNotes] = useState("");

	return (
		<Dialog
			open={open}
			maxWidth="lg"
			onClose={handleClose}
			fullWidth
			sx={{ height: "80%" }}
		>
			<div className={styles.dialogContainer}>
				<div className={styles.dialogTopRow}>
					<div style={{ width: "40%" }}>
						<p>What would you like to do?</p>
					</div>
					<div>
						<Button sx={{ pt: 1.25 }} onClick={handleClose}>
							X
						</Button>
					</div>
				</div>
				<div className={styles.dialogContent}>
					<div className={styles.dialogSplitCol}>
						<div className={styles.dialogContainerRight}>
							{!already() && (
								<div
									style={{
										width: "100%",
										height: "auto",
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Button
										variant="contained"
										fullWidth
										disabled={assign.slide || already()}
										onClick={() => {
											handlePaneSwitch(1);
										}}
										sx={{ pt: 1.25 }}
									>
										Assign this bike to an organization
									</Button>
								</div>
							)}

							<div
								style={{
									width: "100%",
									height: "auto",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button
									variant="contained"
									fullWidth
									disabled={change.slide}
									onClick={() => {
										handlePaneSwitch(2);
									}}
									sx={{ pt: 1.25 }}
								>
									Change which organization should have this
									bike
								</Button>
							</div>

							<div
								style={{
									width: "100%",
									height: "auto",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button
									variant="contained"
									fullWidth
									disabled={notes.slide}
									onClick={() => {
										handlePaneSwitch(3);
									}}
									sx={{ pt: 1.25 }}
								>
									View and add notes
								</Button>
							</div>
						</div>
						{/* --------------------------------- -------------------------------------------- */}
						<div
							style={{
								width: ".1%",
								height: "400px",
								backgroundColor: "lightgrey",
								margin: "1rem",
							}}
						></div>
						<div className={styles.dialogContainerRight}>
							{!assign.slide && !change.slide && !notes.slide && (
								<Slide
									in={
										!assign.slide &&
										!change.slide &&
										!notes.slide
									}
									direction="right"
									mountOnEnter
									// unmountOnExit
								>
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									></div>
								</Slide>
							)}
							{assign.slide && !change.slide && !notes.slide && (
								<Slide
									in={
										assign.slide &&
										!change.slide &&
										!notes.slide
									}
									direction="right"
									mountOnEnter
									unmountOnExit
								>
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<h4>
											Which organization should this bike
											be assigned to?{" "}
										</h4>
										<FormGroup
											sx={{
												width: "100%",
												my: 4,
											}}
										>
											{orgInfo.map((org) => (
												<OrgAssignmentForm
													key={org.id}
													org={org}
													bike={bike}
													orgChoice={orgChoice}
													setOrgChoice={setOrgChoice}
													handlePaneSwitch={
														handlePaneSwitch
													}
													isOrg={isOrg}
												/>
											))}
										</FormGroup>
									</div>
								</Slide>
							)}
							{change.slide && !assign.slide && !notes.slide && (
								<Slide
									in={
										change.slide &&
										!assign.slide &&
										!notes.slide
									}
									direction="right"
									mountOnEnter
									unmountOnExit
								>
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<h4>
											Which organization should this bike
											be reassigned to?
										</h4>
										<FormGroup
											sx={{
												width: "100%",
												my: 4,
											}}
										>
											{orgInfo.map((org) => (
												<OrgAssignmentForm
													key={org.id}
													org={org}
													bike={bike}
													orgChoice={orgChoice}
													setOrgChoice={setOrgChoice}
													handlePaneSwitch={
														handlePaneSwitch
													}
													isOrg={isOrg}
												/>
											))}
										</FormGroup>
									</div>
								</Slide>
							)}

							{notes.slide && !assign.slide && !change.slide && (
								<Slide
									in={
										notes.slide &&
										!assign.slide &&
										!change.slide
									}
									direction="right"
									mountOnEnter
									unmountOnExit
								>
									<div
										style={{
											width: "100%",
											height: "50%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-between",
											alignItems: "flex-end",
										}}
									>
										<div
											style={{
												width: "100%",
												maxHeight: "200px",
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												alignItems: "flex-start",
												marginBottom: "1rem",
												padding: ".5rem",
											}}
										>
											<h4>Notes</h4>
											{bike.notes ? (
												<ul
													style={{
														height: "100%",
														width: "100%",
														marginTop: ".5rem",
														marginBottom: ".5rem",
														padding: "1.5rem",
														overflowY: "scroll",
														scrollbarWidth: "thin",
														scrollbarColor:
															"#1269A9 transparent",
														border: "1px solid lightgrey",
														borderRadius: "8px",
													}}
												>
													{bike.notes.map(
														(note, i) => (
															<li
																style={{
																	marginBottom:
																		".25rem",
																}}
																key={i}
															>
																{note}
															</li>
														)
													)}
												</ul>
											) : (
												<div
													style={{
														height: "100%",
														width: "100%",
														marginTop: ".5rem",
														marginBottom: ".5rem",
														padding: "1.5rem",
													}}
												>
													<p>No notes yet</p>
												</div>
											)}
										</div>
										<TextField
										autoFocus={true}
											multiline
											minRows={3}
											label="Add a new note"
											value={bikeNotes}
											onChange={(e) => {
												setBikeNotes(e.target.value);
											}}
											sx={{
												width: "100%",
												mb: 1,
											}}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<Button
										disabled={bikeNotes===''}
											variant="outlined"
											sx={{ pt: 1.25 }}
											onClick={saveNotes}
										>
											add to notes
										</Button>
									</div>
								</Slide>
							)}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
