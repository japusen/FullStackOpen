import { useEffect, useState } from "react";
import personService from "./services/person";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhoneNumber, setNewPhoneNumber] = useState("");
	const [filter, setNewFilter] = useState("");
	const [notification, setNotification] = useState(null);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addNewPerson = (event) => {
		event.preventDefault();

		const person = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);
		if (person) {
			if (
				window.confirm(
					`${person.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const updatedPerson = {
					...person,
					number: newPhoneNumber,
				};
				personService
					.update(person.id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id === returnedPerson.id ? returnedPerson : p
							)
						);
						setNotification(`Updated ${person.name}'s number`);
						setTimeout(() => {
							setNotification(null);
						}, 5000);
					})
					.catch(() => {
						setNotification(
							`Information of ${person.name} has already been removed from server`
						);
						setIsError(true);
						setPersons(persons.filter((p) => p.id !== person.id));
						setTimeout(() => {
							setNotification(null);
							setIsError(false);
						}, 5000);
					});
			}
		} else {
			const newPerson = {
				name: newName,
				number: newPhoneNumber,
			};

			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNotification(`Added ${returnedPerson.name}`, false);
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			});
		}

		setNewName("");
		setNewPhoneNumber("");
	};

	const removePerson = (id) => {
		const person = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${person.name}?`)) {
			personService.remove(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
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
			<Notification message={notification} isError={isError} />
			<Filter setNewFilter={setNewFilter} />
			<h2>add a new</h2>
			<PersonForm
				nameInputValue={newName}
				phoneInputValue={newPhoneNumber}
				addNewPerson={addNewPerson}
				handleNameChange={handleNameChange}
				handlePhoneNumberChange={handlePhoneNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPeople} onDelete={removePerson} />
		</div>
	);
};

export default App;
