import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

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

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
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

	const handleLogout = (event) => {
		window.localStorage.removeItem("loggedBlogUser");
		setUser(null);
	};

	const addBlog = (event) => {
		event.preventDefault();
		const blogObject = {
			title: title,
			author: author,
			url: url,
		};

		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			setTitle("");
			setAuthor("");
			setUrl("");
		});
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
					<h1>blogs</h1>
					<p>
						Logged in as {user.name}
						<button onClick={handleLogout}>logout</button>
					</p>
					<BlogForm
						title={title}
						author={author}
						url={url}
						onTitleChange={({ target }) => setTitle(target.value)}
						onAuthorChange={({ target }) => setAuthor(target.value)}
						onUrlChange={({ target }) => setUrl(target.value)}
						onSubmit={addBlog}
					/>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
