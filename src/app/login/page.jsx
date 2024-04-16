"use client";
import styles from "../page.module.css";
import React, { useState } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import Container from "@mui/material/Container"
function Login() {
	return (
		<main className={styles.main}>
			<Container maxWidth="sm">
			<h1> Admin Login </h1>
			<LoginForm />
			</Container>
		</main>
	);
}
export default Login;
