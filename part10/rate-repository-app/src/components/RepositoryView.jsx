import { useParams } from "react-router-native";
import { View, StyleSheet, Pressable } from "react-native";
import { openURL } from "expo-linking";

import useSingleRepository from "../hooks/useSingleRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	card: {
		display: "flex",
		backgroundColor: theme.colors.cardBackground,
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

const RepositoryView = () => {
	const { repoId } = useParams();
	const { repository } = useSingleRepository(repoId);

	if (repository) {
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
	}
};

export default RepositoryView;
