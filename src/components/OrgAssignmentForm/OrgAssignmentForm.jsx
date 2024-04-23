"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { updateBikeOrgAssignment } from "@/redux/thunks/bikeThunk";

export default function OrgAssignmentForm({
	org,
	bike,
	handlePaneSwitch,
	isOrg,
    orgChoice,
    setOrgChoice
}) {
	const dispatch = useDispatch();
	const option = {
		org_id: 0,
		chosen: false,
	};

	const updateAssignment = () => {
		const payload = {
			bike_id: bike.id,
			org_id: org.id,
		};
		dispatch(updateBikeOrgAssignment(payload));
		setOrgChoice(option);
		handlePaneSwitch();
	};

 

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div style={{ width: "50%", marginBottom: "1rem" }}>
				<FormControlLabel
					control={
						<Checkbox
							disabled={isOrg() === org.name}
							checked={orgChoice.org_id === org.id}
							value={org.id}
							onClick={(e) => {
								// console.log("box", e.target.value);
								setOrgChoice((last) => ({
									...last,
									org_id: e.target.value * 1, chosen:true
								}));
							}}
						/>
					}
					label={org.name}
				/>
			</div>
			{orgChoice.org_id === org.id && orgChoice.chosen ? (
				<Button
					variant="outlined"
					onClick={updateAssignment}
					sx={{ pt: 1.25, width: "50%" }}
				>
					Confirm Choice
				</Button>
			) : (
				<div style={{ width: "50%" }}></div>
			)}
		</div>
	);
}
