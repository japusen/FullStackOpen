import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

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
