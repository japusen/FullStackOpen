const NoteForm = ({ newNote, onNoteChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<input value={newNote} onChange={onNoteChange} />
			<button type="submit">save</button>
		</form>
	);
};

export default NoteForm;
