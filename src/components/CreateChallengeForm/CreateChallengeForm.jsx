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

import { addNewIncentive } from "@/redux/thunks/incentivesThunk";

export default function CreateChallengeForm() {
	const dispatch = useDispatch();
	const categories = useSelector((store) => store.incentives.categories);
	const [options, setOptions] = useState(categories);
	const user = useSelector((store) => store.user);

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
	};

	const [form, setForm] = useState(challengeData);
	// useEffect(() => {
	// 	console.log(form);
	// }, [form]);

	const [unit, setUnit] = useState("units");

	const handleSubmit = async () => {
        console.log('handleSubmit', form);
        try {
			const start = await convertToISO(form.start_date);
			const end = await convertToISO(form.end_date);
			if (start && end) {
                const payload = {...form}
                payload.start_date = start
                payload.end_date = end
                console.log('handleSubmit payload',payload);
                dispatch(addNewIncentive(payload))
                setForm(challengeData);
                setUnit('units');
			} else {
                throw error
			}
		} catch (error) {
            setForm(challengeData);
            console.log("PREP SUBMIT ERROR", error);
		}

		// dispatch(addNewIncentive(form))

	};

	const filterChoices = (unit) => {
		setOptions(
			categories.filter((object) => object.unit_of_measure === unit)
		);
	};

	const convertToISO = async (date) => {
		const iso = new Date(date).toISOString();
		console.log("ISO", iso);
		return iso;
	};

	const validateForm = () => {
		const moveOn = Object.values(form).every(
			(value) => value !== undefined && value !== null && value !== ""
		);

		return !moveOn;
	};

	return (
		<div
		style={{width:'75%'}}
		>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid container spacing={4}>
						<Grid item xs={6}>
							<p></p>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<FormControlLabel
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

					<FormControl
						required
						variant="standard"
						fullWidth
						sx={{ my: 1 }}
					>
						<FormLabel htmlFor="challenge-title" sx={{ mb: 1 }}>
							1. Give this challenge a fun title (no pressure)
						</FormLabel>
						<TextField
							fullWidth
							sx={{ width: "100%" }}
							id="challenge-title"
							value={form.title}
							onChange={(e) =>
								setForm({ ...form, title: e.target.value })
							}
						/>
					</FormControl>

					<FormControl required fullWidth sx={{ my: 1 }}>
						<FormLabel id="radio-buttons">
							{`2. How will you use to measure this challenge's goal?`}
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
					<FormControl
						required
						variant="standard"
						fullWidth
						sx={{ my: 2 }}
					>
						<FormLabel htmlFor="challenge-unit" sx={{ mb: 1 }}>
							{`4. How many ${unit} to reach the goal?`}
						</FormLabel>
						<TextField
							disabled={form.category_id === ""}
							type="number"
							sx={{ width: "100%" }}
							id="challenge-unit"
							value={form.unit}
							onChange={(e) =>
								setForm({
									...form,
									point_value: e.target.value,
								})
							}
						/>
					</FormControl>

					<FormControl
						required
						variant="standard"
						fullWidth
						sx={{ mt: 1.5 }}
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
							minRows={4}
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
					<Grid container spacing={4}>
						<Grid item xs={6}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel
									htmlFor="challenge-start-date"
									sx={{ mb: 1 }}
								>
									6. Challenge Start Date
								</FormLabel>
								<TextField
									id="challenge-start-date"
									aria-label="Date"
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
						<Grid item xs={6}>
							<FormControl
								required
								variant="standard"
								fullWidth
								sx={{ my: 1 }}
							>
								<FormLabel
									htmlFor="challenge-end-date"
									sx={{ mb: 1 }}
								>
									7. Challenge End Date
								</FormLabel>
								<TextField
									id="challenge-end-date"
									aria-label="Date"
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

					<Button
						disabled={validateForm()}
						variant="contained"
						fullWidth
						sx={{ mt: 2, p: 1.75 }}
						onClick={handleSubmit}
					>
						Activate Challenge
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Card
						sx={{
							mb: 3,
							p: 2,
							width: "100%",
						}}
						elevation={8}
					>
						<Grid container spacing={2}>
							<Grid item xs={7}>
								<Typography>
									{form.title ? `Preview:` : `Example: `}
								</Typography>
							</Grid>
							<Grid item xs={5}>
								<Typography variant="caption">
									{form.is_public
										? `*This challenge is for all app users*`
										: `*This is a staff only challenge*`}{" "}
								</Typography>
							</Grid>
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
								<Typography sx={{ mb: 1 }} variant="subtitle1">
									{form.description
										? form.description
										: "Reduce your car/transit usage for running errands by biking instead!"}
								</Typography>

								<Typography variant="subtitle2">
									{form.point_value
										? `
                                    ${
										unit == "miles"
											? `You'll to ride`
											: `You'll need`
									} ${
												form.point_value
													? form.point_value
													: "X"
										  }
                                        ${unit} to complete this challenge!`
										: `You'll need X rides to complete this challenge!`}
								</Typography>
								<Typography variant="caption">
									{form.end_date
										? `
                            This challenge ends at 11:59pm on ${new Date(
								form.end_date
							).toDateString()}
                                `
										: `This challenge ends at 11:59pm on Mon. Day Year `}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>

			{/* <FormControl variant="standard">
				<InputLabel htmlFor="challenge-type">
                What kind of Challenge is this?
				</InputLabel>
				<TextField
                id="challenge-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
				/>
			</FormControl> */}

			{/* <Select

/> */}
		</div>
	);
}
