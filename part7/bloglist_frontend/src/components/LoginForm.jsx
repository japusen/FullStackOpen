import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { Button, TextField } from "@mui/material";

const LoginForm = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = (event) => {
		event.preventDefault();
		dispatch(
			login({
				username,
				password,
			})
		);
		setUsername("");
		setPassword("");
	};
	return (
		<form
			onSubmit={onLogin}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<TextField
				required
				label="Username"
				margin="normal"
				id="username"
				type="text"
				value={username}
				name="Username"
				onChange={(event) => setUsername(event.target.value)}
			/>
			<TextField
				required
				label="Password"
				margin="normal"
				id="password"
				type="password"
				value={password}
				name="Password"
				onChange={(event) => setPassword(event.target.value)}
			/>
			<Button
				id="login-button"
				style={{ marginBottom: 10 }}
				variant="contained"
				color="primary"
				type="submit"
			>
				login
			</Button>
		</form>
	);
};

export default LoginForm;
