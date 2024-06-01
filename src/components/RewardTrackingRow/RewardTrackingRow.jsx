import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { markRewardComplete } from "@/redux/thunks/rewardThunk";

export default function RewardTrackingRow({ record }) {
	const dispatch = useDispatch();
	const {
		challenge_info,
		date_claimed,
		id,
		reward_claimed,
		user_challenge_progress,
		user_info,
		user_was_notified,
	} = record;
	const { incentive_info } = challenge_info;
	const challenge_id = challenge_info.id;
	const { title, description } = incentive_info;
	const tracking_id = user_challenge_progress.id;
	const { email, first_name, last_name, username, user_id } = user_info;
	const users_table_id = user_info.id;

	const closeOutReward = () => {
		let claimedDate = new Date().toLocaleString("en-US", {
			timeZone: "America/Chicago",
		});
		claimedDate = new Date(claimedDate).toISOString();
		console.log("*&DATE", claimedDate);
		const payload = { tracking_id, challenge_id, claimedDate };
		dispatch(markRewardComplete(payload));
	};

	return (
		<TableRow>
			<TableCell>{title}</TableCell>
			<TableCell align="right">
				{first_name} {last_name}
			</TableCell>
			<TableCell align="right">{email}</TableCell>
			<TableCell align="right">
				{user_was_notified ? `Notified` : `Need to notify`}
			</TableCell>
			<TableCell align="right">
				{reward_claimed ? `Claimed` : `Pending`}
			</TableCell>
			<TableCell align="right">
				{reward_claimed ? (
					`Claimed on ${date_claimed}`
				) : (
					<Button
						variant="outlined"
						sx={{ pt: 1.25 }}
						onClick={closeOutReward}
					>
						Reward was issued
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
}
