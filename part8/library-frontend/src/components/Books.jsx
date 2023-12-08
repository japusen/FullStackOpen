import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import NewBook from "./NewBook";

const Books = (props) => {
	const allGenres = useQuery(ALL_GENRES);
	const bookResult = useQuery(ALL_BOOKS, {
		variables: { genre: props.genre },
	});

	if (!props.show) {
		return null;
	}

	const updateView = () => {
		bookResult.refetch(props.genre);
	};

	return (
		<div>
			<h2>books</h2>
			{allGenres.data && (
				<select
					value={props.genre}
					onChange={(event) => {
						props.setGenre(event.target.value);
						updateView();
					}}
				>
					<option value={""}>all genres</option>
					{allGenres.data &&
						allGenres.data.allGenres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
				</select>
			)}
			{bookResult.data && (
				<table>
					<tbody>
						<tr>
							<th>title</th>
							<th>author</th>
							<th>published</th>
							<th>genres</th>
						</tr>
						{bookResult.data.allBooks.map((book) => (
							<tr key={book.title}>
								<td>{book.title}</td>
								<td>{book.author.name}</td>
								<td>{book.published}</td>
								<td>{book.genres.join(", ")}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{props.token && (
				<NewBook setError={props.setError} updateBooks={updateView} />
			)}
		</div>
	);
};

export default Books;
