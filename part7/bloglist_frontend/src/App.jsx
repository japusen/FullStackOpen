import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
	const dispatch = useDispatch();

	const [user, setUser] = useState(null);
	const blogFormRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (userObject) => {
		try {
			const user = await loginService.login(userObject);

			window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			dispatch(setNotification(""));
		} catch (exception) {
			dispatch(setNotification("invalid username or password"));
		}
	};

	const handleLogout = (event) => {
		window.localStorage.removeItem("loggedBlogUser");
		setUser(null);
		dispatch(setNotification(""));
	};

	return (
		<div>
			{user === null ? (
				<div>
					<h1>log in to application</h1>
					<Notification />
					<LoginForm login={handleLogin} />
				</div>
			) : (
				<div>
					<h1>blogs</h1>
					<p>
						Logged in as {user.name}
						<button onClick={handleLogout}>logout</button>
					</p>
					<Notification />
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm
							user={user}
							toggle={() => {
								blogFormRef.current.toggleVisibility();
							}}
						/>
					</Togglable>
					<BlogList user={user} />
				</div>
			)}
		</div>
	);
};

export default App;
