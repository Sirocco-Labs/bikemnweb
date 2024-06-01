import Button from "@mui/material/Button";

export default function NotifyWinner({ winner }) {
	return (
		<div>
			<p>
				{winner.first_name} {winner.last_name}
			</p>
			<p>{winner.email}</p>
			<Button
				variant="outlined"
				onClick={() => {}}
				sx={{ pt: 1.25, my: 2 }}
			>
				Notify rewardee
			</Button>
		</div>
	);
}
