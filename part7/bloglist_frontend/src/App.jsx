import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { getAllUsers } from "./reducers/usersReducer";
import { useEffect } from "react";
import {
	BrowserRouter as Router,
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

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const blogs = useSelector(({ blogs }) => blogs);
	const users = useSelector(({ users }) => users);

	const userMatch = useMatch("/user/:id");
	const selectedUser = userMatch
		? users.find((user) => user.id === String(userMatch.params.id))
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

	return (
		<div>
			{user && (
				<>
					<h1>blogs</h1>
					<p>
						Logged in as {user.name}
						<button onClick={logoutUser}>logout</button>
					</p>
					<Notification />
				</>
			)}
			<Routes>
				<Route
					path="/"
					element={user ? <Home /> : <Navigate replace to="/login" />}
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
				{/* <Route path="/notes/:id" element={<Note note={note} />} />
		<Route path="/notes" element={<Notes notes={notes} />} />
		<Route
			path="/users"
			element={user ? <Users /> : <Navigate replace to="/login" />}
		/>
		<Route path="/login" element={<Login onLogin={login} />} />
		 */}
			</Routes>
		</div>
	);
};

export default App;
