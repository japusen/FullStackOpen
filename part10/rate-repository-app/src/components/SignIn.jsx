import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";

const initialValues = {
	username: "",
	password: "",
};

const styles = StyleSheet.create({
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

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.formContainer}>
			<FormikTextInput
				name="username"
				placeholder="Username"
				style={styles.formInput}
			/>
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry={true}
				style={styles.formInput}
			/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text style={styles.submitText}>Sign in</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
