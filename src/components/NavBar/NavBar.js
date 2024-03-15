"use client";
import Link from "next/link";
import React from "react";
import styles from "../../app/page.module.css";
import NavItem from "../NavItem/NavItem";

const MENU_LIST = [
  { text: "Dashboard", href: "/" },
  { text: "Rider Information", href: "/rider" },
  { text: "Organization Information", href: "/organization" },
];

const Navbar = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <h1 className="logo">BikeMN</h1>
        </Link>

        {MENU_LIST.map((menu) => (
          <div key={menu.text} className={styles.navItem}>
            <NavItem {...menu} />
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
