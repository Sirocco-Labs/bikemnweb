import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { reactivateIncentive } from "@/redux/thunks/incentivesThunk";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";

import Image from "next/image";

export default function PastChallengesRow({ item, action }) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const {
		id,
		incentive_id,
		is_active,
		start_date,
		end_date,
		is_public,
		incentives,
		promo_video,
		reward_photo,
		reward_description,
	} = item;
	const { title, description, point_value, category } = incentives;
	const { incentive_type, unit_of_measure } = category;
	const [reactivate, setReactivate] = useState(false);
	const [open, setOpen] = useState(false);

	const [video, setVideo] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [picture, setPicture] = useState(null);
	const [picturePreview, setPicturePreview] = useState(null);
	const hiddenVideo = useRef(null);
	const hiddenPhoto = useRef(null);
	const [rewardDesc, setRewardDesc] = useState(reward_description);

	const formatTime = (date) => {
		let better = new Date(date);
		let options = {
			weekday: "short", // Abbreviated weekday (e.g., Thu)
			month: "short", // Abbreviated month (e.g., Apr)
			day: "numeric", // Day of the month (e.g., 26)
			year: "numeric", // Full year (e.g., 2024)
			timeZone: "America/Chicago", // CST timezone
		};

		// return `${better.toDateString()}`
		return `${better.toLocaleString("en-US", options)}`;
		// return `${better.toUTCString()}`
		// return `${better.getDay()} ${better.getMonth()} ${better.getDate()}, ${better.getFullYear()}`
	};

	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");

	const handleSubmit = async () => {
		const isoStart = await convertToISO(start);
		const isoEnd = await convertEndDateToISO(end);
		if (isoStart && isoEnd) {
			const payload = {
				incentive_id,
				start_date: isoStart,
				end_date: isoEnd,
				is_public,
				user_id: user.user_id,
				promo_video: video ? video : promo_video,
				reward_photo: picture ? picture : reward_photo,
				reward_description: rewardDesc
					? rewardDesc
					: reward_description,
			};

			dispatch(reactivateIncentive(payload));
			handleCancel();
		}
	};

	const convertToISO = async (choice) => {
		let date = new Date(choice);
		date.setUTCHours(0, 0, 0);
		let formatted = new Date(
			date.getTime() + date.getTimezoneOffset() * 60000
		);
		let iso = formatted.toISOString();

		return iso;
	};

	const convertEndDateToISO = async (choice) => {
		let date = new Date(choice);
		date.setUTCHours(23, 59, 59);
		let formatted = new Date(
			date.getTime() + date.getTimezoneOffset() * 60000
		);
		let iso = formatted.toISOString();

		return iso;
	};

	const handleCancel = () => {
		setOpen(!open);
		setReactivate(!reactivate);
		setStart("");
		setEnd("");
	};
	const handleVideo = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		console.log(event.target.files[0]);
		setVideo(file);
		setVideoPreview(URL.createObjectURL(file));
	};
	const handlePicture = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		setPicture(file);
		setPicturePreview(URL.createObjectURL(file));
	};
	const clearMedia = () => {
		setVideo(null);
		setVideoPreview(null);
		setPicture(null);
		setPicturePreview(null);
	};
	const handleRemoveVideo = () => {
		setVideo(null);
		setVideoPreview(null);

		// Clear the input value
		hiddenVideo.current.value = "";
	};
	const handleRemovePicture = () => {
		setPicture(null);
		setPicturePreview(null);

		// Clear the input value
		hiddenPhoto.current.value = "";
	};

	const validateSubmit = () => {
		if (start && end) {
			return false;
		}
		return true;
	};

	return item ? (
		<>
			<TableRow>
				<TableCell>{title}</TableCell>
				<TableCell>{description}</TableCell>
				<TableCell>
					{point_value} {unit_of_measure}
				</TableCell>
				<TableCell>{incentive_type}</TableCell>
				<TableCell>{formatTime(start_date)}</TableCell>
				<TableCell>
					{formatTime(end_date)}
					{` (11:59pm)`}
				</TableCell>
				<TableCell align="center" sx={{ mr: 0.5 }}>
					<Button
						variant="outlined"
						sx={{ mr: 0.5, pt: 1.25 }}
						onClick={() => {
							setOpen(!open);
						}}
					>
						Reactivate
					</Button>
				</TableCell>
			</TableRow>
			<Dialog
				open={open}
				maxWidth="sm"
				// fullScreen
				fullWidth
				onClose={handleCancel}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					overflowY: "auto",
					overflowX: "hidden",
					width: "100%",
				}}
			>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "flex-start",
						overflowY: "auto",
						overflowX: "hidden",
						width: "100%",
						p: 3,
					}}
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "flex-start",
							borderBottom: "1px solid grey",
							marginBottom: "20px",
						}}
					>
						<p>
							{`
							Title:
							 ${title}`}
						</p>
						<p>
							{`
							Description:
							${description}`}
						</p>
						<p>
							{`
							Goal:
							${point_value} ${unit_of_measure}`}
						</p>
						<p style={{ marginBottom: ".75rem" }}>
							{`
							Reward description:
							${
								reward_description
									? reward_description
									: `No reward listed for this challenge`
							}`}
						</p>
					</div>
					<DialogContent
						style={{
							minHeight: "250px",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-around",
							alignItems: "center",
							overflowY: "auto",
							overflowX: "hidden",
							padding: 3,
						}}
					>
						<Grid container spacing={2} sx={{ my: 1 }}>
							<Grid item xs={12} lg={6}>
								<FormControl
									required
									variant="standard"
									fullWidth
									sx={{ mb: 1 }}
								>
									<FormLabel
										htmlFor="challenge-description"
										sx={{
											mb: 1,
											fontSize: ".75rem",
										}}
									>
										Choose a new start date
									</FormLabel>
									<TextField
										autoFocus={true}
										variant="standard"
										size="small"
										type="date"
										value={start}
										inputProps={{
											style: {
												alignItems: "center",
												justifyContent: "space-evenly",
												padding: ".6rem",
											},
										}}
										onChange={(e) => {
											setStart(e.target.value);
										}}
										sx={{
											display: "flex",
											justifyContent: "space-evenly",
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} lg={6}>
								<FormControl
									required
									variant="standard"
									fullWidth
									sx={{ mb: 1 }}
								>
									<FormLabel
										htmlFor="challenge-description"
										sx={{
											mb: 1,
											fontSize: ".75rem",
										}}
									>
										Choose a new end date
									</FormLabel>
									<TextField
										variant="standard"
										size="small"
										type="date"
										value={end}
										inputProps={{
											style: {
												alignItems: "center",
												padding: ".6rem",
											}, // Set the desired height
										}}
										onChange={(e) => {
											setEnd(e.target.value);
										}}
									/>
								</FormControl>
							</Grid>
						</Grid>

						<Grid container spacing={1} sx={{ my: 2 }}>
							<Grid item xs={12} lg={6}>
								{promo_video ? (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div
											style={{
												width: "100%",
												position: "relative",
												overflow: "hidden",
												paddingTop: "56.25%",
												marginTop: "10px",
												marginBottom: "10px",
											}}
										>
											<p
												style={{
													alignSelf: "flex-start",
													marginBottom: "-10px",
													marginTop: "10px",
												}}
											>
												Current promo video:
											</p>
											<video
												controls
												style={{
													position: "absolute",
													top: 0,
													left: 0,
													width: "100%",
													height: "100%",
													objectFit: "cover",
												}}
											>
												<source
													alt="promotional video"
													src={promo_video}
												/>
											</video>
										</div>
									</div>
								) : (
									<></>
								)}
								<FormControl variant="standard" fullWidth>
									<FormLabel
										htmlFor="challenge-promo"
										sx={{
											mb: 1,
											fontSize: ".85rem",
										}}
									>
										{promo_video
											? `Replace current promo video with a new video (.mp4 only)`
											: `Add promo video (.mp4 only)`}
									</FormLabel>

									<input
										id="challenge-promo"
										ref={hiddenVideo}
										type="file"
										accept="video/mp4"
										style={{ display: "none" }}
										onChange={(e) => handleVideo(e)}
									/>
									{video ? (
										<Button
											variant="contained"
											color="error"
											startIcon={<CloseIcon />}
											onClick={handleRemoveVideo}
											sx={{
												fontSize: ".65rem",
												p: 2,
												alignItems: "center",
											}}
										>
											choose different video
										</Button>
									) : (
										<Button
											variant="outlined"
											startIcon={<VideoCallIcon />}
											onClick={() => {
												hiddenVideo.current.click();
											}}
											sx={{
												fontSize: ".65rem",
												p: 2,
												alignItems: "center",
											}}
										>
											{promo_video
												? `Choose replacement video`
												: `choose a video`}
										</Button>
									)}
								</FormControl>
								{video && (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<p
											style={{
												alignSelf: "flex-start",
												marginBottom: "-20px",
												marginTop: "10px",
											}}
										>
											Preview:
										</p>
										<div
											style={{
												width: "100%",
												position: "relative",
												overflow: "hidden",
												paddingTop: "56.25%",
												marginTop: "20px",
											}}
										>
											<video
												controls
												style={{
													position: "absolute",
													top: 0,
													left: 0,
													width: "100%",
													height: "100%",
													objectFit: "cover",
												}}
											>
												<source
													src={URL.createObjectURL(
														video
													)}
												/>
											</video>
										</div>
									</div>
								)}
							</Grid>

							<Grid item xs={12} lg={6}>
								{reward_photo ? (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div
											style={{
												width: "50%",
												position: "relative",
												marginBottom: "10px",
												overflow: "hidden",
												alignSelf: "center",
											}}
										>
											<p
												style={{
													alignSelf: "flex-start",
												}}
											>
												Current reward photo:
											</p>
											<Image
												src={reward_photo}
												alt="reward photo"
												layout="responsive"
												width={1}
												height={1}
												objectFit="cover"
												onError={(e) => {
													e.target.style.height =
														"100%";
												}}
											/>
										</div>
									</div>
								) : (
									<></>
								)}
								<FormControl variant="standard" fullWidth>
									<FormLabel
										htmlFor="challenge-reward-photo"
										sx={{ mb: 1, fontSize: ".85rem" }}
									>
										{reward_photo
											? `Replace current reward photo with a new photo`
											: `Add photo of reward`}
									</FormLabel>
									<input
										id="challenge-reward-photo"
										ref={hiddenPhoto}
										type="file"
										accept="image/*"
										style={{ display: "none" }}
										onChange={(e) => handlePicture(e)}
									/>
									{picture ? (
										<Button
											variant="contained"
											color="error"
											startIcon={<CloseIcon />}
											onClick={handleRemovePicture}
											sx={{
												fontSize: ".65rem",
												p: 2,
												alignItems: "center",
											}}
										>
											choose different photo
										</Button>
									) : (
										<Button
											variant="outlined"
											startIcon={
												<AddPhotoAlternateIcon />
											}
											onClick={() => {
												hiddenPhoto.current.click();
											}}
											sx={{
												fontSize: ".65rem",
												p: 2,
												alignItems: "center",
											}}
										>
											{promo_video
												? `Choose replacement photo`
												: `choose a photo`}
										</Button>
									)}
								</FormControl>
								{picture && (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div
											style={{
												width: "50%",
												position: "relative",
												marginTop: "10px",
												overflow: "hidden",
												alignSelf: "center",
											}}
										>
											<p
												style={{
													alignSelf: "flex-start",
												}}
											>
												Preview:
											</p>
											<Image
												src={URL.createObjectURL(
													picture
												)}
												alt="preview"
												layout="responsive"
												width={1}
												height={1}
												objectFit="cover"
												onError={(e) => {
													e.target.style.height =
														"100%";
												}}
											/>
										</div>
									</div>
								)}
							</Grid>
							<Grid item xs={12} lg={12} sx={{ mt: 3 }}>
								<FormControl
									variant="standard"
									fullWidth
									sx={{ mb: 1 }}
								>
									<FormLabel
										htmlFor="reward-description"
										sx={{
											mb: 1,
											fontSize: ".75rem",
										}}
									>
										Change/add reward description
									</FormLabel>
									<TextField
										variant="standard"
										id="reward-description"
										value={rewardDesc}
										onChange={(e) =>
											setRewardDesc(e.target.value)
										}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</DialogContent>
					<Button
						variant="contained"
						sx={{ pt: 1.25, mt: 3, alignSelf: "flex-end" }}
						disabled={validateSubmit()}
					>
						Reactivate
					</Button>
				</DialogContent>
			</Dialog>
		</>
	) : (
		<> </>
	);
}
