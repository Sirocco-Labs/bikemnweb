"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";

import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

import BikeRowDialog from "../BikeRowDialog/BikeRowDialog";

import { addBikeNote } from "@/redux/thunks/bikeThunk";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { updateBikeNickname } from "@/redux/thunks/bikeThunk";
import OrgAssignmentForm from "../OrgAssignmentForm/OrgAssignmentForm";

export default function AllBikesRow({ bike }) {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const orgInfo = useSelector((store) => store.orgs.info);
	const orgBikes = useSelector((store) => store.orgs.bikes);

	const [orgChoice, setOrgChoice] = useState({
		org_id: 0,
		chosen: false,
	});

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
	};

	const handlePaneSwitch = (val) => {
		function clear() {
			setChange(changeControl);
			setNotes(notesControl);
			setAssign(assignControl);
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

	const locate = () => {
		let found = `Not assigned`;

		for (let ride of orgBikes) {
			if (ride.bikes.id === bike.id && ride.org) {
				found = `Assigned to ${ride.org.name}`;
			}
		}

		return found;
	};

	const [bikeNotes, setBikeNotes] = useState("");
	const [edit, setEdit] = useState(false);

	const [rename, setRename] = useState("");

	const handleRename = () => {
		const payload = {
			id: bike.id,
			nickname: rename,
		};
		dispatch(updateBikeNickname(payload))
		console.log(rename);
		setEdit(false);
		setRename("");
	};

	const cancelRename = () => {
		setRename("");
		setEdit(false);
	};

	return (
		<>
			<TableRow>
				<TableCell sx={{ pr: 0 }}>
					{edit ? (
						<>
							<TextField
							autoFocus={true}
								variant="standard"
								size="small"
								placeholder={`Rename ${bike.nickname}`}
								value={rename}
								onChange={(e) => {
									setRename(e.target.value);
								}}
							/>
							<IconButton
								disabled={rename === ""}
								size="small"
								sx={{
									fontSize: "1rem",
									color: "black",
									"&:hover": {
										backgroundColor: "transparent",
									},
									"&.Mui-disabled": { color: "lightgrey" },
								}}
								disableRipple
								onClick={handleRename}
							>
								<SaveIcon
									sx={rename === '' ? {mx: 1, color: "lightgrey",}:{mx: 1, color: "var(--bike-blue)",}}
								/>
							</IconButton>
							<IconButton
								size="small"
								sx={{
									fontSize: "1rem",
									color: "black",
									"&:hover": {
										backgroundColor: "transparent",
									},
								}}
								disableRipple
								onClick={cancelRename}
							>
								❌
							</IconButton>
						</>
					) : (
						<IconButton
							size="small"
							sx={{
								fontSize: "1rem",
								color: "black",
								"&:hover": {
									backgroundColor: "transparent",
								},
							}}
							disableRipple
							onClick={() => {
								setEdit(!edit);
							}}
						>
							{bike.nickname}
							<EditIcon
								sx={{ ml: 1, color: "var(--bike-orange)" }}
							/>
						</IconButton>
					)}
				</TableCell>
				<TableCell align="right">{bike.make}</TableCell>
				<TableCell align="right">{bike.color}</TableCell>
				<TableCell align="right">{bike.serial_number}</TableCell>
				<TableCell align="right">{locate()}</TableCell>
				<TableCell align="right">
					<Button
						variant="outlined"
						onClick={() => {
							setOpen(!open);
						}}
					>
						Manage
					</Button>
				</TableCell>
			</TableRow>
			<BikeRowDialog bike={bike} open={open} setOpen={setOpen} />
		</>
	);
}
