import { useDispatch, useSelector } from "react-redux";
import { like, deleteBlog } from "../reducers/blogReducer";
import CommentForm from "./CommentForm";

const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const likeBlog = async () => {
		dispatch(like(blog));
	};

	const removeBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog));
		}
	};

	const style = {
		padding: 10,
		border: "solid",
		borderWidth: 1,
		marginTop: 5,
		display: "flex",
		flexDirection: "column",
		gap: 10,
		alignItems: "start",
	};

	if (!blog) return <div>cannot find blog</div>;

	return (
		<div style={style}>
			<h1 style={{ margin: 0 }}>{blog.title}</h1>
			<a href={blog.url}>{blog.url}</a>
			<div>
				{blog.likes} likes
				<button style={{ marginLeft: 10 }} onClick={likeBlog}>
					like
				</button>
			</div>
			<div>
				added by {blog.user.username}
				{blog.user.username === user.username && (
					<button style={{ marginLeft: 10 }} onClick={removeBlog}>
						delete
					</button>
				)}
			</div>
			<h3 style={{ marginBottom: 0 }}>comments</h3>
			<CommentForm id={blog.id} />
			<p style={{ margin: 0 }}>
				number of comments {blog.comments.length}
			</p>
			{blog.comments.map((comment, index) => (
				<li key={index}>{comment}</li>
			))}
		</div>
	);
};
export default Blog;
