"use client";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/thunks/authThunk";

export default function LoginForm() {
    const router = useRouter()
    const dispatch = useDispatch()

    const loginData = {
        email:'',
        password:''
    }
    const [login, setLogin] = useState(loginData)
    const user = useSelector((store)=>store.user)
    const auth = useSelector((store)=>store.auth)

    useEffect(()=>{
        user.user_id && router.push('/dashboard')

    },[user, router])

    const handleLogin = () =>{
        dispatch(loginUser(login))
    }

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<FormControl
						required
						variant="standard"
						fullWidth
						sx={{ mt: 4 }}
					>
						<FormLabel htmlFor="email" sx={{ mb: 1 }}>
							Email
						</FormLabel>
						<TextField
							type="email"
							sx={{ width: "100%" }}
							id="email"
							value={login.email}
							onChange={(e) =>
								setLogin({
									...login,
									email: e.target.value,
								})
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl
						required
						variant="standard"
						fullWidth
						sx={{ my: 1 }}
					>
						<FormLabel htmlFor="email" sx={{ mb: 1 }}>
							Password
						</FormLabel>
						<TextField
							type="password"
							sx={{ width: "100%" }}
							id="email"
							value={login.password}
							onChange={(e) =>
								setLogin({
									...login,
									password: e.target.value,
								})
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{p:1.5, mt:2, fontSize:'1.25rem'}}
                    onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
			</Grid>
		</>
	);
}
