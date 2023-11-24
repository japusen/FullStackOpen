import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { like, deleteBlog } from "../reducers/blogReducer";
import Blog from "./Blog";

const BlogList = ({ user }) => {
	const dispatch = useDispatch();
	const blogs = useSelector(({ blogs }) => blogs);
	const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

	const likeBlog = async (blog) => {
		try {
			dispatch(like(blog));
			dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`));
		} catch (error) {
			dispatch(setNotification("unable to like blog"));
		}
	};

	const removeBlog = async (blog) => {
		try {
			dispatch(deleteBlog(blog));
			dispatch(
				setNotification(`Deleted '${blog.title}' by ${blog.author}`)
			);
		} catch (error) {
			dispatch(setNotification("unable to delete blog"));
		}
	};

	return (
		<>
			{sortedBlogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					onLike={likeBlog}
					onDelete={
						blog.user.username === user.username ? removeBlog : null
					}
				/>
			))}
		</>
	);
};

export default BlogList;
