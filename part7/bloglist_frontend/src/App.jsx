import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { getAllUsers } from "./reducers/usersReducer";
import { useEffect } from "react";
import {
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import { AppBar, Button, Toolbar, Container } from "@mui/material";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const blogs = useSelector(({ blogs }) => blogs);
	const users = useSelector(({ users }) => users);

	const userMatch = useMatch("/user/:id");
	const selectedUser = userMatch
		? users.find((user) => user.id === String(userMatch.params.id))
		: null;

	const blogMatch = useMatch("/blog/:id");
	const selectedBlog = blogMatch
		? blogs.find((blog) => blog.id === String(blogMatch.params.id))
		: null;

	const logoutUser = () => {
		dispatch(logout());
	};

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		dispatch(initializeUser());
	}, []);

	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	const navStyle = {
		display: "flex",
		alignItems: "center",
		gap: 10,
		background: "gray",
		paddingLeft: 10,
		paddingRight: 10,
	};

	return (
		<Container>
			<div>
				{user && (
					<div>
						<AppBar position="static">
							<Toolbar
								style={{
									display: "flex",
								}}
							>
								<Button color="inherit">
									<Link to="/">blogs</Link>
								</Button>
								<Button color="inherit">
									<Link to="/users">users</Link>
								</Button>
								<div
									style={{
										display: "flex",
										alignItems: "Center",
										gap: 10,
										flex: 1,
										justifyContent: "flex-end",
									}}
								>
									<p>Logged in as {user.name}</p>
									<button onClick={logoutUser}>logout</button>
								</div>
								<div>
									<div style={navStyle}></div>
								</div>
							</Toolbar>
						</AppBar>
						<h1>blog app</h1>
						<Notification />
					</div>
				)}
				<Routes>
					<Route
						path="/"
						element={
							user ? <Home /> : <Navigate replace to="/login" />
						}
					/>
					<Route
						path="/login"
						element={user ? <Navigate replace to="/" /> : <Login />}
					/>
					<Route path="/users" element={<Users />} />
					<Route
						path="/user/:id"
						element={<User user={selectedUser} />}
					/>
					<Route
						path="/blog/:id"
						element={<Blog blog={selectedBlog} />}
					/>
				</Routes>
			</div>
		</Container>
	);
};

export default App;
