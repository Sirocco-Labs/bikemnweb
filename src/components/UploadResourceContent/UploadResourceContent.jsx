import styles from "../../app/page.module.css";
import React, { useEffect, useState, useRef } from "react";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import {
	uploadVideoResource,
	uploadPhotoResource,
} from "../../redux/thunks/mediaUploadThunk";

export default function UploadResourceContent(params) {
	const dispatch = useDispatch();
	const [video, setVideo] = useState("");
	const [videoPreview, setVideoPreview] = useState(null);
	const [picture, setPicture] = useState(null);
	const [picturePreview, setPicturePreview] = useState(null);
	const hiddenVideo = useRef(null);
	const hiddenPhoto = useRef(null);

	const videoData = {
		media_url: "",
		media_format: "video",
		media_title: "",
		media_caption: "",
	};
	const pictureData = {
		media_url: "",
		media_format: "photo",
		media_title: "",
		media_caption: "",
	};

	const [videoForm, setVideoForm] = useState(videoData);
	const [pictureForm, setPictureForm] = useState(pictureData);

	const handleVideo = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		setVideo(file);
		setVideoPreview(URL.createObjectURL(file));
	};

	const handleRemoveVideo = () => {
		setVideo(null);
		setVideoPreview(null);
		hiddenVideo.current.value = "";
		setVideoForm(videoData);
	};

	const handleSubmitVideoResource = () => {
		const payload = {
			...videoForm,
			file: video,
		};
		dispatch(uploadVideoResource(payload));

		handleRemoveVideo();
	};
	const handleSubmitPhotoResource = () => {
		const payload = { ...pictureForm, file: picture };
		dispatch(uploadPhotoResource(payload));

		handleRemovePicture();
	};

	const handlePicture = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		setPicture(file);
		setPicturePreview(URL.createObjectURL(file));
	};
	const clearMedia = () => {
		setVideo(null);
		setVideoPreview(null);
		setPicture(null);
		setPicturePreview(null);
	};
	const handleRemovePicture = () => {
		setPicture(null);
		setPicturePreview(null);
		hiddenPhoto.current.value = "";
		setPictureForm(pictureData);
	};

	return (
		<>
			<Grid container spacing={2} sx={{ my: 2 }}>
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
							}}
						>
							<Typography variant={"h5"}>
								Add to Resource Videos
							</Typography>
							<CardContent
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<FormControl
									variant="standard"
									fullWidth
									sx={{
										mx: 2,
										my: 1,
									}}
								>
									<FormLabel
										htmlFor="video-media-title"
										sx={{
											mb: 1,
										}}
									>
										Give the video a title
									</FormLabel>
									<TextField
										id="video-media-title"
										variant="standard"
										value={videoForm.media_title}
										placeholder="Title"
										onChange={(e) => {
											setVideoForm({
												...videoForm,
												media_title: e.target.value,
											});
										}}
									/>
								</FormControl>
								<FormControl
									variant="standard"
									fullWidth
									sx={{
										mx: 2,
										my: 1,
									}}
								>
									<FormLabel
										htmlFor="video-media-caption"
										sx={{
											mb: 1,
										}}
									>
										Add a caption for your video
									</FormLabel>
									<TextField
										id="video-media-caption"
										variant="standard"
										value={videoForm.media_caption}
										placeholder="Caption"
										onChange={(e) => {
											setVideoForm({
												...videoForm,
												media_caption: e.target.value,
											});
										}}
									/>
								</FormControl>
							</CardContent>
							<FormControl
								variant="standard"
								fullWidth
								sx={{
									my: 1,
								}}
							>
								<FormLabel
									htmlFor="resource-video"
									sx={{
										mb: 1,
									}}
								>
									{`must be .mp4 format`}
								</FormLabel>

								<input
									id="resource-video"
									ref={hiddenVideo}
									type="file"
									accept="video/mp4"
									style={{ display: "none" }}
									onChange={(e) => handleVideo(e)}
								/>
								{video ? (
									<Button
										variant="contained"
										color="error"
										startIcon={<CloseIcon />}
										onClick={handleRemoveVideo}
										sx={{
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										choose different video
									</Button>
								) : (
									<Button
										variant="outlined"
										startIcon={<VideoCallIcon />}
										onClick={() => {
											hiddenVideo.current.click();
										}}
										sx={{
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										Choose a video
									</Button>
								)}
							</FormControl>

							<CardActions>
								{video && (
									<Button
										variant="outlined"
										onClick={handleSubmitVideoResource}
										sx={{
											pt: 1.25,
										}}
									>
										upload video
									</Button>
								)}
							</CardActions>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
							}}
						>
							<Typography variant={"h5"}>
								Add to Resource Photos
							</Typography>
							<CardContent
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<FormControl
									variant="standard"
									fullWidth
									sx={{
										mx: 2,
										my: 1,
									}}
								>
									<FormLabel
										htmlFor="photo-media-title"
										sx={{
											mb: 1,
										}}
									>
										Give the photo a title
									</FormLabel>
									<TextField
										id="photo-media-title"
										variant="standard"
										value={pictureForm.media_title}
										placeholder="Title"
										onChange={(e) => {
											setPictureForm({
												...pictureForm,
												media_title: e.target.value,
											});
										}}
									/>
								</FormControl>
								<FormControl
									variant="standard"
									fullWidth
									sx={{
										mx: 2,
										my: 1,
									}}
								>
									<FormLabel
										htmlFor="photo-media-caption"
										sx={{
											mb: 1,
										}}
									>
										Add a caption for your photo
									</FormLabel>
									<TextField
										id="photo-media-caption"
										variant="standard"
										value={pictureForm.media_caption}
										placeholder="Caption"
										onChange={(e) => {
											setPictureForm({
												...pictureForm,
												media_caption: e.target.value,
											});
										}}
									/>
								</FormControl>
							</CardContent>
							<FormControl
								variant="standard"
								fullWidth
								sx={{
									my: 1,
								}}
							>
								<FormLabel
									htmlFor="resource-photo"
									sx={{
										mb: 1,
									}}
								>
									choose photo/graphic
								</FormLabel>

								<input
									id="resource-photo"
									ref={hiddenPhoto}
									type="file"
									accept="image/*"
									style={{ display: "none" }}
									onChange={(e) => handlePicture(e)}
								/>
								{picture ? (
									<Button
										variant="contained"
										color="error"
										startIcon={<CloseIcon />}
										onClick={handleRemovePicture}
										sx={{
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										choose different photo
									</Button>
								) : (
									<Button
										variant="outlined"
										startIcon={<AddPhotoAlternateIcon />}
										onClick={() => {
											hiddenPhoto.current.click();
										}}
										sx={{
											fontSize: ".75rem",
											p: 2,
											alignItems: "center",
										}}
									>
										Choose a photo
									</Button>
								)}
							</FormControl>

							<CardActions>
								{picture && (
									<Button
										variant="outlined"
										onClick={handleSubmitPhotoResource}
										sx={{
											pt: 1.25,
										}}
									>
										upload photo
									</Button>
								)}
							</CardActions>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}
