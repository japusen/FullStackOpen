import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

import useGetUser from "../hooks/useGetUser";

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

const AppBarTab = ({ text, link }) => {
	return (
		<Link to={link}>
			<Text color={"onContainer"} fontSize={"subheading"}>
				{text}
			</Text>
		</Link>
	);
};

const SignOutTab = ({ signOut }) => {
	return (
		<Pressable onPress={signOut}>
			<Text color={"onContainer"} fontSize={"subheading"}>
				Sign out
			</Text>
		</Pressable>
	);
};

const AppBar = () => {
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();
	const navigate = useNavigate();

	const [data] = useGetUser();
	const currentUser = data?.me;

	const onSignOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
		navigate("/");
	};

	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.tabContainer}>
				{currentUser ? (
					<SignOutTab signOut={onSignOut} />
				) : (
					<AppBarTab text="Sign in" link="/sign-in" />
				)}
				<AppBarTab text="Repositories" link="/" />
				{currentUser && (
					<AppBarTab text="My Reviews" link="/my-reviews" />
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
