import { GET_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useGetUser = () => {
	const { loading, error, data } = useQuery(GET_USER);

	return loading || error ? {} : data.me;
};

export default useGetUser;
