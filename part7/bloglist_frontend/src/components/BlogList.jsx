import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
	const blogs = useSelector(({ blogs }) => blogs);
	const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

	const itemStyle = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: "solid",
		borderWidth: 1,
		marginTop: 5,
	};

	return (
		<>
			{sortedBlogs.map((blog) => (
				<div style={itemStyle} key={blog.id}>
					<Link to={`/blog/${blog.id}`}>{blog.title}</Link>
				</div>
			))}
		</>
	);
};

export default BlogList;
