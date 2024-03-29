import { useParams } from "react-router-native";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { openURL } from "expo-linking";
import { useState } from "react";

import useSingleRepository from "../hooks/useSingleRepository";
import useCreateReview from "../hooks/useCreateReview";
import RepositoryItem from "./RepositoryItem";
import ReviewFormContainer from "./ReviewForm";
import ReviewList from "./ReviewList";
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
});

const RepositoryHeader = ({ repository, refetch }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [createReview] = useCreateReview();

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
			closeForm();
			refetch();
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

			{showReviewForm ? (
				<ReviewFormContainer onSubmit={onSubmit} onCancel={closeForm} />
			) : (
				<Pressable
					style={styles.button}
					onPress={() => {
						setShowReviewForm(true);
					}}
				>
					<Text color="onContainer">Add a review</Text>
				</Pressable>
			)}
		</View>
	);
};

const SingleRepository = () => {
	const { repoId } = useParams();
	const { repository, refetch, fetchMore } = useSingleRepository(repoId);

	const reviews = repository
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<>
			{repository && (
				<ReviewList
					reviews={reviews}
					header={
						<RepositoryHeader
							repository={repository}
							refetch={refetch}
						/>
					}
					extraData={reviews}
					onEndReach={onEndReach}
				/>
			)}
		</>
	);
};

export default SingleRepository;
