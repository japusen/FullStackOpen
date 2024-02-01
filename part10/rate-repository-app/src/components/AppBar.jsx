import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";

import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 20,
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: theme.colors.containerBackground,
	},
	tabContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 20,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.tabContainer}>
				<Link to="/sign-in">
					<Text color={"onContainer"} fontSize={"subheading"}>
						Sign in
					</Text>
				</Link>
				<Link to="/">
					<Text color={"onContainer"} fontSize={"subheading"}>
						Repositories
					</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;
