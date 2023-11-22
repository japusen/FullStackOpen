/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import anecdoteService from "../services/anecdotes";
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

	const vote = async (id) => {
		const anecdoteToUpdate = anecdotes.find(
			(anecdote) => anecdote.id === id
		);
		const votedAnecdote = await anecdoteService.update(id, {
			...anecdoteToUpdate,
			votes: anecdoteToUpdate.votes + 1,
		});
		dispatch(voteForAnecdote(votedAnecdote));
		dispatch(setNotification(`voted for '${votedAnecdote.content}'`));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 2000);
	};

	return (
		<ul>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => {
						vote(anecdote.id);
					}}
				/>
			))}
		</ul>
	);
};

export default AnecdoteList;
