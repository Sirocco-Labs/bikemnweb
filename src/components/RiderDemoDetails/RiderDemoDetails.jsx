import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function RiderDemoDetails({ rider }) {
	const { screening, demographics, addresses, stats, challenges } = rider;

	const [deets, setDeets] = useState([
		{
			...demographics[0],
			home: { ...addresses[0] },
			work: { ...addresses[1] },
		},
	]);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 750 }}
				size="small"
				aria-label="simple table"
			>
				<TableHead>
					<TableRow
						sx={{
							"& > th, span": {
								bgcolor: "var(--bike-blue)",
								color: "var(--bike-white)",
								letterSpacing: ".065rem",
							},
						}}
					>
						<TableCell align="center" colSpan={8}>
							<Typography variant="h7">
								Demographic Info
							</Typography>
						</TableCell>
						<TableCell align="center" colSpan={3}>
							<Typography variant="h7">Home Address</Typography>
						</TableCell>
						<TableCell align="center" colSpan={3}>
							<Typography variant="h7">Work Address</Typography>
						</TableCell>
					</TableRow>
					<TableRow
						sx={{
							"& th:nth-child(5), & th:nth-child(8)": {
								borderRight: "1px solid lightgrey",
							},
						}}
					>
						<TableCell>Age</TableCell>
						<TableCell align="left">Gender</TableCell>
						<TableCell align="left" colSpan={4}>
							Race
						</TableCell>
						<TableCell align="left">Income</TableCell>
						<TableCell align="left">Zip</TableCell>
						<TableCell align="left">City</TableCell>
						<TableCell align="left">State</TableCell>
						<TableCell align="left">Zip</TableCell>
						<TableCell align="left">City</TableCell>
						<TableCell align="left">State</TableCell>
						<TableCell align="left">Zip</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{deets.map((demo, i) => (
						<TableRow
							key={demo.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
								"& td:nth-child(5), & td:nth-child(8)": {
									borderRight: "1px solid lightgrey",
								},
							}}
						>
							<TableCell scope="row">{demo.age}</TableCell>
							<TableCell align="left">
								{demo.gender_identity}
							</TableCell>
							<TableCell align="left" colSpan={4} sx={{}}>
								{demo.race}
							</TableCell>
							<TableCell align="left">
								{demo.income_level.income}
							</TableCell>
							<TableCell align="left">{demo.zip_code}</TableCell>
							<TableCell align="left">{demo.home.city}</TableCell>
							<TableCell align="left">
								{demo.home.state}
							</TableCell>
							<TableCell align="left">{demo.home.zip}</TableCell>
							<TableCell align="left">{demo.work.city}</TableCell>
							<TableCell align="left">
								{demo.work.state}
							</TableCell>
							<TableCell align="left">{demo.work.zip}</TableCell>
						</TableRow>
					))}
					<TableRow
						sx={{
							"& > td, span": {
								bgcolor: "var(--bike-blue)",
								color: "var(--bike-white)",
								letterSpacing: ".065rem",
							},
						}}
					>
						<TableCell align="center" colSpan={16}>
							<Typography variant="h7">
								Initial Screening
							</Typography>
						</TableCell>
					</TableRow>
					{screening.map((info, i) => (
						<>
							<TableRow key={i}>
								<TableCell align="left" colSpan={4}>
									Bike confidence/knowledge
								</TableCell>
								<TableCell align="left" colSpan={4}>
									How often do you commute to work?
								</TableCell>
								<TableCell align="left" colSpan={6}>
									How did you find out about this app?
								</TableCell>
							</TableRow>
							<TableRow key={i}>
								<TableCell align="left" colSpan={4}>
									{`${info.bike_confidence}/10`}
								</TableCell>
								<TableCell align="left" colSpan={4}>
									{`${info.commute_frequency_categories.reported_answer}`}
								</TableCell>
								<TableCell align="left" colSpan={6}>
									{`${info.discovery_categories.name}`}
								</TableCell>
							</TableRow>
						</>
					))}
					<TableRow
						sx={{
							"& > td, span": {
								bgcolor: "var(--bike-blue)",
								color: "var(--bike-white)",
								letterSpacing: ".065rem",
							},
						}}
					>
						<TableCell align="center" colSpan={16}>
							<Typography variant="h7">Ride Stats</Typography>
						</TableCell>
					</TableRow>
					<>
						<TableRow>
							<TableCell align="left" colSpan={3}>
								Total Rides
							</TableCell>
							<TableCell align="left" colSpan={3}>
								Total Miles
							</TableCell>
							<TableCell align="left" colSpan={3}>
								Total Work Commutes
							</TableCell>
							<TableCell align="left" colSpan={5}>
								Total Miles Commuting to Work
							</TableCell>
						</TableRow>
					</>
					{stats.map((stat, i) => (
						<>
							<TableRow key={i}>
								<TableCell align="left" colSpan={3}>
									{`${stat.rides_total}`}
								</TableCell>
								<TableCell align="left" colSpan={3}>
									{`${parseFloat(stat.miles_total).toFixed(
										2
									)} mi`}
								</TableCell>
								<TableCell align="left" colSpan={3}>
									{`${stat.commute_rides_total}`}
								</TableCell>
								<TableCell align="left" colSpan={5}>
									{`${parseFloat(
										stat.commute_miles_total
									).toFixed(2)} mi`}
								</TableCell>
							</TableRow>
						</>
					))}
					<TableRow
						sx={{
							"& > td, span": {
								bgcolor: "var(--bike-blue)",
								color: "var(--bike-white)",
								letterSpacing: ".065rem",
							},
						}}
					>
						<TableCell align="center" colSpan={16}>
							<Typography variant="h7">
								Challenge History
							</Typography>
						</TableCell>
					</TableRow>
					<>
						<TableRow>
							<TableCell align="left" colSpan={1}>
								Status
							</TableCell>
							<TableCell align="left" colSpan={3}>
								Title
							</TableCell>
							<TableCell align="left" colSpan={3}>
								Description
							</TableCell>
							<TableCell align="left" colSpan={1}>
								Goal
							</TableCell>
							<TableCell align="left" colSpan={1}>
								Points Earned
							</TableCell>
							<TableCell align="left" colSpan={1}>
								Progress
							</TableCell>
							<TableCell align="left" colSpan={1}>
								Completed
							</TableCell>
							<TableCell align="left" colSpan={2}>
								Date Completed
							</TableCell>
							<TableCell align="left" colSpan={1}>
								Received Reward
							</TableCell>
						</TableRow>
					</>
					{challenges.map((chal, i) => (
						<>
							<TableRow key={chal.id}>
								<TableCell align="left" colSpan={1}>
									{chal.data.is_active ? `Active` : `Ended`}
								</TableCell>
								<TableCell align="left" colSpan={3}>
									{chal.data.details.title}
								</TableCell>
								<TableCell align="left" colSpan={3}>
									{chal.data.details.description}
								</TableCell>
								<TableCell align="left" colSpan={1}>
									{chal.incentive_goal_value}{" "}
									{chal.data.details.category.unit_of_measure}
								</TableCell>

								<TableCell align="left" colSpan={1}>
									{chal.earned_points_toward_goal}{" "}
									{chal.data.details.category.unit_of_measure}
								</TableCell>
								<TableCell align="left" colSpan={1}>
									{chal.completion_progress}
								</TableCell>
								<TableCell align="left" colSpan={1}>
									{chal.has_been_met ? `✅` : `❌`}
								</TableCell>
								<TableCell align="left" colSpan={2}>
									{chal.has_been_met
										? chal.date_completed
										: ``}
								</TableCell>
								<TableCell align="left" colSpan={1}>
									{chal.is_rewarded ? `🏆` : `❌`}
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}


/*
 challenges:(
    id,
    active_incentive_id,
    user_id,
    incentive_goal_value,
    earned_points_toward_goal,
    completion_progress,
    has_been_met,
    date_completed,
	is_rewarded,

challenges.data:(
    incentive_id,
    is_active,
	is_public,
    start_date,
    end_date,
    created_at,
    promo_video,
    reward_photo,
    reward_description,

chal.data.details:(
    title,
    description,
    point_value,

chal.data.details.category:(
    incentive_type,
    unit_of_measure


 */