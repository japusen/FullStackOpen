import { useState } from "react";

const Blog = ({ blog, onLike, onDelete }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const like = () => {
		onLike(blog.id, {
			...blog,
			likes: blog.likes + 1,
		});
	};

	const deleteBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			onDelete(blog.id);
		}
	};

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>hide</button>
				<div>{blog.url}</div>
				<div>
					Likes {blog.likes}
					<button onClick={like}>like</button>
				</div>
				<div>{blog.user.username}</div>
				{onDelete && <button onClick={deleteBlog}>delete</button>}
			</div>
		</div>
	);
};
export default Blog;
