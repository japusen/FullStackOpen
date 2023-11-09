import { useState } from "react";

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
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newPhoneNumber, setNewPhoneNumber] = useState("");
	const [filter, setNewFilter] = useState("");

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
