import useGetUser from "../hooks/useGetUser";
import ReviewList from "./ReviewList";

const UserReviews = () => {
	const { me: currentUser } = useGetUser((includeReviews = true));
	const reviews = currentUser
		? currentUser.reviews.edges.map((edge) => edge.node)
		: [];

	return <>{currentUser && <ReviewList reviews={reviews} />}</>;
};

export default UserReviews;
