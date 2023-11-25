import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
	const blogs = useSelector(({ blogs }) => blogs);
	const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

	return (
		<>
			{sortedBlogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</>
	);
};

export default BlogList;
