import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import styles from "../../app/page.module.css";

function NotesWrapper({ notes }) {
	return (
		<ul style={{ padding: "0 .5rem 0 0" }}>
			{notes.map((note, i) => (
				<li key={i} style={{ marginBottom: ".25rem", padding: ".25rem" }}>
					{note}
				</li>
			))}
		</ul>
	);
}

export default function OrgInfoBikeTable({ orgBikes, open, handleClose, org }) {
	const [show, setShow] = useState(false);

	const [notes, setNotes] = useState(["No notes"]);

	const closeDialog = () => {
		setShow(false);
	};

	const openDialog = (arr) => {
		setNotes(arr);
		setShow(true);
	};

	return (
		<>
			<TableContainer
				sx={{
					width: 600,
					overflowX: "scroll",
					pb: 2,
					scrollbarColor: "var(--bike-blue) transparent",
				}}
			>
				<Table
					size="small"
					aria-label="simple table"
					sx={{
						width: 1100,
					}}
				>
					<TableHead>
						<TableRow
							sx={{
								"& > :first-child": {
									position: "sticky",
									left: 0,
									backgroundColor: "var(--bike-white)",
									zIndex: 1,
								},
							}}
						>
							<TableCell>Nickname</TableCell>
							<TableCell align="right">Availability</TableCell>
							<TableCell align="right">Make</TableCell>
							<TableCell align="right">Color</TableCell>
							<TableCell align="right">Serial Number</TableCell>
							<TableCell align="right">Checkout Date</TableCell>
							<TableCell align="right">Return By Date</TableCell>
							<TableCell align="right">Checked out to</TableCell>
							<TableCell align="right">Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orgBikes
							.filter((ride) => ride.org.name === org.name)
							.map((bike, i) => (
								<TableRow
								key={i}
									sx={{
										"& > :first-child": {
											position: "sticky",
											left: 0,
											backgroundColor:
												"var(--bike-white)",
											zIndex: 1,
										},
									}}
								>
									<TableCell>{bike.bikes.nickname}</TableCell>
									<TableCell align="right">
										{bike.in_use ? `In use` : `Available`}
									</TableCell>
									<TableCell align="right">
										{bike.bikes.make}
									</TableCell>
									<TableCell align="right">
										{bike.bikes.color}
									</TableCell>
									<TableCell align="right">
										{bike.bikes.serial_number}
									</TableCell>
									<TableCell align="right">
										{bike.in_use &&
											new Date(
												bike.check_out_date
											).toLocaleString()}
									</TableCell>
									<TableCell align="right">
										{bike.in_use &&
											new Date(
												bike.return_by
											).toLocaleString()}
									</TableCell>
									<TableCell align="right">
										{bike.in_use &&
											`${bike.appUser.first_name}
											${bike.appUser.last_name}`}
									</TableCell>
									<TableCell align="right">
										{bike.bikes.notes && (
											<FormatListBulletedIcon
												onClick={() => {
													openDialog(
														bike.bikes.notes
													);
												}}
											/>
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog open={show} onClose={closeDialog}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: ".5rem",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								width: "100%",
								padding: ".25rem",
							}}
						>
							<h3>Notes</h3>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
								width: "100%",
							}}
						>
							<Button onClick={closeDialog}>X</Button>
						</div>
					</div>
					<div
						style={{
							maxHeight: "300px",
							overflowY: "scroll",
							scrollbarColor: "var(--bike-blue) transparent",
							scrollbarWidth: "thin",
							padding: "0.5rem 1.25rem",
							borderTop: "1px solid lightgrey",
						}}
					>
						<NotesWrapper notes={notes} />
					</div>
				</div>
			</Dialog>
		</>
	);
}
