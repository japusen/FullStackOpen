import { StyleSheet, View, Text } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import RepositoryInfo from "./RepositoryInfo";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.mainBackground,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route
					path="/repository/:repoId"
					element={<RepositoryInfo />}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

export default Main;
