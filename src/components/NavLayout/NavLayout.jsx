import React from "react";
import Navbar from "../NavBar/NavBar"
import styles from "../../app/page.module.css"

export default function NavLayout({ children }){
	return (
		<main className={styles.authMain}>
			<Navbar />
			<section className={styles.main}>

			{children}
			</section>
		</main>
	);
};

