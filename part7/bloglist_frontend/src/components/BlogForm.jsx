import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ user, toggle }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const onCreate = (event) => {
		event.preventDefault();
		addBlog({
			title,
			author,
			url,
		});
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	const addBlog = async (blog) => {
		try {
			dispatch(createBlog(blog, user));
			dispatch(
				setNotification(`added blog: ${blog.title} by ${blog.author}`)
			);
			toggle();
		} catch (exception) {
			dispatch(setNotification(exception));
		}
	};

	return (
		<>
			<h1>create new blog</h1>
			<form onSubmit={onCreate}>
				<div>
					Title:
					<input
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						id="title"
					/>
				</div>
				<div>
					Author:
					<input
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
						id="author"
					/>
				</div>
				<div>
					Url:
					<input
						value={url}
						onChange={(event) => setUrl(event.target.value)}
						id="url"
					/>
				</div>
				<button type="submit">save</button>
			</form>
		</>
	);
};

export default BlogForm;
