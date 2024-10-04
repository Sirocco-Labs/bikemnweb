"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import NavLayout from "@/components/NavLayout/NavLayout";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from "recharts";

function Grant() {
	const dispatch = useDispatch();

	// useEffect(()=>{
	// 	dispatch(getGrantData())
	// },[])

	return (
		<NavLayout>
			<div className={styles.dashboardTopRow}>
				<h1> Grant Data </h1>
			</div>
			<section className={styles.column}>
				<section className={styles.contentLeft}>
					<section className={styles.contentSplitCol}>
						<section className={styles.splitContentLeft}>
							<div
								style={{
									width: "100%",
									height: "auto",
									// border: "3px solid var(--bike-blue)",
								}}
							>
								<TableContainer component={Paper}>
									<Table
										sx={{ minWidth: 600 }}
										aria-label="simple table"
									>
										<TableHead>
											<TableRow>
												<TableCell></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow
												sx={{
													"&:last-child td, &:last-child th":
														{ border: 0 },
												}}
											>
												<TableCell
													component="th"
													scope="row"
												></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</section>

						<section className={styles.splitContentLeft}>
							<div
								style={{
									width: "600px",
									height: "600px",
								}}
							>
								<ResponsiveContainer width={700} height="80%">
									<AreaChart
										width={730}
										height={250}
										data={[]}
										margin={{
											top: 10,
											right: 30,
											left: 0,
											bottom: 0,
										}}
									>
										<defs>
											<linearGradient
												id="colorUv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#8884d8"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#8884d8"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient
												id="colorPv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#82ca9d"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#82ca9d"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<XAxis dataKey="name" />
										<YAxis />
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<Area
											type="monotone"
											dataKey="uv"
											stroke="#8884d8"
											fillOpacity={1}
											fill="url(#colorUv)"
										/>
										<Area
											type="monotone"
											dataKey="pv"
											stroke="#82ca9d"
											fillOpacity={1}
											fill="url(#colorPv)"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</section>
					</section>
				</section>
			</section>
		</NavLayout>
	);
}
export default ProtectedRoute(Grant);
