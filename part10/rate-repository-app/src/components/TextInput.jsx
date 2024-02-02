import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
	inputError: {
		borderColor: theme.colors.error,
	},
});

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style, error && styles.inputError];

	return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
