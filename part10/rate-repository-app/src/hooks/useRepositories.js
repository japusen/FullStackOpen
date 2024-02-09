import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import SORT from "../utils/Sort";

const ORDER_BY = {
	LATEST: "CREATED_AT",
	RATING: "RATING_AVERAGE",
};

const ORDER_DIRECTION = {
	ASC: "ASC",
	DESC: "DESC",
};

const useRepositories = (sort, keyword) => {
	let variables;

	switch (sort) {
		case SORT.HIGHEST_RATED:
			variables = {
				orderBy: ORDER_BY.RATING,
				orderDirection: ORDER_DIRECTION.DESC,
			};
			break;
		case SORT.LOWEST_RATED:
			variables = {
				orderBy: ORDER_BY.RATING,
				orderDirection: ORDER_DIRECTION.ASC,
			};
			break;
		default:
			variables = {
				orderBy: ORDER_BY.LATEST,
				orderDirection: ORDER_DIRECTION.DESC,
			};
	}

	if (keyword) {
		variables = { searchKeyword: keyword, ...variables };
	}

	const { loading, error, data } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: variables,
	});

	return loading || error ? {} : data;
};

export default useRepositories;
