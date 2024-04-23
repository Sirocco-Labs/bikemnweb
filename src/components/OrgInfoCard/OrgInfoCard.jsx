"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";



export default function OrgInfoCard({ org, orgBikes }) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		maxWidth: 950,
		p: 1.75,
		mx: 2,
        bgcolor:'transparent'
	};

	const contentStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
        maxWidth:950,
        p:0

	};


	return (
		<Card sx={containerStyle} elevation={4}>
			<Grid container spacing={1} sx={{ p: 0.5 }}>
				<Grid item xs={8}>
					<Typography variant="h4">{org.name}</Typography>
				</Grid>
				<Grid item xs={4} >
					<Typography variant="body1" align="right">
						Total bikes: {org.bikes_issued_total}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						<Typography variant="body2">
							{org.street_address}
						</Typography>
						<Typography variant="body2">{`${org.city}, ${org.state} ${org.zip}`}</Typography>
					</Typography>
				</Grid>
			</Grid>

			<CardContent sx={contentStyle}>
				<CardActionArea
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center",
						p: 0,
					}}
					onClick={() => setOpen(!open)}
					disableRipple
				>
					<IconButton disableRipple>
						<Typography variant="caption">Bike details</Typography>
						<ExpandMoreIcon
							sx={open ? { transform: "rotate(180deg)" } : {}}
						/>
					</IconButton>
				</CardActionArea>

				{/* <OrgCardBikeItem
					orgBikes={orgBikes}
					org={org}
					open={open}
					handleClose={handleClose}
				/> */}
			</CardContent>
		</Card>
	);
}
