import React from "react";
import Navbar from "../NavBar/NavBar";
import styles from "../../app/page.module.css";

import Container from "@mui/material/Container";

export default function NavLayout({ children }) {
	return (
		<main className={styles.authMain}>
				<Navbar />
			<Container maxWidth="xl" sx={{ p: 2 }}>

				{children}
			</Container>
		</main>
	);
}
