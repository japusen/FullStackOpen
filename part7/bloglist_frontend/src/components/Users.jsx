import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
	const users = useSelector(({ users }) => users);
	return (
		<div>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<th>user</th>
						<th>number of blogs created</th>
					</tr>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/user/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
