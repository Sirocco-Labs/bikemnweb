import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import RewardRecipientRow from "../RewardRecipientRow/RewardRecipientRow";

export default function RewardRecipientTable({ qualifying }) {
	return (
		<TableContainer
			sx={{ maxHeight: 200, overflowY: "auto" }}
		>
			<Table stickyHeader size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{qualifying.map((bikers) => (
						<RewardRecipientRow key={bikers.id} bikers={bikers} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
