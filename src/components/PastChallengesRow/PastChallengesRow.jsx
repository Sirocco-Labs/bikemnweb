import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button"
import { useDispatch } from "react-redux";
import { reactivateIncentive } from "@/redux/thunks/incentivesThunk";


export default function PastChallengesRow({ item, action}) {
    const dispatch = useDispatch()
    const{reactivate, setReactivate} = action


	const {
		id,
		incentive_id,
		is_active,
		start_date,
		end_date,
		is_public,
		incentives,
	} = item;
	const {
		notes,
		title,
		user_id,
		category_id,
		description,
		point_value,
		incentive_categories,
	} = incentives;
	const { incentive_type, unit_of_measure } = incentive_categories;

	console.log("item", incentive_id);

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

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const handleSubmit = () =>{
        const isoStart = new Date(start)
        const isoEnd = new Date(end)
        const payload = {
			id,
			is_active: true,
			start_date: isoStart.toISOString(),
			end_date: isoEnd.toISOString(),
		};

        dispatch(reactivateIncentive(payload))
    }

	return (
		<TableRow>
			<TableCell>{title}</TableCell>
			<TableCell>{description}</TableCell>
			<TableCell>
				{point_value} {unit_of_measure}
			</TableCell>
			<TableCell>{incentive_type}</TableCell>
			{reactivate && (
				<TableCell>
					<TextField
						type="date"
						value={start}
						inputProps={{
							style: { alignItems: "center", padding: ".6rem" }, // Set the desired height
						}}
						onChange={(e) => {
							setStart(e.target.value);
						}}
					/>
				</TableCell>
			)}
			{reactivate && (
				<TableCell>
					<TextField
						type="date"
						value={end}
						inputProps={{
							style: { alignItems: "center", padding: ".6rem" }, // Set the desired height
						}}
						onChange={(e) => {
							setEnd(e.target.value);
						}}
					/>
				</TableCell>
			)}

			{reactivate ? (
				<TableCell align="center" sx={{ mr: 0.5 }}>
					<Button
						disabled={(!start || !end)}
						variant="contained"
						sx={{ mr: 0.5 }}
						onClick={handleSubmit}
					>
						Submit
					</Button>
					<Button
						variant="outlined"
						sx={{ mx: 1 }}
						onClick={() => {
							setReactivate(!reactivate);
                            setStart('')
                            setEnd('')
						}}
					>
						cancel
					</Button>
				</TableCell>
			) : (
				<TableCell align="center" sx={{ mr: 0.5 }}>
					<Button
						variant="contained"
						sx={{ mr: 0.5 }}
						onClick={() => {
							setReactivate(!reactivate);
						}}
					>
						Reactivate
					</Button>
				</TableCell>
			)}
		</TableRow>
	);
}
