const BlogForm = ({
	title,
	author,
	url,
	onTitleChange,
	onAuthorChange,
	onUrlChange,
	onSubmit,
}) => {
	return (
		<>
			<h1>create new blog</h1>
			<form onSubmit={onSubmit}>
				<div>
					Title:
					<input value={title} onChange={onTitleChange} />
				</div>
				<div>
					Author:
					<input value={author} onChange={onAuthorChange} />
				</div>
				<div>
					Url:
					<input value={url} onChange={onUrlChange} />
				</div>
				<button type="submit">save</button>
			</form>
		</>
	);
};

export default BlogForm;
