"use client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import NotifyWinner from "../NotifyWinner/NotifyWinner";
import {
	chooseChallengeWinner,
	markRewardComplete,
} from "@/redux/thunks/rewardThunk";
import RewardRecipientTable from "../RewardRecipientTable/RewardRecipientTable";

export default function GenerateRewardRecipients({ list }) {
	const dispatch = useDispatch();
	const { challenge_id, challenge_info, qualifying_users } = list;

	const [winner, setWinner] = useState({});
	const [notified, setNotified] = useState(false);
	const [finished, setFinished] = useState(false);

	// useEffect(()=>{

	// },[dispatch])

	const randomPicker = (userList) => {
		if (userList.length < 1) {
			console.error("NO QUALIFYING USERS");
			return null;
		}

		const randomIndex = Math.floor(Math.random() * userList.length);
		const hasWon = {
			...qualifying_users[randomIndex],
			challenge_id: challenge_id,
			challenge_info: challenge_info,
		};
		setWinner(hasWon);
	};

	const sendEmail = (winner) => {
		const email = winner.email;
		const subject = "Claim your iBikeMN Reward";
		const body = `Congrats ${winner.first_name}!\n\nYour hard work has paid off, and we're happy to announce that you've been chosen as the winner of the ${winner.challenge_info.title} challenge.\n\nTo claim your reward, please reply to this email with your upcoming availability so we can start coordinating the logistics.`;
		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;

		window.open(mailtoLink, "_blank");
		setNotified(true);
	};

	const handleConfirmation = (winner) => {
		// let claimedDate = new Date().toLocaleString("en-US", {
		// 	timeZone: "America/Chicago",
		// });
		// console.log("*&DATE", new Date(claimedDate).toISOString());
		// console.log("*&WINNER", winner);
		dispatch(chooseChallengeWinner(winner));
		setNotified(false);
		setFinished(true);
	};

	const handleFinished = () => {
		setNotified(false);
		setFinished(false);
		setWinner({});
		// dispatch()
	};
	const handleStartOver = () => {
		setNotified(false);
		setFinished(false);
		setWinner({});
	};

	return (
		<>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					// width: "50%",
				}}
			>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
                        mb:-3
					}}
				>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
						}}
					>
						<Typography>{challenge_info.title}</Typography>
						<Typography>{challenge_info.description}</Typography>
					</CardContent>
					<CardActions>
						{winner.challenge_id === challenge_id ? (
							finished ? (
								<Button
									variant="outlined"
									sx={{ pt: 1.25 }}
									onClick={handleFinished}
								>
									All done
								</Button>
							) : (
								<Button
									variant="outlined"
									sx={{ pt: 1.25 }}
									onClick={handleStartOver}
								>
									Try Again
								</Button>
							)
						) : (
							<Button
								disabled={winner.challenge_id === challenge_id}
								variant="outlined"
								sx={{ pt: 1.25 }}
								onClick={() => {
									randomPicker(qualifying_users);
								}}
							>
								Pick winner
							</Button>
						)}
					</CardActions>
				</CardContent>
				{winner.first_name ? (
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: 210,
						}}
					>
						<Typography>
							{winner.first_name} {winner.last_name}
						</Typography>
						<Typography>{winner.email}</Typography>
						<CardContent>
							<CardActions>
								{notified ? (
									<>
										<Button
											variant="contained"
											onClick={() => {
												handleConfirmation(winner);
											}}
											sx={{ pt: 1.25 }}
										>
											Confirm Email was sent
										</Button>
										<Button
											variant="outlined"
											color="error"
											onClick={() => {
												sendEmail(winner);
											}}
											sx={{
												pt: 1.25,
												mx: 2,
											}}
										>
											resend email
										</Button>
									</>
								) : (
									<Button
										variant="outlined"
										onClick={() => {
											sendEmail(winner);
										}}
										sx={{ pt: 1.25 }}
									>
										{`Notify ${winner.first_name} ${winner.last_name}`}
									</Button>
								)}
							</CardActions>
						</CardContent>
					</CardContent>
				) : (
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-around",
							alignItems: "flex-start",
							width: "75%",
							height: 210,
							// overflowY: "hidden",
                            // border:'1px solid lime'
						}}
					>
						<Typography>
							{" "}
							Qualifying Users: {`${qualifying_users.length}`}
						</Typography>
                        <RewardRecipientTable
                            qualifying={qualifying_users}
                        />
					</CardContent>
				)}
			</Card>
			{/* {winner.first_name && (
				<div>
					<p>
						{winner.first_name} {winner.last_name}
					</p>
					<p>{winner.email}</p>
					<p>{winner.challenge_id}</p>
					{notified ? (
						<>
							<Button
								variant="contained"
								onClick={() => {
									handleConfirmation(winner);
								}}
								sx={{ pt: 1.25, my: 2 }}
							>
								Confirm Email was sent
							</Button>
							<Button
								variant="outlined"
								color="error"
								onClick={() => {
									sendEmail(winner);
								}}
								sx={{ pt: 1.25, my: 2, mx: 2 }}
							>
								resend email
							</Button>
						</>
					) : (
						<Button
							variant="outlined"
							onClick={() => {
								sendEmail(winner);
							}}
							sx={{ pt: 1.25, my: 2 }}
						>
							Notify Winner
						</Button>
					)}
				</div>
			)}
			<div style={{ marginBottom: "30px" }}>
				<p>{challenge_id}</p>
				<p>{challenge_info.title}</p>
				<p>{challenge_info.description}</p>
				<p style={{ marginBottom: "10px" }}>
					{challenge_info.reward_claimed ? `Claimed` : `Not Claimed`}
				</p>
				<p style={{ marginBottom: "5px", fontWeight: "bold" }}>
					Qualifying Users
				</p>
				{qualifying_users.map((biker) => (
					<div key={biker.user_id}>
						<p>
							{`${biker.first_name} ${biker.last_name}
							     ${biker.email}`}
						</p>
					</div>
				))}
			</div>
			<div>
				{winner.challenge_id === challenge_id ? (
					finished ? (
						<Button
							variant="outlined"
							sx={{ pt: 1.25, mb: 2 }}
							onClick={handleFinished}
						>
							All done
						</Button>
					) : (
						<Button
							variant="outlined"
							sx={{ pt: 1.25, mb: 2 }}
							onClick={handleStartOver}
						>
							Try Again
						</Button>
					)
				) : (
					<Button
						disabled={winner.challenge_id === challenge_id}
						variant="outlined"
						sx={{ pt: 1.25, mb: 2 }}
						onClick={() => {
							randomPicker(qualifying_users);
						}}
					>
						Randomize winner
					</Button>
				)}
			</div> */}
		</>
	);
}
