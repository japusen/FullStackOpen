/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
	const anecdotes = useSelector(({ filter, anecdotes }) =>
		anecdotes
			.filter((anecdote) => anecdote.content.includes(filter))
			.sort((a, b) => b.votes - a.votes)
	);

	const vote = async (id, content) => {
		dispatch(voteFor(id));
		dispatch(setNotification(`you voted for '${content}'`, 3));
	};

	return (
		<ul>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => {
						vote(anecdote.id, anecdote.content);
					}}
				/>
			))}
		</ul>
	);
};

export default AnecdoteList;
