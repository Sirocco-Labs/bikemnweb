"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import NavBar from "../components/NavBar/NavBar";
import React, { useEffect, useState } from "react";

import { ReduxProvider } from "@/redux/ReduxProvider/ReduxProvider";
import { useDispatch } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
{
	/*
Landing page for app?
Figure protected route impact on layout
Does layout need to be wrapped in protected route?
Is it better to conditionally render login UI/main app based on authentication


*/
}


export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
