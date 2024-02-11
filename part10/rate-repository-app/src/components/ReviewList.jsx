import { View, StyleSheet, FlatList } from "react-native";

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
});

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

const ReviewList = ({ reviews, header = <></>, extraData = {} }) => {
	return (
		<FlatList
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={header}
			extraData={extraData}
		/>
	);
};

export default ReviewList;
