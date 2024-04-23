import styles from "../../app/page.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function RiderStatsDetails({ details }) {
	const { stats, challenges } = details;
	console.log('details stats', stats);
	console.log('details challenges', challenges);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "flex-start",
				width: "100%",
				height: "100%",
			}}
		>
			<Typography variant="h6" mb>Stats</Typography>
			<Grid container spacing={2}>
				{stats.map((stat, i) => (
					<Grid item xs={12} key={i}>
						<Grid container spacing={1}>
							<Grid item xs={3}>
								<Typography variant="body1">
									Total Rides:{" "}
									{stat.rides_total}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="body1">
									Total Miles:{" "}
									{parseFloat(stat.miles_total).toFixed(2)} mi
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="body1">
									Total Work Commutes:{" "}
									{stat.commute_rides_total}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="body1">
									Miles Commuting to Work:{" "}
									{parseFloat(
										stat.commute_miles_total
									).toFixed(2)}{" "}
									mi
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
