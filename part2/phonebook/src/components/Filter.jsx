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

export default Filter;
