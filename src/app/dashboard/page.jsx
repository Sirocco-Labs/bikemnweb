"use client";
import styles from "../page.module.css";
import React, { useEffect, useState, useRef } from "react";
import NavLayout from "@/components/NavLayout/NavLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/thunks/authThunk";
import { getAppUsers } from "@/redux/thunks/appUserDataThunk";

import UploadResourceContent from "@/components/UploadResourceContent/UploadResourceContent";
import { supabase } from "@/utils/supabase/supabase";
import GenerateRewardRecipients from "@/components/GenerateRewardRecipients/GenerateRewardRecipients";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
	getUsersForRewards,
	getRewardTrackingStatus,
} from "@/redux/thunks/rewardThunk";
import RewardTrackingTable from "@/components/RewardTrackingTable/RewardTrackingTable";

function Dashboard() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const appUsers = useSelector((store) => store.appUsers);
	const rewardUserList = useSelector((store) => store.reward.userList);
	const rewardTrackingStatus = useSelector(
		(store) => store.reward.trackingStatus
	);
	const [pointerId, setPointerId] = useState(null);

	const control = { media: false, reward: false };
	const [fold, setFold] = useState(control);

	useEffect(() => {
		dispatch(getAppUsers());
		dispatch(getUsersForRewards());
		dispatch(getRewardTrackingStatus());
	}, [dispatch]);

	console.log("$% STATUS", rewardTrackingStatus);

	return (
		<NavLayout>
			<section className={styles.dashboardTopRow}>
				<h1> Dashboard </h1>

				<Button
					variant="contained"
					onClick={() => {
						dispatch(logoutUser());
					}}
					sx={{ pt: 1.25 }}
				>
					Logout
				</Button>
			</section>
			<section>
				<Typography variant={'h4'}>Reward Tracking</Typography>
				<RewardTrackingTable trackingList={rewardTrackingStatus} />
			</section>
			<br />
			<section>
				<Box
					boxShadow={2}
					sx={{
						width: "100%",
						height: "100%",
						borderRadius: 1,
						bgcolor: "#fff",
						"&:hover": {
							bgcolor: "lightgrey",
							cursor: "pointer",
						},
						p: 2,
						display: "flex",
						alignItems: "center",
						my:2
					}}
					onClick={() => {
						setFold({ ...fold, reward: !fold.reward });
					}}
				>
					<ExpandMoreIcon
						sx={{
							transform: fold.reward
								? "rotate(180deg)"
								: "rotate(0deg)",
							transition: "transform 0.3s ease-in-out",
							mx: 2,
						}}
					/>
					<Typography variant="h4">{`Reward Lottery: ${rewardUserList.length}`}</Typography>
				</Box>
				<Collapse
					in={fold.reward}
					sx={{ width: "100%", borderTopColor: "grey" }}
					onMouseDown={(event) => {
						if (fold.reward && pointerId !== null) {
							event.target.setPointerCapture(pointerId);
						}
					}}
				>
					<Grid container spacing={2}>
						{rewardUserList.map((list) => (
							<Grid key={list.challenge_id} item xs={12} md={6}>
								<GenerateRewardRecipients list={list} />
							</Grid>
						))}
					</Grid>
				</Collapse>
			</section>

			<section>
				<Box
					boxShadow={2}
					sx={{
						width: "100%",
						height: "100%",
						borderRadius: 1,
						bgcolor: "#fff",
						"&:hover": {
							bgcolor: "lightgrey",
							cursor: "pointer",
						},
						p: 2,
						display: "flex",
						alignItems: "center",
						my:2
					}}
					onClick={() => {
						setFold({ ...fold, media: !fold.media });
					}}
				>
					<ExpandMoreIcon
						sx={{
							transform: fold.media
								? "rotate(180deg)"
								: "rotate(0deg)",
							transition: "transform 0.3s ease-in-out",
							mx: 2,
						}}
					/>
					<Typography variant="h4">Add Resource Media</Typography>
				</Box>
				<Collapse
					in={fold.media}
					sx={{ width: "100%", borderTopColor: "grey" }}
					onMouseDown={(event) => {
						if (fold.media && pointerId !== null) {
							event.target.setPointerCapture(pointerId);
						}
					}}
				>

				<UploadResourceContent />
				</Collapse>
			</section>
		</NavLayout>
	);
}

export default ProtectedRoute(Dashboard);
