import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

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
		<form onSubmit={onLogin}>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<button id="login-button" type="submit">
				login
			</button>
		</form>
	);
};

export default LoginForm;
