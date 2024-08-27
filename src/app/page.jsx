"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import events from "../../public/Promo Events 1.png";
import fab from "../../public/Promo FAB 1.png";
import home from "../../public/Promo HomeScreen 1.png";
import ride from "../../public/Promo RideScreen 1.png";
import track from "../../public/Promo Tracking 1.png";
import psb from "../../public/PlayStoreBadge.png";
import asb from "../../public/AppStoreBadge.png";
import logo from "../../public/iBikeMNlogo.png";

import Grid from "@mui/material/Grid";
export default function Home() {
	return (
		<main className={styles.splash}>
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",

				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
						margin: "1rem",
					}}
				>
					<Image
						src={logo}
						title="logo"
						alt="logo"
						height={50}
						width={50}
					/>
					<h1
						style={{
							color: "#fff",
							marginLeft: "1rem",
							fontSize: "2.5rem",
						}}
					>
						iBikeMN
					</h1>
				</div>
				<div style={{ width: "100%",  display:'flex', justifyContent:'center'}}>
					<Grid container spacing={2} sx={{ margin: "1rem 0rem"}}>
						<Grid item md={4} xs={12}>
							<div className={styles.glass}>
								<h2 className={styles.promoText}>
									Find Your Motivation
								</h2>
								<Image
									title="promo"
									alt="promo content"
									src={home}
									priority={true}
									// layout="responsive"
									// objectFit="contain"
									height={262}
									width={128}
								/>
							</div>
						</Grid>
						<Grid item md={4} xs={12}>
							<div className={styles.glass}>
								<h2 className={styles.promoText}>
									Track Your Rides
								</h2>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										flexWrap: "nowrap",
										width: "70%",
										justifyContent: "space-around",
									}}
								>
									<Image
										title="promo"
										alt="promo content"
										src={ride}
										priority={true}
										height={262}
										width={128}
									/>
									<Image
										title="promo"
										alt="promo content"
										src={track}
										priority={true}
										height={262}
										width={128}
									/>
								</div>
							</div>
						</Grid>
						<Grid item md={4} xs={12}>
							<div className={styles.glass}>
								<h2 className={styles.promoText}>
									Stay Connected!
								</h2>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										flexWrap: "nowrap",
										width: "70%",
										justifyContent: "space-around",
									}}
								>
									<Image
										title="promo"
										alt="promo content"
										src={fab}
										priority={true}
										height={262}
										width={128}
									/>
									<Image
										title="promo"
										alt="promo content"
										src={events}
										priority={true}
										height={262}
										width={128}
									/>
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
				<section
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						marginTop: "5rem",
					}}
				>
					<h2 className={styles.promoText}>
						Start the iBikeMN Challenge Today!
					</h2>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							// width: "100%",
							flexWrap: "nowrap",
						}}
					>
						<div className={styles.promoImage}>
							<Image
								src={psb}
								title="foo"
								alt="bar"
								priority={true}
								layout="fill"
								objectFit="contain"
							/>
						</div>
						<div className={styles.promoImage}>
							<Image
								src={asb}
								title="foo"
								alt="bar"
								priority={true}
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</div>
				</section>
			</section>
		</main>
	);
}
