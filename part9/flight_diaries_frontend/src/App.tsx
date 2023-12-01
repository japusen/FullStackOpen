import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services/diariesService";
import DiaryEntries from "./components/DiaryEntries";
import EntryForm from "./components/EntryForm";

function App() {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);
	useEffect(() => {
		const fetchData = async () => {
			const entries = await getAllDiaryEntries();
			setDiaryEntries(entries);
		};
		fetchData();
	}, []);

	const addEntry = (entry: NonSensitiveDiaryEntry): void => {
		setDiaryEntries(diaryEntries.concat(entry));
	};

	return (
		<div>
			<EntryForm addEntry={addEntry} />
			<h2>Diary Entries</h2>
			<DiaryEntries diaryEntries={diaryEntries} />
		</div>
	);
}

export default App;
