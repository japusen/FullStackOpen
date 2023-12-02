import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";

const EditAuthor = (props) => {
	const [birthYear, setBirthYear] = useState("");

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors
				.map((e) => e.message)
				.join("\n");
			props.setError(messages);
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const name = formJson.name;

		updateAuthor({
			variables: { name, birthYear: Number(birthYear) },
		});

		setBirthYear("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<select name="name">
					{props.authors.map((author) => (
						<option key={author.id} value={author.name}>
							{author.name}
						</option>
					))}
				</select>
				<div>
					born
					<input
						type="number"
						value={birthYear}
						onChange={({ target }) => setBirthYear(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default EditAuthor;
