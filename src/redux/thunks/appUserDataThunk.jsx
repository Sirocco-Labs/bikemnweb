import { supabase } from "@/utils/supabase/supabase";

import { setAppUsers } from "../slices/appUsersSlice";

export const getAppUsers = () => async (dispatch) =>{
    console.log('IN APP USERS THUNK ---> getAppUsers(): ');
    try {
        const appUsers = await supabase
			.from("users")
			.select(
				`
        *,
        screening:screening_data_junction(
            discovery_categories:how_did_you_hear(
                name
            ),
            commute_frequency_categories:commute_frequency(
                reported_answer
            ),
            bike_confidence
        ),
        demographics: demographics_data_junction(
            age,
            gender_identity,
            race,
            income_level(
                income
            ),
            zip_code
        ),
        addresses: addresses_junction(
            location_categories:location_category(
                type
            ),
            city,
            state,
            zip
        ),
        stats: travel_stats_junction(
            miles_total,
            rides_total,
            commute_miles_total,
            commute_rides_total
        ),
        challenges: user_incentive_tracking_junction(
            id,
            active_incentive_id,
            user_id,
            incentive_goal_value,
            earned_points_toward_goal,
            completion_progress,
            has_been_met,
            date_completed,
            is_rewarded,
            data:active_incentive_id(
                incentive_id,
                is_active,
                is_public,
                start_date,
                end_date,
                created_at,
                promo_video,
                reward_photo,
                reward_description,
                details:incentive_id(
                    title,
                    description,
                    point_value,
                    category:category_id(
                        incentive_type,
                        unit_of_measure
                    )
                )
            )

            )

        `
			)
			.order("id", { ascending: true });

        if(appUsers.error){
            console.log('SUPABASE GET APP USERS ERROR: ',appUsers.error);

        }else{
            console.log("SUPABASE GET APP USERS SUCCESS: ", appUsers.status, appUsers.data);

        }
        dispatch(setAppUsers(appUsers.data))

    } catch (error) {
    console.log("APP USERS THUNK ERROR ---> getAppUsers(): ", error);

    }


}