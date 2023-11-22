import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatAnecdote } from "../requests";
import { useNotify } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const notifyWith = useNotify();

	const newAnecdoteMutation = useMutation({
		mutationFn: creatAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.concat(newAnecdote)
			);
			notifyWith(`created anecdote '${newAnecdote.content}'`);
		},
		onError: (error) => {
			notifyWith(error.response.data.error);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
