/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<li>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</li>
	);
};

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => state);
	const sortedAnecdotes = anecdotes
		.sort((a, b) => a.votes - b.votes)
		.reverse();

	return (
		<ul>
			{sortedAnecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => dispatch(voteForAnecdote(anecdote.id))}
				/>
			))}
		</ul>
	);
};

export default AnecdoteList;
