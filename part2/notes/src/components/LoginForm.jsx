const LoginForm = ({
	username,
	password,
	onUsernameChange,
	onPasswordChange,
	onLogin,
}) => (
	<form onSubmit={onLogin}>
		<div>
			username
			<input
				type="text"
				value={username}
				name="Username"
				onChange={(target) => onUsernameChange(target)}
			/>
		</div>
		<div>
			password
			<input
				type="password"
				value={password}
				name="Password"
				onChange={(target) => onPasswordChange(target)}
			/>
		</div>
		<button type="submit">login</button>
	</form>
);

export default LoginForm;
