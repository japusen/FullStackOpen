import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id) => {
	const { loading, error, data, refetch, fetchMore } = useQuery(
		GET_SINGLE_REPOSITORY,
		{
			variables: { id },
			fetchPolicy: "cache-and-network",
		}
	);

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				id,
			},
		});
	};

	return {
		repository: data?.repository,
		fetchMore: handleFetchMore,
		refetch,
		loading,
	};
};

export default useSingleRepository;
