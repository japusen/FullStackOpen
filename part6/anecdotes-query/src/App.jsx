import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotify } from "./NotificationContext";

const App = () => {
	const queryClient = useQueryClient();
	const notifyWith = useNotify();

	const voteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (changedAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			const updatedAnecdotes = anecdotes.map((anecdote) =>
				anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
			);
			queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
			notifyWith(`anecdote '${changedAnecdote.content}' voted`);
		},
	});

	const handleVote = (anecdote) => {
		voteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1,
		});
	};

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		refetchOnWindowFocus: false,
	});

	if (result.isLoading) {
		return <div>Loading...</div>;
	}

	if (result.isError) {
		return <div>Error loading data from server...</div>;
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
