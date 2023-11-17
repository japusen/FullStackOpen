import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			// window.localStorage.setItem(
			// 	"loggedNoteappUser",
			// 	JSON.stringify(user)
			// );
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			{user === null ? (
				<div>
					<h1>log in to application</h1>
					<LoginForm
						username={username}
						password={password}
						onUsernameChange={({ target }) =>
							setUsername(target.value)
						}
						onPasswordChange={({ target }) =>
							setPassword(target.value)
						}
						onLogin={handleLogin}
					/>
				</div>
			) : (
				<div>
					<h2>blogs</h2>
					<p>Logged in as {user.name}</p>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
