import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntries = ({
	diaryEntries,
}: {
	diaryEntries: NonSensitiveDiaryEntry[];
}) => {
	const articleStyle = { border: "solid 1px black", margin: 10, padding: 5 };
	return diaryEntries.map((entry) => (
		<article style={articleStyle} key={entry.id}>
			<p>{entry.date}</p>
			<p>Weather: {entry.weather}</p>
			<p> Visibility: {entry.visibility}</p>
		</article>
	));
};

export default DiaryEntries;
