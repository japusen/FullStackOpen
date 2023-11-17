import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const onCreate = (event) => {
		event.preventDefault();
		createBlog({
			title,
			author,
			url,
		});
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
					/>
				</div>
				<div>
					Author:
					<input
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
					/>
				</div>
				<div>
					Url:
					<input
						value={url}
						onChange={(event) => setUrl(event.target.value)}
					/>
				</div>
				<button type="submit">save</button>
			</form>
		</>
	);
};

export default BlogForm;
