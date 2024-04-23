import { supabase } from "@/utils/supabase/supabase";

import { setAllBikes } from "../slices/allBikesSlice";
import { getOrgBikes } from "./orgThunk";

export const getAllBikes = () => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> getAllBikes(): ");
	try {
		const selectAllBikes = await supabase
			.from("bikes")
			.select("*")
			.order("id", { ascending: true });

		if (selectAllBikes.error) {
			console.log(
				"SUPABASE SELECT ALL BIKES ERROR!: ",
				selectAllBikes.error
			);
		} else {
			console.log(
				"SUPABASE SELECT ALL BIKES SUCCESS!: ",
				selectAllBikes.data
			);
			dispatch(setAllBikes(selectAllBikes.data));
			dispatch(getOrgBikes());
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> getAllBikes(bikeData): ", error);
	}
};
export const addNewBike = (bike) => async (dispatch) => {
	console.log("IN BIKE THUNK ----> addNewBike(bike): ", bike);
	try {
		const addBike = await supabase.from("bikes").insert(bike).select();

		if (addBike.error) {
			console.log("SUPABASE ADD NEW BIKE ERROR!: ", addBike.error);
		} else {
			console.log("SUPABASE ADD NEW BIKE SUCCESS!: ", addBike.data);
			const bike_id = addBike.data[0].id;
            try {
                const addToJunction = await supabase
					.from("bike_registration_junction")
					.insert({ bike_id })
					.select();
				if (addToJunction.error) {
					console.log(
						"SUPABASE ADD NEW BIKE TO JUNCTION ERROR!: ",
						addToJunction.error
					);
				} else {
					console.log(
						"SUPABASE ADD NEW BIKE TO JUNCTION SUCCESS!: ",
						addToJunction.status,
						addToJunction.data
					)
					dispatch(getAllBikes());
				}

            } catch (error) {
                console.log(
					"BIKE THUNK ERROR --> addToJunction(bike_id): ",
					error
				);

            }

		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> addNewBike(bike): ", error);
	}
};

export const addBikeNote = (formData) => async (dispatch) => {
	console.log("IN BIKE THUNK ----> addBikeNote(formData): ", formData);
	try {
		const bikeNote = await supabase
			.from("bikes")
			.update({ notes: formData.note })
			.eq("id", formData.id);

		if (bikeNote.error) {
			console.log("SUPABASE ADD BIKE NOTE ERROR!: ", bikeNote.error);
		} else {
			console.log("SUPABASE ADD BIKE NOTE SUCCESS!: ", bikeNote.data);
			dispatch(getAllBikes());
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> addBikeNote(formData): ", error);
	}
};


export const updateBikeOrgAssignment = (formData) => async (dispatch) => {
	console.log(
		"IN BIKE THUNK ----> updateBikeOrgAssignment(formData): ",
		formData
	);
	const { org_id, bike_id } = formData;
	try {
		const updateJunction = await supabase
			.from("bike_registration_junction")
			.update({org_id})
			.eq("bike_id", bike_id).select();

		if (updateJunction.error) {
			console.log(
				"SUPABASE UPDATE BIKE ASSIGNMENT ERROR!: ",
				updateJunction.error
			);
		} else {
			console.log(
				"SUPABASE UPDATE BIKE ASSIGNMENT SUCCESS!: ",
				updateJunction.data
			);
			dispatch(getAllBikes());
		}
	} catch (error) {
		console.log(
			"BIKE THUNK ERROR --> updateBikeOrgAssignment(formData): ",
			error
		);
	}
};
export const updateBikeNickname = (formData) => async (dispatch) => {
	console.log("IN BIKE THUNK ----> updateBikeNickname(formData): ", formData);
	const { id, nickname } = formData;
	try {
		const updateNickname = await supabase
			.from("bikes")
			.update({nickname})
			.eq("id", id).select();

		if (updateNickname.error) {
			console.log(
				"SUPABASE UPDATE BIKE NICKNAME ERROR!: ",
				updateNickname.error
			);
		} else {
			console.log(
				"SUPABASE UPDATE BIKE NICKNAME SUCCESS!: ",
				updateNickname.data
			);
			dispatch(getAllBikes());
		}
	} catch (error) {
		console.log(
			"BIKE THUNK ERROR --> updateBikeNickname(formData): ",
			error
		);
	}
};

