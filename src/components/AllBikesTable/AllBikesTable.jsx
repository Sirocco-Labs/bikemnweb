"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AllBikesRow from "@/components/AllBikesRow/AllBikesRow";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AllBikesTable({ allBikes }) {
	const tableStyle = {
		maxHeight: 500,
		overflowY: "scroll",
		width: "100%",
		//   border: '1px solid lightgrey',
		scrollbarColor: "var(--bike-blue) transparent",
		bgcolor:'var(--bike-white)'
	};

	return (
		<TableContainer component={Paper} sx={tableStyle} elevation={2}>
			<Table
				size="small"
				aria-label="a dense table"
				stickyHeader
				sx={{ bgcolor: "var(--bike-white)" }}
			>
				<TableHead>
					<TableRow>
						<TableCell

						sx={{ bgcolor: "var(--bike-white)" }}

						>
							Nickname
						</TableCell>
						<TableCell
							sx={{ bgcolor: "var(--bike-white)" }}
							align="right"
						>
							Make
						</TableCell>
						<TableCell
						sx={{bgcolor: "var(--bike-white)" }}
						align="right">Color</TableCell>
						<TableCell
						sx={{bgcolor: "var(--bike-white)" }}
						align="right">Serial Number</TableCell>
						<TableCell
						sx={{bgcolor: "var(--bike-white)" }}
						align="right">Organization</TableCell>
						<TableCell
						sx={{bgcolor: "var(--bike-white)" }}
						align="right"> </TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allBikes.map((bike) => (
						<AllBikesRow key={bike.id} bike={bike} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
