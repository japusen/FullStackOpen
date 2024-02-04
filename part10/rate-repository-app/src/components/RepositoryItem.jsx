import { View, Image, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
	card: {
		display: "flex",
		gap: 20,
		padding: 20,
		backgroundColor: theme.colors.cardBackground,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 20,
	},
	details: {
		display: "flex",
		alignItems: "flex-start",
		flexShrink: 1,
		gap: 10,
	},
	languageTag: {
		borderRadius: 5,
		backgroundColor: theme.colors.languageBackground,
		padding: 5,
	},
	stats: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
	},
	statItem: {
		display: "flex",
		gap: 10,
		alignItems: "center",
	},
});

const RepositoryItem = ({ item }) => {
	return (
		<View testID="repositoryItem" style={styles.card}>
			<View style={styles.header}>
				<Image
					style={theme.avatar.logo}
					source={{
						uri: item.ownerAvatarUrl,
					}}
				/>
				<View style={styles.details}>
					<Text fontSize={"subheading"}>{item.fullName}</Text>
					<Text color={"textSecondary"}>{item.description}</Text>
					<View style={styles.languageTag}>
						<Text color={"tag"}>{item.language}</Text>
					</View>
				</View>
			</View>

			<View style={styles.stats}>
				<Statistic title={"Stars"} number={item.stargazersCount} />
				<Statistic title={"Forks"} number={item.forksCount} />
				<Statistic title={"Reviews"} number={item.reviewCount} />
				<Statistic title={"Rating"} number={item.ratingAverage} />
			</View>
		</View>
	);
};

const Statistic = ({ title, number }) => {
	return (
		<View style={styles.statItem}>
			{number > 1000 ? (
				<Text fontWeight={"bold"}>
					{Math.round((number / 1000) * 10) / 10}k
				</Text>
			) : (
				<Text fontWeight={"bold"}>{number}</Text>
			)}
			<Text>{title}</Text>
		</View>
	);
};

export default RepositoryItem;
