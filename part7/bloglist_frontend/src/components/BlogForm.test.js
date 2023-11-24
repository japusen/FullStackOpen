import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	const container = render(<BlogForm createBlog={createBlog} />).container;

	const titleInput = container.querySelector("#title");
	const authorInput = container.querySelector("#author");
	const urlInput = container.querySelector("#url");

	await user.type(titleInput, "title");
	await user.type(authorInput, "author");
	await user.type(urlInput, "url.com");

	const sendButton = screen.getByText("save");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe("title");
	expect(createBlog.mock.calls[0][0].author).toBe("author");
	expect(createBlog.mock.calls[0][0].url).toBe("url.com");
});
