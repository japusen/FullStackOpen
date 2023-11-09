import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addNewName = (event) => {
		event.preventDefault();

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const newPerson = { name: newName };
			setPersons(persons.concat(newPerson));
		}

		setNewName("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNewName}>
				<div>
					name: <input onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
