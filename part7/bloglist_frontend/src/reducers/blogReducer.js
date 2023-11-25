import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			const blogs = action.payload;
			return blogs;
		},
		appendBlog(state, action) {
			const newBlog = action.payload;
			state.push(newBlog);
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
		try {
			const blogs = await blogService.getAll();
			dispatch(setBlogs(blogs));
		} catch {
			setNotification("unable to load blogs");
		}
	};
};

export const createBlog = (blog, user) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog);
			dispatch(appendBlog({ ...newBlog, user }));
			dispatch(
				setNotification(`added blog: ${blog.title} by ${blog.author}`)
			);
		} catch (exception) {
			dispatch(setNotification(exception));
		}
	};
};

export const like = (blog) => {
	return async (dispatch) => {
		try {
			const updatedBlog = await blogService.update(blog.id, {
				...blog,
				likes: blog.likes + 1,
			});
			dispatch(likeBlog(updatedBlog));
			dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`));
		} catch (error) {
			dispatch(setNotification("unable to like blog"));
		}
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.deleteBlog(blog.id);
			dispatch(removeBlog(blog));
			dispatch(
				setNotification(`Deleted '${blog.title}' by ${blog.author}`)
			);
		} catch (error) {
			dispatch(setNotification("unable to delete blog"));
		}
	};
};

export default blogSlice.reducer;
