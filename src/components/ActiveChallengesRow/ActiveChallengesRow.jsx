import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";

export default function ActiveChallengesRow({ item }) {
	const {
		id,
		incentive_id,
		is_active,
		start_date,
		end_date,
		is_public,
		incentives
	} = item;
	const makeIncentives = () =>{
		const { notes, title, user_id, category_id, description, point_value } =
			incentives;

	}



	// console.log("item", item);

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
	/*{
  "id": 1,
  "start_date": "2024-04-25T00:00:00+00:00",
  "end_date": "2024-04-30T00:00:00+00:00",

  "incentives": {
    "id": 2,
    "title": "First Challenge",
    "category": {
      "incentive_type": "Replace VMT - Any",
      "unit_of_measure": "rides"
    },

	"description": "Replace 5 car rides with bike rides!",
    "point_value": 5
  }
} */

	return (
		item.incentives ?
			<TableRow>
				<TableCell>{item.incentives.title}</TableCell>
				<TableCell>{item.incentives.description}</TableCell>
				<TableCell>
					{item.incentives.point_value}{" "}
					{item.incentives.category.unit_of_measure}
				</TableCell>
				<TableCell>
					{item.incentives.category.incentive_type}
				</TableCell>
				<TableCell>{formatTime(item.start_date)}</TableCell>
				<TableCell>
					{formatTime(item.end_date)} {` (11:59pm)`}
				</TableCell>
				<TableCell>
					{/* <button>do stuff</button> */}
				</TableCell>
			</TableRow>
		:<><p>WHHHHYYYYY</p></>

	);
}
