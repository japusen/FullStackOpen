import { GET_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useGetUser = (includeReviews = false) => {
	const { loading, error, data, refetch } = useQuery(GET_USER, {
		variables: { includeReviews },
		fetchPolicy: "cache-and-network",
	});

	return [data, refetch];
};

export default useGetUser;
