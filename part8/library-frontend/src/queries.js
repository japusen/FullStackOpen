import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query Authors {
		allAuthors {
			id
			name
			born
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	query AllBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			genres
			published
		}
	}
`;

export const ALL_GENRES = gql`
	query {
		allGenres
	}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
		}
	}
`;

export const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $birthYear: Int!) {
		editAuthor(name: $name, setBornTo: $birthYear) {
			name
			born
			bookCount
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
