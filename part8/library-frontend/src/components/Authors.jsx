import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditAuthor from "./EditAuthor";

const Authors = (props) => {
	const authorResult = useQuery(ALL_AUTHORS);

	if (!props.show) {
		return null;
	}

	if (authorResult.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authorResult.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			{props.token && (
				<>
					<h3>update author</h3>
					<EditAuthor
						authors={authorResult.data.allAuthors}
						setError={props.setError}
					/>
				</>
			)}
		</div>
	);
};

export default Authors;
