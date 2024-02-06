import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query {
		repositories {
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
	query {
		me {
			id
			username
		}
	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query SingleRepo($id: ID!) {
		repository(id: $id) {
			id
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			ownerAvatarUrl
			url
		}
	}
`;
