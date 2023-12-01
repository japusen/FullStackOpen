import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services/diariesService";
import DiaryEntries from "./components/DiaryEntries";

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

	return (
		<div>
			<h1>Diary Entries</h1>
			<DiaryEntries diaryEntries={diaryEntries} />
		</div>
	);
}

export default App;
