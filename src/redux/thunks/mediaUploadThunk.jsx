import { supabase } from "@/utils/supabase/supabase";

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

// FIND ME-- REFACTOR TO TAKE BUCKET AS AN ARGUMENT
//  Then conditionally insert to resource table or newly activated incentive.


export const uploadVideoResource = (videoData) => async (dispatch) => {
	console.log(
		"IN MEDIA THUNK ----> uploadVideoResource(videoData): ",
		videoData
	);
	const { media_url, media_format, media_title, media_caption, file } =
		videoData;

	let mediaRecord = {
		media_format,
		media_title,
		media_caption,
	};

	try {
		const videoName = await formatName(file.name);

		const uploadVideo = await supabase.storage
			.from('resource_content')
			.upload(`videos/${videoName.pretty}`, file, {
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
				.from("resource_content")
				.getPublicUrl(uploadVideo.data.path);

			if (videoURL.error) {
				console.error("VIDEO URL ERROR", videoURL.error);
			} else {
				console.log(
					"VIDEO URL SUCCESS",
					videoURL.status,
					videoURL.data
				);

				mediaRecord.media_url = videoURL.data.publicUrl;
				if (bucket === "resource_content"){
					dispatch(addToResourceTable(mediaRecord));
				}else{
					return mediaRecord

				}
			}
		}
		// ----------------------------------------
	} catch (error) {
		console.error(
			"MEDIA THUNK ERROR --> uploadVideoResource(videoData):",
			error
		);
	}
};

export const uploadPhotoResource = (photoData) => async (dispatch) => {
	console.log(
		"IN MEDIA THUNK ----> uploadPhotoResource(photoData): ",
		photoData
	);
	const { media_url, media_title, media_caption, media_format, file } =
		photoData;
	let mediaRecord = {
		media_format,
		media_title,
		media_caption,
	};
	try {
		const photoName = await formatName(file.name);
		const uploadPhoto = await supabase.storage
			.from("resource_content")
			.upload(`photos/${photoName.pretty}`, file);
		if (uploadPhoto.error) {
			console.error("SUPABASE UPLOAD PHOTO ERROR", uploadPhoto.error);
		} else {
			console.log(
				"SUPABASE UPLOAD PHOTO SUCCESS",
				uploadPhoto.status,
				uploadPhoto.data
			);
			const photoURL = supabase.storage
				.from("resource_content")
				.getPublicUrl(uploadPhoto.data.path);

			if (photoURL.error) {
				console.error("PHOTO URL ERROR", photoURL.error);
			} else {
				console.log(
					"PHOTO URL SUCCESS",
					photoURL.status,
					photoURL.data
				);

				mediaRecord.media_url = photoURL.data.publicUrl;
				dispatch(addToResourceTable(mediaRecord));
			}
		}
	} catch (error) {
		console.error(
			"MEDIA THUNK ERROR --> uploadPhotoResource(photoData):",
			error
		);
	}
};

const addToResourceTable = (mediaRecord) => async (dispatch) => {
	console.log(
		"IN MEDIA THUNK ----> addToResourceTable(mediaRecord): ",
		mediaRecord
	);
	try {
		const addMedia = await supabase
			.from("resource_media")
			.insert(mediaRecord)
			.select("*")
			.single();
		if (addMedia.error) {
			console.log(
				"SUPABASE ADD NEW RESOURCE MEDIA ERROR",
				addMedia.error
			);
		} else {
			console.log(
				"SUPABASE ADD NEW RESOURCE MEDIA SUCCESS",
				addMedia.data,
				addMedia.status
			);
		}
	} catch (error) {
		console.error(
			"MEDIA THUNK ERROR --> addToResourceTable(mediaRecord):",
			error
		);
	}
};
