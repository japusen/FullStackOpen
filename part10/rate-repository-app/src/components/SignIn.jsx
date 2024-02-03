import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
	username: "",
	password: "",
};

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

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
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry={true}
			/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text style={styles.submitText}>Sign in</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const navigate = useNavigate();

	const [signIn, result] = useSignIn();
	const onSubmit = async (values) => {
		const { username, password } = values;
		try {
			await signIn({ username, password });
			console.log("token", result.data);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
