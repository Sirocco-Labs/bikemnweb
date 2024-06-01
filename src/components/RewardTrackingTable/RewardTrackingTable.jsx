import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import RewardTrackingRow from "../RewardTrackingRow/RewardTrackingRow";


export default function RewardTrackingTable({ trackingList }) {
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getRewardTrackingStatus());
	// }, [dispatch]);
	return (
		<TableContainer component={Paper} sx={{width:'100%', my:3}}>
			<Table
				// sx={{ width: '50%' }}
				size="small"
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Challenge</TableCell>
						<TableCell align="right">Winner</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Contacted</TableCell>
						<TableCell align="right">Claimed</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{trackingList.map((record) => (
						<RewardTrackingRow key={record.id} record={record} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
