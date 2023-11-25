import userService from "../services/users";
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setUsers(state, action) {
			const users = action.payload;
			return users;
		},
	},
});

export const { setUsers } = blogSlice.actions;

export const getAllUsers = () => {
	return async (dispatch) => {
		try {
			const users = await userService.getAll();
			dispatch(setUsers(users));
		} catch (error) {
			console.log("unable to fetch users");
		}
	};
};

export default blogSlice.reducer;
