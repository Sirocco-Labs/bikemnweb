"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import Container from "@mui/material/Container"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function Login() {
	const router = useRouter()
   const user = useSelector((store) => store.user);
   const auth = useSelector((store) => store.auth);

   useEffect(() => {
		user.user_id && router.push("/dashboard");
   }, [user, router]);
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
