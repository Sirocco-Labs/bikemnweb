"use client";

import styles from "../../app/page.module.css";
import React, { useEffect, useState, useRef } from "react";
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
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Skeleton from "@mui/material/Skeleton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { addNewIncentive } from "@/redux/thunks/incentivesThunk";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function CreateChallengeForm() {
	const dispatch = useDispatch();
	const categories = useSelector((store) => store.incentives.categories);
	const media = useSelector((store) => store.media);
	const [options, setOptions] = useState(categories);
	const user = useSelector((store) => store.user);
	const [video, setVideo] = useState("");
	const [videoPreview, setVideoPreview] = useState(null);
	const [picture, setPicture] = useState(null);
	const [picturePreview, setPicturePreview] = useState(null);
	const hiddenVideo = useRef(null);
	const hiddenPhoto = useRef(null);

	const challengeData = {
		type: "",
		title: "",
		description: "",
		category_id: "",
		point_value: "",
		start_date: "",
		end_date: "",
		is_public: true,
		user_id: user.user_id,
		reward_description: "",
	};

	const [form, setForm] = useState(challengeData);
	useEffect(() => {
		console.log("form", form);
	}, [form]);
	// useEffect(() => {
	// 	console.log("**video", video);
	// }, [video]);

	const [unit, setUnit] = useState("units");
	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		console.log("handleSubmit", form);
		try {
			const start = await convertToISO(form.start_date);
			const end = await convertEndDateToISO(form.end_date);
			if (start && end) {
				const payload = { ...form };
				payload.start_date = start;
				payload.end_date = end;
				if (!payload.promo_vid) {
					payload.promo_vid = null;
				}
				if (!payload.reward_pic) {
					payload.reward_pic = null;
				}
				console.log("handleSubmit payload", payload);
				dispatch(addNewIncentive(payload));
				setForm(challengeData);
				setOptions(categories);
				clearMedia();
				setUnit("units");
			} else {
				throw error;
			}
		} catch (error) {
			setForm(challengeData);
			console.log("PREP SUBMIT ERROR", error);
		}
	};

	const filterChoices = (unit) => {
		setOptions(
			categories.filter((object) => object.unit_of_measure === unit)
		);
	};

	const convertToISO = async (choice) => {
		let date = new Date(choice);
		date.setUTCHours(0, 0, 0);
		let formatted = new Date(
			date.getTime() + date.getTimezoneOffset() * 60000
		);
		let iso = formatted.toISOString();

		console.log("START", iso);
		return iso;
	};

	const convertEndDateToISO = async (choice) => {
		let date = new Date(choice);
		date.setUTCHours(23, 59, 59);
		let formatted = new Date(
			date.getTime() + date.getTimezoneOffset() * 60000
		);
		let iso = formatted.toISOString();

		console.log("END", iso);
		return iso;
	};

	const validateForm = () => {
		const moveOn = Object.values(form).every(
			(value) => value !== undefined && value !== null && value !== ""
		);

		return !moveOn;
	};

	const handleVideo = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		console.log(event.target.files[0]);
		setVideo(file);
		setForm({
			...form,
			promo_vid: file,
		});
		setVideoPreview(URL.createObjectURL(file));
	};
	const handlePicture = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		setPicture(file);
		setForm({ ...form, reward_pic: file });
		setPicturePreview(URL.createObjectURL(file));
	};
	const clearDialog = () => {
		setOpen(!open);
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
	const [now, setNow] = useState(
		new Date().toLocaleString("en-us", {
			day: "numeric",
			month: "short",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			fractionalSecondDigits: 3,
		})
	);

	return (
		<>
			<div style={{ width: "320px" }}>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography>
						{form.title ? `Preview:` : `Example: `}
					</Typography>
					<Typography variant="caption">
						{form.is_public
							? `*This challenge is for all app users*`
							: `*This is a staff only challenge*`}
					</Typography>
				</div>
				<Card
					sx={{
						mb: 3,
						p: 2,
						width: "100%",
					}}
					elevation={8}
				>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography
								sx={{
									fontWeight: "bold",
									color: "#1269A9",
								}}
								variant="h5"
							>
								{form.title
									? form.title
									: "Variety is the spice of life"}
							</Typography>
							<Typography sx={{ mb: 1 }} variant="caption">
								{form.description
									? form.description
									: "Reduce your car/transit usage for running errands by biking instead!"}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography
								sx={{
									border: "1.5px solid #F7B247",
									borderRadius: "12px",
									height: 2,
									width: 30,
									p: 0.75,
									pl: 1.5,
									pr: 2.75,
								}}
								variant="caption"
							>
								Hit the road to track rides for this challenge!
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography
								variant="subtitle2"
								align="center"
								color={"#1269A9"}
							>
								{form.point_value
									? `
                                    ${unit == "miles" ? `Ride` : `Finish`} ${
											form.point_value
												? form.point_value
												: "X"
									  }
                                        more ${unit} before:
										${new Date(form.end_date ? form.end_date : Date.now()).toLocaleString("en-US", {
											weekday: "long",
											month: "short",
											day: "numeric",
											year: "numeric",
										})} at 11:59pm!`
									: `Finish X more rides before:
									${new Date(Date.now())
										.toLocaleString("en-US", {
											weekday: "long",
											month: "short",
											day: "numeric",
											year: "numeric",
										})
										.replace(
											/,(?=\s\w+)/,
											""
										)} at 11:59pm!`}
							</Typography>
						</Grid>
					</Grid>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "flex-end",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "flex-end",
								cursor: "pointer",
							}}
							onClick={() => {
								setOpen(!open);
							}}
						>
							<p
								style={{
									marginLeft: 10,
									fontSize: ".75rem",
									color: "#1269A9",
									fontWeight: "bold",
								}}
							>
								More info
							</p>
						</div>
					</div>
				</Card>
			</div>

			<div style={{ width: "75%", display:'flex', flexDirection:'column' }}>
				{/* <Button
					onClick={() => {
						console.log("CLICKED");

						setForm((last) => ({
							...last,
							type: "Commutes to work",
							title: "Testing Content",
							description: "woof",
							category_id: 3,
							point_value: 10,
							start_date: "2024-05-06",
							end_date: "2024-05-14",
							is_public: true,
							user_id: user.user_id,
							reward_description: "woooooooooooooooooooof",
						}));
					}}
				>
					AUTOFILL
				</Button> */}

				<Grid container spacing={1}>
					<Grid item xs={12} lg={12}>
						<FormControlLabel
							labelPlacement="start"
							componentsProps={{
								typography: { fontSize: ".9rem" },
							}}
							control={
								<Checkbox
									checked={!form.is_public}
									onChange={() => {
										setForm({
											...form,
											is_public: !form.is_public,
										});
									}}
								/>
							}
							label={
								form.is_public
									? "Make this a staff only challenge"
									: "This challenge is only for staff"
							}
						/>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 2 }}>
						<FormControl
							required
							variant="standard"
							fullWidth
							sx={{ mb: 1 }}
						>
							<FormLabel htmlFor="challenge-title" sx={{ mb: 1 }}>
								1. Give this challenge a fun title (no pressure)
							</FormLabel>
							<TextField
								variant="standard"
								autoFocus={true}
								fullWidth
								sx={{ width: "100%" }}
								id="challenge-title"
								value={form.title}
								onChange={(e) =>
									setForm({ ...form, title: e.target.value })
								}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 2 }}>
						<FormControl required fullWidth sx={{ mb: 1 }}>
							<FormLabel id="radio-buttons">
								{`2. How will you measure this challenge's goal?`}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="radio-buttons-group-label"
								name="row-radio-buttons-group"
								onChange={(e) => {
									filterChoices(e.target.value);
									setUnit(e.target.value);
								}}
								// sx={{ justifyContent: "space-evenly" }}
							>
								<FormControlLabel
									value="rides"
									control={<Radio />}
									label="Rides"
								/>
								<FormControlLabel
									value="miles"
									control={<Radio />}
									label="Miles"
								/>
								{/* <FormControlLabel
							value="other"
							control={<Radio />}
							label="Other"
						/> */}
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 2 }}>
						<FormControl
							required
							variant="standard"
							fullWidth
							sx={{ mt: 2 }}
						>
							<FormLabel htmlFor="challenge-type" sx={{ my: -2 }}>
								3. What category does this challenge fall under?
							</FormLabel>
							<Select
								sx={{ width: "100%" }}
								id="challenge-type"
								value={form.type}
								onChange={(e) => {
									const cat_id =
										e.explicitOriginalTarget.attributes[
											"category"
										].value * 1;

									setForm({
										...form,
										type: e.target.value,
										category_id: cat_id,
									});
								}}
								disabled={unit === "units"}
							>
								{options.map((item) => (
									<MenuItem
										key={item.id}
										value={item.incentive_type}
										category={item.id}
									>
										{`${item.incentive_type}`}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 1 }}>
						<FormControl required variant="standard" fullWidth>
							<FormLabel htmlFor="challenge-unit" sx={{ mb: 1 }}>
								{`4. How many ${unit} to reach the goal?`}
							</FormLabel>
							<TextField
								variant="standard"
								disabled={form.category_id === ""}
								type="number"
								sx={{ width: "100%" }}
								id="challenge-unit"
								value={form.point_value}
								onChange={(e) =>
									setForm({
										...form,
										point_value: e.target.value,
									})
								}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 1 }}>
						<FormControl
							required
							variant="standard"
							fullWidth
							sx={{ mb: 1 }}
						>
							<FormLabel
								htmlFor="challenge-description"
								sx={{ mb: 1 }}
							>
								5. Describe the goal of this challenge...
							</FormLabel>
							<TextField
								disabled={form.point_value === ""}
								placeholder="Try to include verbiage that relates back to this challenge's category."
								multiline
								minRows={3}
								id="challenge-description"
								value={form.description}
								onChange={(e) =>
									setForm({
										...form,
										description: e.target.value,
									})
								}
								className={styles.customTextField}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={4} sx={{ my: 1 }}>
						<Grid container spacing={1}>
							<Grid item xs={12} sx={{ mb: 1 }}>
								<FormControl
									required
									variant="standard"
									fullWidth
								>
									<FormLabel
										htmlFor="challenge-start-date"
										sx={{ mb: 1 }}
									>
										6. Start Date
									</FormLabel>
									<TextField
										size="sm"
										id="challenge-start-date"
										aria-label="Date"
										variant="standard"
										type="date"
										value={form.start_date}
										onChange={(e) => {
											setForm({
												...form,
												start_date: e.target.value,
											});
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} sx={{ mb: 1 }}>
								<FormControl
									required
									variant="standard"
									fullWidth
								>
									<FormLabel
										htmlFor="challenge-end-date"
										sx={{ mb: 1 }}
									>
										7. End Date
									</FormLabel>
									<TextField
										size="sm"
										id="challenge-end-date"
										aria-label="Date"
										variant="standard"
										type="date"
										value={form.end_date}
										onChange={(e) => {
											setForm({
												...form,
												end_date: e.target.value,
											});
										}}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ my: 2 }}>
						<Grid item xs={12} lg={4}>
							<FormControl variant="standard" fullWidth>
								<FormLabel
									htmlFor="challenge-promo"
									sx={{
										mb: 1,
									}}
								>
									{`8. Add promo video (.mp4 only)`}
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
											fontSize: ".75rem",
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
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										Choose a video
									</Button>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} lg={4}>
							<FormControl variant="standard" fullWidth>
								<FormLabel
									htmlFor="challenge-reward-photo"
									sx={{ mb: 1 }}
								>
									9. Add photo of reward
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
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										choose different photo
									</Button>
								) : (
									<Button
										variant="outlined"
										startIcon={<AddPhotoAlternateIcon />}
										onClick={() => {
											hiddenPhoto.current.click();
										}}
										sx={{
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										Choose a Photo
									</Button>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} lg={4}>
							<FormControl variant="standard" fullWidth>
								<FormLabel
									htmlFor="challenge-reward-description"
									sx={{ mb: 3 }}
								>
									10. Describe the reward for this challenge
								</FormLabel>
								<TextField
									variant="standard"
									fullWidth
									sx={{ width: "100%" }}
									id="challenge-reward-description"
									value={form.reward_description}
									onChange={(e) =>
										setForm({
											...form,
											reward_description: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
					</Grid>
				</Grid>
				<Button
					disabled={validateForm()}
					size="small"
					variant="contained"
					sx={{ mt: 2, p: 1.75, alignSelf:'flex-end' }}
					onClick={handleSubmit}
				>
					Create & Activate Challenge
				</Button>
			</div>
			<Dialog open={open} onClose={clearDialog}>
				<div
					style={{
						width: "100%",
						padding: "3rem",
						justifyContent: "space-between",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						style={{
							width: "100%",
							padding: ".5rem",
							justifyContent: "space-between",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginBottom: "20px",
						}}
					>
						<Typography variant="body" mb>
							Promotional Video
						</Typography>

						{videoPreview ? (
							<div
								style={{
									width: "100%",
									paddingTop: "56.25%",
									position: "relative",
								}}
							>
								<video
									controls
									alt="promo"
									src={videoPreview}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
									}}
								/>
							</div>
						) : (
							<Skeleton
								variant="rounded"
								width={310}
								height={200}
							/>
						)}
					</div>
					<div
						style={{
							width: "100%",
							padding: ".5rem",
							justifyContent: "space-between",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginBottom: "20px",
						}}
					>
						<Typography variant="body" mb>
							Reward Picture/Graphic
						</Typography>
						{picturePreview ? (
							<div
								style={{
									width: "50%",
									position: "relative",
									marginBottom: "20px",
									overflow: "hidden",
								}}
							>
								<Image
									alt="preview"
									src={picturePreview}
									layout="responsive"
									width={1}
									height={1}
									objectFit="cover"
									onError={(e) => {
										e.target.style.height = "100%";
									}}
								/>
							</div>
						) : (
							<Skeleton
								variant="rounded"
								width={150}
								height={150}
							/>
						)}

						<Typography variant="caption" mt>
							{form.reward_description}
						</Typography>
					</div>
				</div>
			</Dialog>
		</>
	);
}
