import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Note from "./components/Note";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, Department of Computer Science, University of Helsinki
				2023
			</em>
		</div>
	);
};

const App = () => {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [user, setUser] = useState(null);
	const noteFormRef = useRef();

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials);
			window.localStorage.setItem(
				"loggedNoteappUser",
				JSON.stringify(user)
			);
			noteService.setToken(user.token);
			setUser(user);
		} catch (exception) {
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const hook = () => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	};

	useEffect(hook, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const addNote = async (noteObject) => {
		try {
			const returnedNote = await noteService.create(noteObject);
			setNotes(notes.concat(returnedNote));
			noteFormRef.current.toggleVisibility();
		} catch (error) {
			setErrorMessage(`Unable to add note`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(
					notes.map((note) => (note.id !== id ? note : returnedNote))
				);
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{user === null ? (
				<Togglable buttonLabel="login">
					<LoginForm login={handleLogin} />
				</Togglable>
			) : (
				<div>
					<p>{user.name} logged in</p>
					<Togglable buttonLabel="new note" ref={noteFormRef}>
						<NoteForm createNote={addNote} />
					</Togglable>
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<Footer />
		</div>
	);
};

export default App;
