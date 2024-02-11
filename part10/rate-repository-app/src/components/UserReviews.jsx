import useGetUser from "../hooks/useGetUser";
import ReviewList from "./ReviewList";

const UserReviews = () => {
	const [data, refetch] = useGetUser((includeReviews = true));

	const currentUser = data?.me;

	const reviews = currentUser
		? currentUser.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<>
			{currentUser && (
				<ReviewList
					reviews={reviews}
					hasUserActions
					refetch={refetch}
				/>
			)}
		</>
	);
};

export default UserReviews;
