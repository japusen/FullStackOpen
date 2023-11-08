import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ quote, votes }) => {
	return <p>{`${quote} has ${votes} votes`}</p>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];
	const max = anecdotes.length;
	const randomNumber = () => Math.floor(Math.random() * max);

	const handleNextAnecdote = () => setSelected(randomNumber());

	const handleVote = (index) => () => {
		const incrementedArray = [...votes];
		incrementedArray[index] += 1;
		setVotes(incrementedArray);

		if (incrementedArray[index] > votes[mostVotesIndex]) {
			setMostVotesIndex(index);
		}
	};

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(max).fill(0));
	const [mostVotesIndex, setMostVotesIndex] = useState(0);

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<Anecdote quote={anecdotes[selected]} votes={votes[selected]} />
			<Button handleClick={handleVote(selected)} text="vote" />
			<Button handleClick={handleNextAnecdote} text="next anecdote" />
			<h1>Anecdote with most votes</h1>
			<Anecdote
				quote={anecdotes[mostVotesIndex]}
				votes={votes[mostVotesIndex]}
			/>
		</div>
	);
};

export default App;
