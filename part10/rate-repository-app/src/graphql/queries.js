import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query Repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
		) {
			edges {
				node {
					id
					name
					ownerName
					createdAt
					fullName
					reviewCount
					ratingAverage
					forksCount
					stargazersCount
					description
					language
					ownerAvatarUrl
				}
				cursor
			}
		}
	}
`;

export const GET_USER = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						repositoryId
						createdAt
						rating
						user {
							username
						}
						text
					}
				}
			}
		}
	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query SingleRepo($id: ID!) {
		repository(id: $id) {
			id
			ownerName
			name
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			ownerAvatarUrl
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`;
