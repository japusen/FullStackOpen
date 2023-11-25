import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

describe("rendering a blog", () => {
	let container;

	const blog = {
		title: "title",
		author: "author",
		url: "url.com",
		likes: 99,
		user: {
			id: 1,
			username: "username",
			name: "name",
		},
	};

	const mockHandler = jest.fn();

	beforeEach(() => {
		container = render(<Blog blog={blog} onLike={mockHandler} />).container;
	});

	test("does not display blog details by default", () => {
		const noDetails = container.querySelector("#view");
		expect(noDetails).not.toHaveStyle("display: none");

		const details = container.querySelector("#hidden");
		expect(details).toHaveStyle("display: none");
	});

	test("displays details after clicking view button", async () => {
		const user = userEvent.setup();

		const noDetails = container.querySelector("#view");
		expect(noDetails).not.toHaveStyle("display: none");

		const details = container.querySelector("#hidden");
		expect(details).toHaveStyle("display: none");

		const viewButton = screen.getByText("view");
		await user.click(viewButton);

		expect(noDetails).toHaveStyle("display: none");
		expect(details).not.toHaveStyle("display: none");
	});

	test("like function called when like button is clicked", async () => {
		const user = userEvent.setup();

		const noDetails = container.querySelector("#view");
		expect(noDetails).not.toHaveStyle("display: none");

		const details = container.querySelector("#hidden");
		expect(details).toHaveStyle("display: none");

		const viewButton = screen.getByText("view");
		await user.click(viewButton);

		const likeButton = screen.getByText("like");

		await user.click(likeButton);
		expect(mockHandler.mock.calls).toHaveLength(1);

		await user.click(likeButton);
		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});
