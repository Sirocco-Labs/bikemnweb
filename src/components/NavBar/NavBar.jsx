"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "../../app/page.module.css";
import NavItem from "../NavItem/NavItem";
import { usePathname } from "next/navigation";
import logo from "../../../public/iBikeMNLogo.png";

const MENU_LIST = [
	{ text: "Dashboard", href: "/dashboard" },
	{ text: "Rider Information", href: "/rider" },
	{ text: "Organization Information", href: "/organization" },
	{ text: "Manage Bikes", href: "/bikes" },
	{ text: "Manage Challenges", href: "/challenges" },
	{ text: "Grant Data", href: "/grant" },
];

const Navbar = () => {
	const path = usePathname();

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link href={"/dashboard"}>
					<div className={styles.navLogo}>
						<Image
							priority
							title="iBikeMNLogo"
							alt="iBikeMNLogo"
							src={logo}
							height={50}
							style={{ marginRight: "10px" }}
						/>

						<h1 style={{ color: "#FFFAF2" }}>iBikeMN</h1>
					</div>
				</Link>

				{MENU_LIST.map((menu) => (
					<Link
						key={menu.text}
						href={menu.href}
						className={
							path === menu.href
								? styles.currentPath
								: styles.navItem
						}
					>
						<div
							// className={
							// 	path === menu.href
							// 		? styles.currentPath
							// 		: styles.navItem
							// }
						>
							{/* {active ? "active" : ""} */}
							{menu.text}
						</div>
					</Link>
				))}
			</nav>
		</header>
	);
};

export default Navbar;
