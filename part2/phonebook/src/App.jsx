import { useState } from "react";

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
				phoneNumber: newPhoneNumber,
				id: persons.length,
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

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value.toLowerCase());
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
			<div>
				filter shown with <input onChange={handleFilterChange}></input>
			</div>
			<h2>add a new</h2>
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
			<h2>Numbers</h2>
			{filteredPeople.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
