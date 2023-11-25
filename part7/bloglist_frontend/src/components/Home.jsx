import { useRef } from "react";

import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = () => {
	const blogFormRef = useRef();

	const toggleFormVisibility = () => {
		blogFormRef.current.toggleVisibility();
	};

	return (
		<div>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<BlogForm toggle={toggleFormVisibility} />
			</Togglable>
			<BlogList />
		</div>
	);
};

export default Home;
