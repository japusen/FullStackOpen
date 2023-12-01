import { useState } from "react";
import { Weather, Visibility, NonSensitiveDiaryEntry } from "../types";
import { createDiaryEntry } from "../services/diariesService";

const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 10,
	alignItems: "start",
};

const EntryForm = ({
	addEntry,
}: {
	addEntry: (addEntry: NonSensitiveDiaryEntry) => void;
}) => {
	const [date, setDate] = useState<string>("");
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
	const [comment, setComment] = useState<string>("");

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const returnedEntry = await createDiaryEntry({
			date,
			weather,
			visibility,
			comment,
		});
		addEntry(returnedEntry);

		setWeather(Weather.Sunny);
		setVisibility(Visibility.Great);
		setComment("");
	};

	const changeDate = (event: React.FormEvent<HTMLInputElement>) => {
		setDate(event.currentTarget.value);
	};

	const changeWeather = (event: React.FormEvent<HTMLInputElement>) => {
		let weatherValue;
		switch (event.currentTarget.value) {
			case "sunny":
				weatherValue = Weather.Sunny;
				break;
			case "rainy":
				weatherValue = Weather.Rainy;
				break;
			case "cloudy":
				weatherValue = Weather.Cloudy;
				break;
			case "windy":
				weatherValue = Weather.Windy;
				break;
			case "stormy":
				weatherValue = Weather.Stormy;
				break;
			default:
				weatherValue = Weather.Sunny;
				break;
		}
		setWeather(weatherValue);
	};

	const changeVisibility = (event: React.FormEvent<HTMLInputElement>) => {
		let visibilityValue;
		switch (event.currentTarget.value) {
			case "great":
				visibilityValue = Visibility.Great;
				break;
			case "good":
				visibilityValue = Visibility.Good;
				break;
			case "ok":
				visibilityValue = Visibility.Ok;
				break;
			case "poor":
				visibilityValue = Visibility.Poor;
				break;
			default:
				visibilityValue = Visibility.Great;
				break;
		}
		setVisibility(visibilityValue);
	};

	const changeComment = (event: React.FormEvent<HTMLInputElement>) => {
		setComment(event.currentTarget.value);
	};

	return (
		<>
			<h2>Add Diary Entry</h2>
			<form style={formStyle} onSubmit={onSubmit}>
				<label htmlFor="date">Date</label>
				<input
					type="date"
					name="date"
					id="date"
					required
					onChange={changeDate}
				/>

				<fieldset>
					<legend>Weather</legend>

					<input
						required
						type="radio"
						name="weather"
						id="sunny"
						checked={weather === Weather.Sunny}
						value={Weather.Sunny}
						onChange={changeWeather}
					/>
					<label htmlFor="sunny">Sunny</label>

					<input
						type="radio"
						name="weather"
						id="rainy"
						checked={weather === Weather.Rainy}
						value={Weather.Rainy}
						onChange={changeWeather}
					/>
					<label htmlFor="rainy">Rainy</label>

					<input
						type="radio"
						name="weather"
						id="cloudy"
						checked={weather === Weather.Cloudy}
						value={Weather.Cloudy}
						onChange={changeWeather}
					/>
					<label htmlFor="cloudy">Cloudy</label>

					<input
						type="radio"
						name="weather"
						id="windy"
						checked={weather === Weather.Windy}
						value={Weather.Windy}
						onChange={changeWeather}
					/>
					<label htmlFor="windy">Windy</label>

					<input
						type="radio"
						name="weather"
						id="stormy"
						checked={weather === Weather.Stormy}
						value={Weather.Stormy}
						onChange={changeWeather}
					/>
					<label htmlFor="stormy">Stormy</label>
				</fieldset>

				<fieldset>
					<legend>Visibility</legend>

					<input
						required
						type="radio"
						name="visibility"
						id="great"
						checked={visibility === Visibility.Great}
						value={Visibility.Great}
						onChange={changeVisibility}
					/>
					<label htmlFor="great">Great</label>

					<input
						type="radio"
						name="visibility"
						id="good"
						checked={visibility === Visibility.Good}
						value={Visibility.Good}
						onChange={changeVisibility}
					/>
					<label htmlFor="good">Good</label>

					<input
						type="radio"
						name="visibility"
						id="ok"
						checked={visibility === Visibility.Ok}
						value={Visibility.Ok}
						onChange={changeVisibility}
					/>
					<label htmlFor="ok">Ok</label>

					<input
						type="radio"
						name="visibility"
						id="poor"
						checked={visibility === Visibility.Poor}
						value={Visibility.Poor}
						onChange={changeVisibility}
					/>
					<label htmlFor="poor">Poor</label>
				</fieldset>

				<label htmlFor="comment">Comment</label>
				<input
					required
					type="text"
					id="comment"
					value={comment}
					onChange={changeComment}
				/>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</>
	);
};

export default EntryForm;
