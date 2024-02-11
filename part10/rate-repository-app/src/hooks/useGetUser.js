import { GET_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useGetUser = (includeReviews = false) => {
	const { loading, error, data } = useQuery(GET_USER, {
		variables: { includeReviews },
		fetchPolicy: "cache-and-network",
	});

	return loading || error ? {} : data;
};

export default useGetUser;
