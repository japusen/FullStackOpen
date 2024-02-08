import { gql } from "@apollo/client";

export const SIGN_IN = gql`
	mutation SignIn($username: String!, $password: String!) {
		authenticate(
			credentials: { username: $username, password: $password }
		) {
			accessToken
		}
	}
`;

export const SIGN_UP = gql`
	mutation SignUp($username: String!, $password: String!) {
		createUser(user: { username: $username, password: $password }) {
			id
			username
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation CreateReview(
		$ownerName: String!
		$repositoryName: String!
		$rating: Int!
		$text: String
	) {
		createReview(
			review: {
				ownerName: $ownerName
				repositoryName: $repositoryName
				rating: $rating
				text: $text
			}
		) {
			createdAt
			id
			rating
			text
		}
	}
`;
