import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField } from "@mui/material";

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
			<h1 style={{ marginBottom: 0 }}>create new blog</h1>
			<form onSubmit={onCreate}>
				<div>
					<TextField
						required
						label="Title"
						margin="normal"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						id="title"
					/>
				</div>
				<div>
					<TextField
						required
						label="Author"
						margin="normal"
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
						id="author"
					/>
				</div>
				<div>
					<TextField
						required
						label="Url"
						margin="normal"
						value={url}
						onChange={(event) => setUrl(event.target.value)}
						id="url"
					/>
				</div>
				<Button
					style={{ marginBottom: 10 }}
					variant="contained"
					color="primary"
					type="submit"
				>
					save
				</Button>
			</form>
		</>
	);
};

export default BlogForm;
