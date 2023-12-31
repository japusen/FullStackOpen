import { useField } from "../hooks";

const CreateNew = (props) => {
	const [content, contentReset] = useField("text", "content");
	const [author, authorReset] = useField("text", "author");
	const [info, infoReset] = useField("text", "info");

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
	};

	const handleReset = (e) => {
		e.preventDefault();
		contentReset();
		authorReset();
		infoReset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	);
};

export default CreateNew;
