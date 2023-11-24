import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		appendBlog(state, action) {
			state.push(action.payload);
		},
		likeBlog(state, action) {
			const likedBlog = action.payload;
			return state.map((blog) =>
				blog.id === likedBlog.id ? likedBlog : blog
			);
		},
		removeBlog(state, action) {
			const deletedBlog = action.payload;
			return state.filter((blog) => blog.id !== deletedBlog.id);
		},
	},
});

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (blog, user) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog);
		dispatch(appendBlog({ ...newBlog, user }));
	};
};

export const like = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(blog.id, {
			...blog,
			likes: blog.likes + 1,
		});
		dispatch(likeBlog(updatedBlog));
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		await blogService.deleteBlog(blog.id);
		dispatch(removeBlog(blog));
	};
};

export default blogSlice.reducer;
