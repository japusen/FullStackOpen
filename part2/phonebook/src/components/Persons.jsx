const Persons = ({ persons, onDelete }) => {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={person.id}
					person={person}
					onDelete={() => onDelete(person.id)}
				/>
			))}
		</>
	);
};

const Person = ({ person, onDelete }) => (
	<>
		<p>
			{person.name} {person.number}
		</p>
		<button onClick={onDelete}>delete</button>
	</>
);

export default Persons;
