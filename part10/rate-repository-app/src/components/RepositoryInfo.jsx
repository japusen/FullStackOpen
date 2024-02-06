import { useParams } from "react-router-native";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { openURL } from "expo-linking";

import useSingleRepository from "../hooks/useSingleRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	card: {
		display: "flex",
		backgroundColor: theme.colors.cardBackground,
		marginBottom: 10,
	},
	button: {
		display: "flex",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		padding: 20,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	separator: {
		height: 10,
	},
	review: {
		backgroundColor: theme.colors.cardBackground,
		padding: 15,
		display: "flex",
		flexDirection: "row",
		gap: 10,
	},
	ratingContainer: {
		width: 50,
		height: 50,
		alignSelf: "flex-start",
		padding: 5,
		borderWidth: 3,
		borderStyle: "solid",
		borderColor: theme.colors.primary,
		borderRadius: 25,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	rating: {
		alignSelf: "center",
	},
	reviewDetails: {
		display: "flex",
		gap: 5,
		flexShrink: 1,
	},
});

const RepositoryInfo = ({ repository }) => {
	return (
		<View style={styles.card}>
			<RepositoryItem item={repository}></RepositoryItem>
			<Pressable
				style={styles.button}
				onPress={() => {
					openURL(repository.url);
				}}
			>
				<Text color="onContainer">Open in GitHub</Text>
			</Pressable>
		</View>
	);
};

const ReviewItem = ({ review }) => {
	// Single review item
	const reviewDate = review.createdAt.slice(0, 10);
	return (
		<View style={styles.review}>
			<View style={styles.ratingContainer}>
				<Text
					style={styles.rating}
					fontSize="subheading"
					fontWeight="bold"
					color="primary"
				>
					{review.rating}
				</Text>
			</View>
			<View style={styles.reviewDetails}>
				<Text fontSize="subheading" fontWeight="bold">
					{review.user.username}
				</Text>
				<Text>{reviewDate}</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
	const { repoId } = useParams();
	const { repository } = useSingleRepository(repoId);

	const repositoryInfo = repository ? repository : {};

	const reviews = repository
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<RepositoryInfo repository={repositoryInfo} />
			)}
		/>
	);
};

export default SingleRepository;
