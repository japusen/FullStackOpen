import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
	// helper that is used to eliminate saving same book twice
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		};
	});
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState("authors");
	const [genre, setGenre] = useState("");
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 3000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useEffect(() => {
		const storedToken = window.localStorage.getItem("library-user-token");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;
			notify(`${addedBook.title} added`);

			updateCache(
				client.cache,
				{ query: ALL_BOOKS, variables: { genre } },
				addedBook
			);
		},
	});

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{!token && (
					<button onClick={() => setPage("login")}>login</button>
				)}
				{token && <button onClick={logout}>logout</button>}
			</div>

			<Notify errorMessage={errorMessage} />
			<Authors
				show={page === "authors"}
				token={token}
				setError={notify}
			/>
			<Books
				show={page === "books"}
				genre={genre}
				setGenre={setGenre}
				token={token}
				setError={notify}
			/>
			<LoginForm
				show={page === "login"}
				setToken={setToken}
				setError={notify}
				changePage={() => setPage("authors")}
			/>
		</div>
	);
};

export default App;
