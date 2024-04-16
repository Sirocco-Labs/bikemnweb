"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>{`Welcome to iBikeMN's administrative portal!`}</h1>
      </div>
    </main>
  );
}
