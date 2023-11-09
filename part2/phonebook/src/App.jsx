import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", phoneNumber: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhoneNumber, setNewPhoneNumber] = useState("");

	const addNewPerson = (event) => {
		event.preventDefault();

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const newPerson = { name: newName, phoneNumber: newPhoneNumber };
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

	return (
		<div>
			<h2>Phonebook</h2>
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
			{persons.map((person) => (
				<p key={person.name}>
					{person.name} {person.phoneNumber}
				</p>
			))}
		</div>
	);
};

export default App;
