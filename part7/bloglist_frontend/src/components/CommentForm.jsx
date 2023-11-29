import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";

const CommentForm = ({ id }) => {
	const dispatch = useDispatch();

	const [comment, setComment] = useState("");

	const onCreate = (event) => {
		event.preventDefault();
		dispatch(addComment(id, comment));
		setComment("");
	};

	return (
		<>
			<form onSubmit={onCreate}>
				<div>
					<input
						value={comment}
						onChange={(event) => setComment(event.target.value)}
						id="comment"
						required
					/>
					<button style={{ marginLeft: 5 }} type="submit">
						add comment
					</button>
				</div>
			</form>
		</>
	);
};

export default CommentForm;
