import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
	username: "",
	password: "",
};

const signUpInitialValues = {
	username: "",
	password: "",
	passwordConfirm: "",
};

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

const signUpValidationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
	passwordConfirm: yup
		.string()
		.required("Password confirmation is required")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
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
	toggleSignUp: {
		display: "flex",
		alignItems: "center",
	},
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.formContainer}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry
			/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text style={styles.submitText}>Sign in</Text>
			</Pressable>
		</View>
	);
};

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.formContainer}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry
			/>
			<FormikTextInput
				name="passwordConfirm"
				placeholder="Password confirmation"
				secureTextEntry
			/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text style={styles.submitText}>Sign up</Text>
			</Pressable>
		</View>
	);
};

export const SignInContainer = ({ onSubmit }) => {
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

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={signUpInitialValues}
			onSubmit={onSubmit}
			validationSchema={signUpValidationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignIn = () => {
	const navigate = useNavigate();
	const [showSignIn, setShowSignIn] = useState(true);

	const [signIn] = useSignIn();
	const [signUp] = useSignUp();

	const onSignIn = async (values) => {
		const { username, password } = values;
		try {
			await signIn({ username, password });
			navigate("/", { replace: true });
		} catch (e) {
			console.log(e);
		}
	};

	const onSignUp = async (values) => {
		const { username, password } = values;
		try {
			await signUp({ username, password });
			await signIn({ username, password });
			navigate("/", { replace: true });
		} catch (e) {
			console.log(e);
		}
	};

	return showSignIn ? (
		<View>
			<SignInContainer onSubmit={onSignIn} />
			<Pressable
				onPress={() => setShowSignIn(false)}
				style={styles.toggleSignUp}
			>
				<Text color="primary" fontWeight="bold">
					Sign Up Here
				</Text>
			</Pressable>
		</View>
	) : (
		<SignUpContainer onSubmit={onSignUp} />
	);
};

export default SignIn;
