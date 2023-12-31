import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE":
			return action.payload;
		case "CLEAR":
			return "";
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	return useContext(NotificationContext)[0];
};

export const useNotify = () => {
	const dispatch = useContext(NotificationContext)[1];
	return (payload) => {
		dispatch({ type: "UPDATE", payload });
		setTimeout(() => {
			dispatch({ type: "CLEAR" });
		}, 5000);
	};
};

export default NotificationContext;
