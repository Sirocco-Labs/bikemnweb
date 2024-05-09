"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../app/page.module.css";
import NavItem from "../NavItem/NavItem";
import { usePathname } from "next/navigation";
import logo from "../../../public/iBikeMNLogo.png";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

function MobileNavMenu({ path, toggleMenu, isOpen, list }) {
	const [pointerId, setPointerId] = useState(null);

	const handleMouseDown = (event) => {
		setPointerId(event.pointerId);
	};

	const handleMouseUp = () => {
		setPointerId(null);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("pointerup", handleMouseUp);
		} else {
			document.removeEventListener("pointerup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("pointerup", handleMouseUp);
		};
	}, [isOpen]);
	return (
		<div className={styles.mobileNavMenu}>
			<div className={styles.mobileNavWrapper}>
				<IconButton
					onClick={toggleMenu}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					sx={{ height: "100%" }}
				>
					{isOpen ? <CloseIcon /> : <MenuIcon />}
				</IconButton>

				<Collapse
					in={isOpen}
					sx={{ width: "100%", borderTopColor: "grey" }}
					onMouseDown={(event) => {
						if (isOpen && pointerId !== null) {
							event.target.setPointerCapture(pointerId);
						}
					}}
				>
					<Paper
						elevation={0}
						sx={{
							bgcolor: "var(--bike-white)",
							borderRadius: "12px",
						}}
					>
						<div className={styles.dropdownMenu}>
							{list.map((menu) => (
								<Link
									key={menu.text}
									href={menu.href}
									className={
										path === menu.href
											? styles.mobileCurrentPath
											: styles.mobileNavItem
									}
								>
									<div>{menu.text}</div>
								</Link>
							))}
						</div>
					</Paper>
				</Collapse>
			</div>
		</div>
	);
}

function DesktopNavMenu({ path, list }) {
	return (
		<>
			{list.map((menu) => (
				<Link
					key={menu.text}
					href={menu.href}
					replace
					className={
						path === menu.href ? styles.currentPath : styles.navItem
					}
				>
					{menu.text}
				</Link>
			))}
		</>
	);
}

const Navbar = () => {
	const MENU_LIST = [
		{ text: "Dashboard", href: "/dashboard" },
		{ text: "Rider Information", href: "/rider" },
		{ text: "Organization Information", href: "/organization" },
		{ text: "Manage Bikes", href: "/bikes" },
		{ text: "Manage Challenges", href: "/challenges" },
		{ text: "Grant Data", href: "/grant" },
	];
	const path = usePathname();
	const { width } = useWindowSize();
	const isMobile = width <= 768;
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return isMobile ? (
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

				<MobileNavMenu
					path={path}
					isOpen={isOpen}
					toggleMenu={toggleMenu}
					list={MENU_LIST}
				/>
			</nav>
		</header>
	) : (
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
				<DesktopNavMenu path={path} list={MENU_LIST} />
			</nav>
		</header>
	);
};

export default Navbar;
