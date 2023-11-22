import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
	const queryClient = useQueryClient();
	const voteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
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
