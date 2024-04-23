import styles from "../../app/page.module.css";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import RiderDetailsDialog from "@/components/RiderDetailsDialog/RiderDetailsDialog";
import { useState } from "react";
import RiderDemoDetails from "../RiderDemoDetails/RiderDemoDetails";

export default function RiderDetailsRow({ rider }) {
	const {} = rider;
	const pStyle = {
		fontWeight: "bold",
		marginBottom: ".5rem",
		fontSize: "1rem",
	};

	const userType = (rider) => {
		if (rider.is_admin) {
			return `Admin`;
		}
		if (rider.is_employee) {
			return `Staff`;
		}
		if (rider.is_public) {
			return `Public`;
		}
	};

	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell component="th" scope="row">
					{rider.username}
				</TableCell>
				<TableCell align="right">{rider.first_name}</TableCell>
				<TableCell align="right">{rider.last_name}</TableCell>
				<TableCell align="right">{userType(rider)}</TableCell>
				<TableCell align="right">
					{rider.is_consent_to_survey ? `Yes` : `No`}
				</TableCell>
				<TableCell align="right">{rider.email}</TableCell>
				<TableCell align="right">
					<Button
						onClick={() => {
							setOpen(!open);
						}}
					>
						details
					</Button>
				</TableCell>
			</TableRow>
			<Dialog
				open={open}
				maxWidth="xl"
				onClose={() => setOpen(false)}
				fullWidth
				sx={{ display:'flex', height: "100%", padding:10 }}
			>
				<div className={styles.dialogTopRow}>
					<Button
						onClick={() => {
							setOpen(!open);
						}}
						sx={{pt:1.25}}
					>
						X
					</Button>
				</div>
				<div
				style={{padding:'.5rem'}}
				>

				<RiderDemoDetails rider={rider} />
				</div>

				{/* <div className={styles.dialogContainer}>
					<div className={styles.dialogTopRow}>
						<Button
							onClick={() => {
								setOpen(!open);
							}}
						>
							Close
						</Button>
					</div>
				</div> */}
			</Dialog>
		</>
	);
}
