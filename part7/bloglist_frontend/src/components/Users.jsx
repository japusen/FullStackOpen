import { useSelector } from "react-redux";

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
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
