import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

import { ALL_PERSONS, PERSON_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving same person twice
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqByName(allPersons.concat(addedPerson)),
		};
	});
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);
	const client = useApolloClient();
	const [token, setToken] = useState(null);

	useSubscription(PERSON_ADDED, {
		onData: ({ data, client }) => {
			const addedPerson = data.data.personAdded;
			notify(`${addedPerson.name} added`);

			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
		},
	});

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	if (!token) {
		return (
			<>
				<Notify errorMessage={errorMessage} />
				<LoginForm setToken={setToken} setError={notify} />
			</>
		);
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	);
};

export default App;
