import {
	setIncentiveCategories,
	setAllIncentives,
	setActiveIncentives,
} from "../slices/incentivesSlice";

import { supabase } from "@/utils/supabase/supabase";

export const getIncentiveCategories = () => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> getIncentiveCategories() ");

	try {
		const getCategories = await supabase
			.from("incentive_categories")
			.select("*");
		if (getCategories.error) {
			console.log("SUPABASE GET CATEGORIES ERROR", getCategories.error);
		} else {
			console.log(
				"SUPABASE GET CATEGORIES SUCCESS",
				getCategories.data,
				getCategories.status
			);
			dispatch(setIncentiveCategories(getCategories.data));
		}
	} catch (error) {
		console.log(
			"INCENTIVE THUNK ERROR ---> getIncentiveCategories()",
			error
		);
	}
};

export const getActiveIncentives = () => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> getActiveIncentives()");
	try {
		const getActive = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                *,
                incentives (*,
                    incentive_categories (*)
                )
                `
			)
			.eq("is_active", true);
		if (getActive.error) {
			console.log(
				"SUPABASE GET ACTIVE INCENTIVES ERROR",
				getActive.error
			);
		} else {
			console.log(
				"SUPABASE GET ACTIVE INCENTIVES SUCCESS",
				getActive.data,
				getActive.status
			);
			dispatch(setActiveIncentives(getActive.data));
		}
	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> getActiveIncentives()", error);
	}
};

export const getAllIncentives = () => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> getAllIncentives()");

	try {
		const getAllIncentives = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                *,
                incentives (*,
                    incentive_categories (*)
                )
                `
			)
			.eq("is_active", false);;
		if (getAllIncentives.error) {
			console.log("SUPABASE GET ALL INCENTIVES ERROR");
		} else {
			console.log(
				"SUPABASE GET ALL INCENTIVES SUCCESS",
				getAllIncentives.data,
				getAllIncentives.status
			);
			dispatch(setAllIncentives(getAllIncentives.data));
		}
	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> getAllIncentives() ", error);
	}
};

export const addNewIncentive = (formData) => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> addNewIncentive(formData)", formData);
	const {
		type,
		title,
		description,
		category_id,
		point_value,
		start_date,
		end_date,
		is_public,
		notes,
		user_id,
	} = formData;

	const toIncentives = {
		title,
		description,
		category_id,
		point_value,
		user_id,
	};

	try {
		const addIncentive = await supabase
			.from("incentives")
			.insert(toIncentives)
			.select();
		if (addIncentive.error) {
			console.log("SUPABASE ADD NEW INCENTIVE ERROR", addIncentive.error);
		} else {
			console.log(
				"SUPABASE ADD NEW INCENTIVE SUCCESS",
				addIncentive.data,
				addIncentive.status
			);

			const incentive_id = addIncentive.data.id;

			const toActivated = {
				incentive_id,
				start_date,
				end_date,
				is_public,
				user_id,
			};
			dispatch(getAllIncentives());
			dispatch(activateIncentive(toActivated));
		}
	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> addNewIncentive()", error);
	}
};

export const activateIncentive = (activateData) => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> activateIncentive(activateData)"),
		activateData;
	try {
		const activateIt = await supabase
			.from("activated_incentives_junction")
			.insert(activateData);
		if (activateIt.error) {
			console.log("SUPABASE ACTIVATE INCENTIVE ERROR", activateIt.error);
		} else {
			console.log(
				"SUPABASE ACTIVATE INCENTIVE SUCCESS",
				activateIt.data,
				activateIt.status
			);
            dispatch(getActiveIncentives())
		}
	} catch (error) {
		console.log(
			"INCENTIVE THUNK ERROR ---> activateIncentive(activateData)",
			error
		);
	}
};

export const reactivateIncentive = (payload) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> reactivateIncentive(payload)",
		payload
	);
    const {id, start_date, end_date, is_active} = payload

	try {
        const reactivate = await supabase.from('activated_incentives_junction').update({is_active, start_date, end_date }).eq('id',id)
		if (reactivate.error) {
			console.log("SUPABASE REACTIVATE INCENTIVE ERROR", reactivate.error);
		} else {
			console.log("SUPABASE ACTIVATE INCENTIVE SUCCESS", reactivate.data, reactivate.status);
		}
        dispatch(getAllIncentives())

	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> reactivateIncentive()", error);
	}
};

export const deleteIncentive = (id) => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> deleteIncentive(id)", id);

	try {
		if (condition.error) {
			console.log("");
		} else {
			console.log("", condition.data, condition.status);
		}
	} catch (error) {
		console.log(
			"INCENTIVE THUNK ERROR ---> deleteIncentive(payload)",
			error
		);
	}
};
