const Notification = ({ notification }) => {
	if (notification !== "")
		return (
			<>
				<p>{notification}</p>
			</>
		);
};

export default Notification;
