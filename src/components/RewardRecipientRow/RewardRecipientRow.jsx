import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
export default function RewardRecipientRow({ bikers }) {
	return (
		<>
			<TableRow>
				<TableCell>
					{bikers.first_name} {bikers.last_name}{" "}
				</TableCell>
				<TableCell align="right">{bikers.email}</TableCell>
			</TableRow>
		</>
	);
}
