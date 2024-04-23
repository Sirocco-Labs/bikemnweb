import { useState } from "react";
import styles from "../../app/page.module.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function RiderScreeningDetails({ screening }) {

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
			<Typography variant='h6' mb>Screening questions</Typography>
			<Typography variant='body1' fontWeight={'520'} mb={.25}>Initial screening</Typography>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					width: "100%",
					height: "100%",
					marginBottom: "1rem",
				}}
			>
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
					<i>
						<p>{`Bike confidence/knowledge:`}</p>
					</i>
					<p>{`${screening[0].bike_confidence}/10`}</p>
				</div>

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
					<i>
						<p>{`How often do you commute to work?:`}</p>
					</i>

					<p>{`${screening[0].commute_frequency_categories.reported_answer}`}</p>
				</div>

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
					<i>
						<p>{`How did you find out about this app?:`}</p>
					</i>
					<p>{`${screening[0].discovery_categories.name}`}</p>
				</div>
			</div>
		</div>
	);
}
