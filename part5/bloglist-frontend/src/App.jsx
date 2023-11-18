import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Toggable";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const blogFormRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
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
		} catch (exception) {
			setNotification("invalid username or password");
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const handleLogout = (event) => {
		window.localStorage.removeItem("loggedBlogUser");
		setUser(null);
	};

	const addBlog = async (blogObject) => {
		try {
			const returnedBlog = await blogService.create(blogObject);
			setBlogs(blogs.concat({ ...returnedBlog, user: user }));
			setNotification(
				`added blog: ${returnedBlog.title} by ${returnedBlog.author}`
			);
			blogFormRef.current.toggleVisibility();
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch (exception) {
			setNotification(exception.response.data.error);
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const likeBlog = async (id, updatedBlog) => {
		try {
			const returnedBlog = await blogService.update(id, updatedBlog);
			setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b)));
			setNotification(
				`Liked ${returnedBlog.title} by ${returnedBlog.author}`
			);
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch (error) {
			setNotification("unable to like blog");
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	return (
		<div>
			{user === null ? (
				<div>
					<h1>log in to application</h1>
					<Notification notification={notification} />
					<LoginForm login={handleLogin} />
				</div>
			) : (
				<div>
					<h1>blogs</h1>
					<p>
						Logged in as {user.name}
						<button onClick={handleLogout}>logout</button>
					</p>
					<Notification notification={notification} />
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} onLike={likeBlog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
