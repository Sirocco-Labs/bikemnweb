"use client";
import styles from "./page.module.css";
import React from "react";
import isAuth from "@/components/isAuth/isAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <main className={styles.main}>
      <div>
        <h1>Login</h1>
        <div className={styles.login}>
        <TextField id="outlined-basic" className={styles.input} label="Username" variant="outlined" />
        <TextField id="outlined-basic" className={styles.input} label="Password" variant="outlined" />
        <Button className={styles.input} variant="outlined"> Submit </Button>
        </div>
        
      </div>
    </main>
  );
}

export default Home;