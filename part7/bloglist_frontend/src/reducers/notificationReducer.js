import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		updateNotification(state, action) {
			return action.payload;
		},
		clearNotification(state, action) {
			return "";
		},
	},
});

export const { updateNotification, clearNotification } =
	notificationSlice.actions;

export const setNotification = (notification) => {
	return async (dispatch) => {
		dispatch(updateNotification(notification));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 3000);
	};
};

export default notificationSlice.reducer;
