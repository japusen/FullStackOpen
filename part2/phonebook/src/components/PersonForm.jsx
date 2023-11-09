const PersonForm = ({
	nameInputValue,
	phoneInputValue,
	addNewPerson,
	handlePhoneNumberChange,
	handleNameChange,
}) => {
	return (
		<form onSubmit={addNewPerson}>
			<div>
				name:{" "}
				<input value={nameInputValue} onChange={handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input
					value={phoneInputValue}
					onChange={handlePhoneNumberChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
