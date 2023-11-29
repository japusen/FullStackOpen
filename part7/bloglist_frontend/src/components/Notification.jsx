import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 10,
	};
	return (
		<>
			{notification && (
				<Alert severity="info" style={style}>
					{notification}
				</Alert>
			)}
		</>
	);
};

export default Notification;
