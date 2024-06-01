import { supabase } from "@/utils/supabase/supabase";
import { setRewardList, setRewardTrackingStatus } from "../slices/rewardSlice";

export const getUsersForRewards = () => async (dispatch) => {
	console.log("IN REWARD THUNK ----> getUsersForRewards()");
	try {
		const rewardInfo = await supabase.rpc("get_users_for_rewards");
		if (rewardInfo.error) {
			console.error(
				"SUPABASE GET USERS FOR REWARDS ERROR!: ",
				rewardInfo.error
			);
		} else {
			console.log(
				"SUPABASE GET USERS FOR REWARDS SUCCESS!: ",
				rewardInfo.status,
				rewardInfo.data
			);
			dispatch(setRewardList(rewardInfo.data));
		}
	} catch (error) {
		console.error("REWARD THUNK ERROR --> getUsersForRewards():", error);
	}
};

export const chooseChallengeWinner = (winnerData) => async (dispatch) => {
	console.log(
		"IN REWARD THUNK ----> chooseChallengeWinner(winnerData)",
		winnerData
	);
	const {
		tracking_user_id,
		challenge_id,
		tracking_table_id,
		users_table_id,
	} = winnerData;

	const lotteryData = {
		tracking_table_id: tracking_table_id,
		active_incentive_id: challenge_id,
		users_table_id: users_table_id,
		user_was_notified: true,
	};

	try {
		const markIsRewarded = await supabase
			.from("user_incentive_tracking_junction")
			.update({ is_rewarded: true })
			.eq("id", tracking_table_id)
			.select()
			.single();
		if (markIsRewarded.error) {
			console.error(
				"SUPABASE MARK USER IS REWARDED ERROR!: ",
				markIsRewarded.error
			);
		} else {
			console.log(
				"SUPABASE MARK USER IS REWARDED SUCCESS!: ",
				markIsRewarded.status,
				markIsRewarded.data
			);
			const pickWinner = await supabase
				.from("reward_lottery_junction")
				.insert(lotteryData)
				.select()
				.single();
			if (pickWinner.error) {
				console.error(
					"SUPABASE ADD USER TO REWARD TABLE ERROR!: ",
					pickWinner.error
				);
			} else {
				console.log(
					"SUPABASE ADD USER TO REWARD TABLE SUCCESS!: ",
					pickWinner.status,
					pickWinner.data
				);
				const assignWinner = await supabase
					.from("activated_incentives_junction")
					.update({ reward_recipient_id: users_table_id })
					.eq("id", challenge_id)
					.select()
					.single();
				if (assignWinner.error) {
					console.error(
						"SUPABASE ASSIGN REWARD RECIPIENT ERROR!: ",
						assignWinner.error
					);
				} else {
					console.log(
						"SUPABASE ASSIGN REWARD RECIPIENT SUCCESS!: ",
						assignWinner.status,
						assignWinner.data
					);
					dispatch(getRewardTrackingStatus());
				}
			}
		}
	} catch (error) {
		console.error(
			"REWARD THUNK ERROR --> chooseChallengeWinner(winnerData):",
			error
		);
	}
};

export const getRewardTrackingStatus = () => async (dispatch) => {
	console.log("IN REWARD THUNK ----> getRewardTrackingStatus()");

	try {
		const rewardTracking = await supabase
			.from("reward_lottery_junction")
			.select(
				`
            id,
            user_info:users_table_id(
                id,
                user_id,
                username,
                first_name,
                last_name,
                is_public,
                org_id,
                email
            ),
            user_challenge_progress:tracking_table_id(
                id
            ),
            challenge_info:active_incentive_id(
                id,
                incentive_info:incentive_id(
                    title,
                    description
                )
            ),
            user_was_notified,
            reward_claimed,
            date_claimed
            `
			)
			.order("id", { ascending: false });
		if (rewardTracking.error) {
			console.error(
				"SUPABASE GET REWARD TRACKING DATA ERROR!: ",
				rewardTracking.error
			);
		} else {
			console.log(
				"SUPABASE GET REWARD TRACKING DATA SUCCESS!: ",
				rewardTracking.status,
				rewardTracking.data
			);
			dispatch(setRewardTrackingStatus(rewardTracking.data));
		}
	} catch (error) {
		console.error(
			"REWARD THUNK ERROR --> getRewardTrackingStatus():",
			error
		);
	}
};

export const markRewardComplete = (rewardData) => async (dispatch) => {
	console.log(
		"IN REWARD THUNK ----> markRewardComplete(rewardData)",
		rewardData
	);
	const { dateClaimed, challenge_id, tracking_id } = rewardData;

	try {
		const completedActive = await supabase
			.from("activated_incentives_junction")
			.update({ reward_claimed: true })
			.eq("id", challenge_id)
			.select()
			.single();
		if (completedActive.error) {
			console.error(
				"SUPABASE MARK ACTIVE INCENTIVE REWARD COMPLETE ERROR!: ",
				completedActive.error
			);
		} else {
			console.log(
				"SUPABASE MARK ACTIVE INCENTIVE REWARD COMPLETE SUCCESS!: ",
				completedActive.status,
				completedActive.data
			);
			const completedTracking = await supabase
				.from("user_incentive_tracking_junction")
				.update({ reward_claimed: true, date_claimed: dateClaimed })
				.eq("id", tracking_id)
				.select()
				.single();
			if (completedTracking.error) {
				console.error(
					"SUPABASE MARK INCENTIVE TRACKING REWARD COMPLETE ERROR!: ",
					completedTracking.error
				);
			} else {
				console.log(
					"SUPABASE MARK ACTIVE INCENTIVE REWARD COMPLETE SUCCESS!: ",
					completedTracking.status,
					completedTracking.data
				);
				dispatch(getRewardTrackingStatus());
			}
		}
	} catch (error) {
		console.error(
			"REWARD THUNK ERROR --> markRewardComplete(rewardData):",
			error
		);
	}
};
