import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW);

	const createReview = async ({
		ownerName,
		repositoryName,
		rating,
		text,
	}) => {
		const payload = mutate({
			variables: { ownerName, repositoryName, rating, text },
		});
		return payload;
	};

	return [createReview, result];
};

export default useCreateReview;
