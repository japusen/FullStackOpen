import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";

const EditAuthor = (props) => {
	const [name, setName] = useState("");
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

		updateAuthor({
			variables: { name, birthYear: Number(birthYear) },
		});

		setName("");
		setBirthYear("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
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
