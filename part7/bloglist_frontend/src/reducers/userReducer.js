import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		clearUser(state, action) {
			return null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			dispatch(setUser(user));
		}
	};
};

export const login = (userObject) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(userObject);
			window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
		} catch (exception) {
			dispatch(setNotification("invalid username or password"));
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		window.localStorage.removeItem("loggedBlogUser");
		dispatch(setUser(null));
		dispatch(setNotification(""));
	};
};

export default userSlice.reducer;
