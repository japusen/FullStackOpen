import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: creatAnecdote,
		onSuccess: (newAmecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.concat(newAmecdote)
			);
			dispatch({
				type: "UPDATE",
				payload: `created anecdote '${newAmecdote.content}'`,
			});
			setTimeout(() => {
				dispatch({ type: "CLEAR" });
			}, 3000);
		},
	});

	const onCreate = async (event) => {
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
