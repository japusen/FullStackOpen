import { useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/userReducer";

const App = () => {
	const dispatch = useDispatch();
	const blogFormRef = useRef();
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		dispatch(initializeUser());
	}, []);

	const logoutUser = () => {
		dispatch(logout());
	};

	const toggleFormVisibility = () => {
		blogFormRef.current.toggleVisibility();
	};

	return (
		<div>
			{user === null ? (
				<div>
					<h1>log in to application</h1>
					<Notification />
					<LoginForm />
				</div>
			) : (
				<div>
					<h1>blogs</h1>
					<p>
						Logged in as {user.name}
						<button onClick={logoutUser}>logout</button>
					</p>
					<Notification />
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm toggle={toggleFormVisibility} />
					</Togglable>
					<BlogList />
				</div>
			)}
		</div>
	);
};

export default App;
