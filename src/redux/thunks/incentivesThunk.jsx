import {
	setIncentiveCategories,
	setAllIncentives,
	setActiveIncentives,
	setPastIncentives,
} from "../slices/incentivesSlice";

import { setMedia } from "../slices/mediaUpload";

import { uploadVideoResource, uploadPhotoResource } from "./mediaUploadThunk";

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
                id,
                start_date,
                end_date,
				is_active,
				promo_video,
				reward_photo,
				reward_description,
                incentives: incentive_id(
                    id,
                    title,
                    description,
                    category: category_id(
                        incentive_type,
                        unit_of_measure
                    ),
                    point_value
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

export const getPastIncentives = () => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> getPastIncentives()");

	try {
		const getOldIncentives = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                 id,
				 incentive_id,
                start_date,
                end_date,
				is_active,
				is_public,
				promo_video,
				reward_photo,
				reward_description,
                incentives: incentive_id(
                    id,
                    title,
                    description,
                    category: category_id(
                        incentive_type,
                        unit_of_measure
                    ),
                    point_value
                )
                `
			)
			.eq("is_active", false)
			.order("id", { ascending: true });
		if (getOldIncentives.error) {
			console.log(
				"SUPABASE GET ALL INCENTIVES ERROR",
				getOldIncentives.error
			);
		} else {
			console.log(
				"SUPABASE GET ALL INCENTIVES SUCCESS",
				getOldIncentives.data,
				getOldIncentives.status
			);
			dispatch(setPastIncentives(getOldIncentives.data));
		}
	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> getPastIncentives() ", error);
	}
};
export const getAllIncentives = () => async (dispatch) => {
	console.log("IN INCENTIVE THUNK ---> getAllIncentives()");

	try {
		const getAllIncentives = await supabase.from(
			"activated_incentives_junction"
		).select(`
                id,
                start_date,
                end_date,
                incentives: incentive_id(
                    id,
                    title,
                    description,
					point_value,
                    category: category_id(
                        incentive_type,
                        unit_of_measure
                    )
				)
                `);
		if (getAllIncentives.error) {
			console.log(
				"SUPABASE GET ALL INCENTIVES ERROR",
				getAllIncentives.error
			);
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
		promo_vid,
		promo_vid_url,
		reward_pic,
		reward_description,
	} = formData;

	const toIncentives = {
		title,
		description,
		category_id,
		point_value,
		user_id,
	};
	let promo_video;
	let reward_photo;

	try {
		if (promo_vid) {
			const videoName = await formatName(promo_vid.name);

			const uploadVideo = await supabase.storage
				.from("promo_content")
				.upload(`videos/${videoName.pretty}`, promo_vid, {
					contentType: "video/mp4",
				});

			if (uploadVideo.error) {
				console.error("SUPABASE UPLOAD VIDEO ERROR", uploadVideo.error);
			} else {
				console.log(
					"SUPABASE UPLOAD VIDEO SUCCESS",
					uploadVideo.status,
					uploadVideo.data
				);

				const videoURL = supabase.storage
					.from("promo_content")
					.getPublicUrl(uploadVideo.data.path);

				if (videoURL.error) {
					console.error("VIDEO URL ERROR", videoURL.error);
				} else {
					console.log(
						"VIDEO URL SUCCESS",
						videoURL.status,
						videoURL.data
					);

					promo_video = videoURL.data.publicUrl;
				}
			}
		}
		if (reward_pic) {
			const photoName = await formatName(reward_pic.name);
			const uploadPhoto = await supabase.storage
				.from("promo_content")
				.upload(`photos/${photoName.pretty}`, reward_pic);
			if (uploadPhoto.error) {
				console.error("SUPABASE UPLOAD PHOTO ERROR", uploadPhoto.error);
			} else {
				console.log(
					"SUPABASE UPLOAD PHOTO SUCCESS",
					uploadPhoto.status,
					uploadPhoto.data
				);
				const photoURL = supabase.storage
					.from("promo_content")
					.getPublicUrl(uploadPhoto.data.path);

				if (photoURL.error) {
					console.error("PHOTO URL ERROR", photoURL.error);
				} else {
					console.log(
						"PHOTO URL SUCCESS",
						photoURL.status,
						photoURL.data
					);

					reward_photo = photoURL.data.publicUrl;
				}
			}
		}
		const addIncentive = await supabase
			.from("incentives")
			.insert(toIncentives)
			.select("*")
			.single();
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
				promo_video,
				reward_photo,
				reward_description,
			};
			dispatch(getAllIncentives());
			dispatch(activateIncentive(toActivated));
		}
	} catch (error) {
		console.log("INCENTIVE THUNK ERROR ---> addNewIncentive()", error);
	}
};

const formatName = async (name) => {
	let unique;
	let time = new Date().toLocaleString("en-us", {
		day: "numeric",
		month: "short",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		fractionalSecondDigits: 3,
	});
	unique = `${time}${name}`;
	console.log("UNIQUE", unique);
	const lastIndex = unique.lastIndexOf(".");
	const extension = unique.substring(lastIndex);
	let formatted = unique
		.slice(0, unique.lastIndexOf("."))
		.replaceAll(/[.\s()-/*&^$#@+\[\]{}:]|[\u202F]/g, "_");

	return { pretty: `${formatted}${extension}`, ending: extension };
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
			dispatch(getActiveIncentives());
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
	const {
		incentive_id,
		start_date,
		end_date,
		is_public,
		user_id,
		promo_video,
		reward_photo,
		reward_description,
	} = payload;
	let vid_url = "";
	let photo_url = "";

	try {
		if (promo_video.name) {
			console.log("PROMO VIDEO HAS A NAME BECAUSE ITS A FILE");
			const videoName = await formatName(promo_video.name);
			const uploadVideo = await supabase.storage
				.from("promo_content")
				.upload(`videos/${videoName.pretty}`, promo_video, {
					contentType: "video/mp4",
				});

			if (uploadVideo.error) {
				console.error("SUPABASE UPLOAD VIDEO ERROR", uploadVideo.error);
			} else {
				console.log(
					"SUPABASE UPLOAD VIDEO SUCCESS",
					uploadVideo.status,
					uploadVideo.data
				);

				const videoURL = supabase.storage
					.from("promo_content")
					.getPublicUrl(uploadVideo.data.path);

				if (videoURL.error) {
					console.error("VIDEO URL ERROR", videoURL.error);
				} else {
					console.log(
						"VIDEO URL SUCCESS",
						videoURL.status,
						videoURL.data
					);

					vid_url = videoURL.data.publicUrl;
				}
			}
		}
		if (reward_photo.name) {
			console.log("REWARD PHOTO HAS A NAME BECAUSE ITS A FILE");
			const photoName = await formatName(reward_photo.name);
			const uploadPhoto = await supabase.storage
				.from("promo_content")
				.upload(`photos/${photoName.pretty}`, reward_photo);
			if (uploadPhoto.error) {
				console.error("SUPABASE UPLOAD PHOTO ERROR", uploadPhoto.error);
			} else {
				console.log(
					"SUPABASE UPLOAD PHOTO SUCCESS",
					uploadPhoto.status,
					uploadPhoto.data
				);
				const photoURL = supabase.storage
					.from("promo_content")
					.getPublicUrl(uploadPhoto.data.path);

				if (photoURL.error) {
					console.error("PHOTO URL ERROR", photoURL.error);
				} else {
					console.log(
						"PHOTO URL SUCCESS",
						photoURL.status,
						photoURL.data
					);

					photo_url = photoURL.data.publicUrl;
				}
			}
		}
		let insertData = {
			...payload,
			promo_video: vid_url,
			reward_photo: photo_url,
		};

		const reactivate = await supabase
			.from("activated_incentives_junction")
			.insert(insertData)
			.select("*")
			.limit(1)
			.single();
		if (reactivate.error) {
			console.log(
				"SUPABASE REACTIVATE INCENTIVE ERROR",
				reactivate.error
			);
		} else {
			console.log(
				"SUPABASE ACTIVATE INCENTIVE SUCCESS",
				reactivate.data,
				reactivate.status
			);
		}
		dispatch(getAllIncentives());
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
