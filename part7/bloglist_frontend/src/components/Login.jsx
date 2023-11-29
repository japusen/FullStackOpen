import Notification from "./Notification";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>log in to application</h1>
			<Notification />
			<LoginForm />
		</div>
	);
};

export default Login;
