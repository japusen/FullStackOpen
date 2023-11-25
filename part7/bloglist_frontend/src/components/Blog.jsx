import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

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

	const likeBlog = async () => {
		dispatch(like(blog));
	};

	const removeBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog));
		}
	};

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible} className="blog" id="view">
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible} id="hidden">
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>hide</button>
				<div>{blog.url}</div>
				<div>
					Likes {blog.likes}
					<button onClick={likeBlog}>like</button>
				</div>
				<div>{blog.user.username}</div>
				{blog.user.username === user.username && (
					<button onClick={removeBlog}>delete</button>
				)}
			</div>
		</div>
	);
};
export default Blog;
