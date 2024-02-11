import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
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
	button: {
		display: "flex",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		padding: 20,
		marginBottom: 20,
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
	},
	userActionContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		marginHorizontal: 10,
		backgroundColor: theme.colors.cardBackground,
	},
	actionItem: {
		flex: 1,
	},
});

const UserActions = ({ repositoryId, reviewId, refetch }) => {
	const navigate = useNavigate();
	const deleteReview = useDeleteReview();

	const onDelete = async () => {
		Alert.alert(
			"Delete Review",
			"Are you sure you want to delete this review?",
			[
				{
					text: "Cancel",
					onPress: () => {},
					style: "cancel",
				},
				{
					text: "OK",
					onPress: async () => {
						try {
							await deleteReview(reviewId);
							refetch();
						} catch (e) {
							console.log(e);
						}
					},
				},
			]
		);
	};

	return (
		<View style={styles.userActionContainer}>
			<Pressable
				style={{ ...styles.button, ...styles.actionItem }}
				onPress={() => {
					navigate(`/repository/${repositoryId}`);
				}}
			>
				<Text color="onContainer">View Repository</Text>
			</Pressable>
			<Pressable
				style={{
					...styles.button,
					...styles.deleteButton,
					...styles.actionItem,
				}}
				onPress={onDelete}
			>
				<Text color="onContainer">Delete Review</Text>
			</Pressable>
		</View>
	);
};

const ReviewItem = ({ review, hasUserActions, refetch }) => {
	const reviewDate = review.createdAt.slice(0, 10);

	return (
		<View>
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
			{hasUserActions && (
				<UserActions
					repositoryId={review.repositoryId}
					reviewId={review.id}
					refetch={refetch}
				/>
			)}
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({
	reviews,
	header = <></>,
	extraData = {},
	hasUserActions = false,
	refetch = () => {},
}) => {
	return (
		<FlatList
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<ReviewItem
					review={item}
					hasUserActions={hasUserActions}
					refetch={refetch}
				/>
			)}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={header}
			extraData={extraData}
		/>
	);
};

export default ReviewList;
