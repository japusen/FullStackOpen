import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
	const dispatch = useDispatch();

	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const blogFormRef = useRef();

	const byLikes = (a, b) => {
		if (a.likes < b.likes) return -1;
		else if (a.likes > b.likes) return 1;
		else return 0;
	};

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort(byLikes).reverse()));
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

	const addBlog = async (blogObject) => {
		try {
			const returnedBlog = await blogService.create(blogObject);
			setBlogs(blogs.concat({ ...returnedBlog, user: user }));
			dispatch(
				setNotification(
					`added blog: ${returnedBlog.title} by ${returnedBlog.author}`
				)
			);
			blogFormRef.current.toggleVisibility();
		} catch (exception) {
			dispatch(setNotification(exception.response.data.error));
		}
	};

	const likeBlog = async (blogId, updatedBlog) => {
		try {
			const returnedBlog = await blogService.update(blogId, updatedBlog);
			setBlogs(blogs.map((b) => (b.id === blogId ? updatedBlog : b)));
			dispatch(
				setNotification(
					`Liked ${returnedBlog.title} by ${returnedBlog.author}`
				)
			);
		} catch (error) {
			dispatch(setNotification("unable to like blog"));
		}
	};

	const deleteBlog = async (blog) => {
		try {
			await blogService.deleteBlog(blog.id);
			setBlogs(blogs.filter((b) => b.id !== blog.id));
			dispatch(
				setNotification(`Deleted '${blog.title}' by ${blog.author}`)
			);
		} catch (error) {
			dispatch(setNotification("unable to delete blog"));
		}
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
						<BlogForm createBlog={addBlog} />
					</Togglable>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							onLike={likeBlog}
							onDelete={
								blog.user.username === user.username
									? deleteBlog
									: null
							}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
