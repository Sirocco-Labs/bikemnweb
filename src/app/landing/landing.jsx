"use client";
import styles from "./page.module.css";
import React from "react";
import isAuth from "@/components/isAuth/isAuth";

const Landing = () => {
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to iBikeMN's administrative portal!</h1>
      </div>
    </main>
  );
}

export default isAuth(Landing);