/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import {
	clearNotification,
	setNotification,
} from "../reducers/notificationReducer";

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

	return (
		<ul>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => {
						dispatch(voteForAnecdote(anecdote.id));
						dispatch(
							setNotification(`voted for '${anecdote.content}'`)
						);
						setTimeout(() => {
							dispatch(clearNotification());
						}, 2000);
					}}
				/>
			))}
		</ul>
	);
};

export default AnecdoteList;
