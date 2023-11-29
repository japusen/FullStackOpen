import {
	Table,
	TableBody,
	TableContainer,
	TableCell,
	TableRow,
} from "@mui/material";
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
		<TableContainer>
			<Table>
				<TableBody>
					{sortedBlogs.map((blog) => (
						<TableRow style={itemStyle} key={blog.id}>
							<TableCell>
								<Link to={`/blog/${blog.id}`}>
									{blog.title}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BlogList;
