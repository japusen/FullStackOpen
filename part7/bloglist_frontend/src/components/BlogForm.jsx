import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ toggle }) => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const onCreate = (event) => {
		event.preventDefault();
		dispatch(
			createBlog(
				{
					title,
					author,
					url,
				},
				user
			)
		);
		toggle();
		setTitle("");
		setAuthor("");
		setUrl("");
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
