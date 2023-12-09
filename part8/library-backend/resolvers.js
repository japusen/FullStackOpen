import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
import jwt from "jsonwebtoken";

import Book from "./models/book.js";
import Author from "./models/author.js";
import User from "./models/user.js";

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			return args.genre
				? Book.find({ genres: args.genre }).populate("author")
				: Book.find({}).populate("author");
		},
		allAuthors: async () => {
			return Author.find({});
		},
		allGenres: async () => {
			const books = await Book.find({});
			const genres = new Set();
			books.forEach((book) => {
				book.genres.forEach((genre) => {
					genres.add(genre);
				});
			});
			return [...genres].sort();
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			let author = await Author.findOne({ name: args.author });

			if (!author) {
				author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (error) {
					throw new GraphQLError(
						"Adding book failed: could not save author",
						{
							extensions: {
								code: "BAD_USER_INPUT",
								invalidArgs: args.author,
								error,
							},
						}
					);
				}
			}

			const book = new Book({ ...args, author });
			try {
				await book.save();
			} catch (error) {
				throw new GraphQLError("Adding book failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
						error,
					},
				});
			}

			pubsub.publish("BOOK_ADDED", { bookAdded: book });
			return book;
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const author = await Author.findOne({ name: args.name });
			author.born = args.setBornTo;
			try {
				await author.save();
			} catch (error) {
				throw new GraphQLError("Editing author failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.setBornTo,
						error,
					},
				});
			}
			return author;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favortieGenre: args.favortieGenre,
			});

			return user.save().catch((error) => {
				throw new GraphQLError("Creating the user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new GraphQLError("wrong credentials", {
					extensions: { code: "BAD_USER_INPUT" },
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

export default resolvers;
