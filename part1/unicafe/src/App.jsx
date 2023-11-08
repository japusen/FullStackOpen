import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ label, value }) => (
	<tr>
		<td>{label}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad, total }) => {
	if (total === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<table>
			<tbody>
				<StatisticLine label="good" value={good} />
				<StatisticLine label="neutral" value={neutral} />
				<StatisticLine label="bad" value={bad} />
				<StatisticLine label="all" value={total} />
				<StatisticLine label="average" value={(good - bad) / total} />
				<StatisticLine
					label="positive"
					value={`${(good / total) * 100}%`}
				/>
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);

	const handleGoodFeedback = () => {
		setGood(good + 1);
		setTotal(total + 1);
	};

	const handleNeutralFeedback = () => {
		setNeutral(neutral + 1);
		setTotal(total + 1);
	};

	const handleBadFeedback = () => {
		setBad(bad + 1);
		setTotal(total + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGoodFeedback} text="good" />
			<Button handleClick={handleNeutralFeedback} text="neutral" />
			<Button handleClick={handleBadFeedback} text="bad" />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} total={total} />
		</div>
	);
};

export default App;
