import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ setNewFilter }) => {
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value.toLowerCase());
	};

	return (
		<div>
			filter shown with <input onChange={handleFilterChange}></input>
		</div>
	);
};

const PersonForm = ({
	addNewPerson,
	handlePhoneNumberChange,
	handleNameChange,
}) => {
	return (
		<form onSubmit={addNewPerson}>
			<div>
				name: <input onChange={handleNameChange} />
			</div>
			<div>
				number: <input onChange={handlePhoneNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ persons }) => {
	return (
		<>
			{persons.map((person) => (
				<Person key={person.id} person={person} />
			))}
		</>
	);
};

const Person = ({ person }) => (
	<>
		<p>
			{person.name} {person.number}
		</p>
	</>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhoneNumber, setNewPhoneNumber] = useState("");
	const [filter, setNewFilter] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	}, []);

	const addNewPerson = (event) => {
		event.preventDefault();

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const newPerson = {
				name: newName,
				number: newPhoneNumber,
				id: persons.length + 1,
			};
			setPersons(persons.concat(newPerson));
		}

		setNewName("");
		setNewPhoneNumber("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneNumberChange = (event) => {
		setNewPhoneNumber(event.target.value);
	};

	const filteredPeople =
		filter === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(filter)
			  );

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter setNewFilter={setNewFilter} />
			<h2>add a new</h2>
			<PersonForm
				addNewPerson={addNewPerson}
				handleNameChange={handleNameChange}
				handlePhoneNumberChange={handlePhoneNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPeople} />
		</div>
	);
};

export default App;
