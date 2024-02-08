import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const initialValues = {
	rating: "",
	review: "",
};

const validationSchema = yup.object().shape({
	rating: yup
		.number()
		.required("A rating is required")
		.min(0, "Rating must be greater than 0")
		.max(100, "Rating must be less than 100"),
	review: yup.string(),
});

const styles = StyleSheet.create({
	card: {
		display: "flex",
		backgroundColor: theme.colors.cardBackground,
		marginBottom: 10,
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
	cancelButton: {
		display: "flex",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: theme.colors.error,
		padding: 20,
	},
	submitText: {
		color: theme.colors.white,
	},
});

const ReviewForm = ({ onSubmit, onCancel }) => {
	return (
		<View style={styles.formContainer}>
			<FormikTextInput name="rating" placeholder="Rating" />
			<FormikTextInput name="review" placeholder="Review" multiline />
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text style={styles.submitText}>Submit Review</Text>
			</Pressable>
			<Pressable onPress={onCancel} style={styles.cancelButton}>
				<Text style={styles.submitText}>Cancel</Text>
			</Pressable>
		</View>
	);
};

export const ReviewFormContainer = ({ onSubmit, onCancel }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<ReviewForm onSubmit={handleSubmit} onCancel={onCancel} />
			)}
		</Formik>
	);
};

export default ReviewFormContainer;
