import { useParams } from "react-router-native";
import { View, StyleSheet, Pressable, FlatList, Alert } from "react-native";
import { openURL } from "expo-linking";
import { useState } from "react";
import { useNavigate } from "react-router-native";

import useSingleRepository from "../hooks/useSingleRepository";
import useCreateReview from "../hooks/useCreateReview";
import RepositoryItem from "./RepositoryItem";
import ReviewFormContainer from "./ReviewForm";
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
	formContainer: {
		padding: 20,
		display: "flex",
		gap: 15,
	},
	formInput: {
		borderStyle: "solid",
		borderWidth: 1,
		color: theme.colors.textSecondary,
		borderColor: theme.colors.textSecondary,
		borderRadius: 5,
		padding: 10,
	},
	submitButton: {
		display: "flex",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		padding: 20,
	},
	submitText: {
		color: theme.colors.white,
	},
});

const RepositoryInfo = ({ repository }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [createReview] = useCreateReview();
	const navigate = useNavigate();

	const closeForm = () => setShowReviewForm(false);

	const onSubmit = async (values) => {
		const { rating, review } = values;
		try {
			await createReview({
				ownerName: repository.ownerName,
				repositoryName: repository.name,
				rating: parseInt(rating),
				text: review,
			});
			navigate(0, { replace: true });
		} catch (e) {
			console.log(e);
			Alert.alert(
				"Cannot Add Review",
				"You have already reviewed this repository",
				[{ text: "OK", onPress: closeForm }]
			);
		}
	};

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

			{!showReviewForm && (
				<Pressable
					style={styles.button}
					onPress={() => {
						setShowReviewForm(true);
					}}
				>
					<Text color="onContainer">Add a review</Text>
				</Pressable>
			)}

			{showReviewForm && (
				<ReviewFormContainer onSubmit={onSubmit} onCancel={closeForm} />
			)}
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
			ListHeaderComponent={<RepositoryInfo repository={repositoryInfo} />}
			extraData={repository}
		/>
	);
};

export default SingleRepository;
