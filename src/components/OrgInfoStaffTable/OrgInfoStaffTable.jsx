import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


export default function OrgInfoStaffTable({ orgStaff, org }) {
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

					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell align="left">Last Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orgStaff
							.filter((rider) => rider.org?.id === org.id)
							.map((staff, i) => (
								<TableRow key={i}>
									<TableCell>{staff.first_name}</TableCell>
									<TableCell align="left">
										{staff.last_name}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>


		</>
	);
}