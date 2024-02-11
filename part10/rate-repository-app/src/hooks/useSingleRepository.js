import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id) => {
	const { loading, error, data, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
		variables: { id },
		fetchPolicy: "cache-and-network",
	});

	return [data, refetch];
};

export default useSingleRepository;
