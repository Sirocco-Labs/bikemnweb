import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";

export default function ActiveChallengesRow({ item }) {
	const { id, incentive_id, is_active, start_date, end_date, is_public, incentives } =
		item;
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

    const formatTime = (date) =>{
        let better = new Date(date)
        let options = {
			weekday: "short", // Abbreviated weekday (e.g., Thu)
			month: "short", // Abbreviated month (e.g., Apr)
			day: "numeric", // Day of the month (e.g., 26)
			year: "numeric", // Full year (e.g., 2024)
			timeZone: "America/Chicago", // CST timezone
		};

        // return `${better.toDateString()}`
        return `${better.toLocaleString('en-US', options)}`
        // return `${better.toUTCString()}`
        // return `${better.getDay()} ${better.getMonth()} ${better.getDate()}, ${better.getFullYear()}`

    }

	return (
		<TableRow>
			<TableCell>{title}</TableCell>
			<TableCell>{description}</TableCell>
			<TableCell>
				{point_value} {unit_of_measure}
			</TableCell>
			<TableCell>{incentive_type}</TableCell>
			<TableCell>{formatTime(start_date)}</TableCell>
			<TableCell>
				{formatTime(end_date)} {` (11:59pm)`}
			</TableCell>
			<TableCell>
				<button>do stuff</button>
			</TableCell>
		</TableRow>
	);
}
