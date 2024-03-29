import { Platform } from "react-native";

const theme = {
	colors: {
		textPrimary: "#24292e",
		textSecondary: "#586069",
		primary: "#0366d6",
		white: "#fff",
		containerBackground: "#24292e",
		mainBackground: "#e1e4e8",
		cardBackground: "white",
		languageBackground: "#0366d6",
		error: "#d73a4a",
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.select({
			android: "Roboto",
			ios: "Arial",
			default: "System",
		}),
	},
	fontWeights: {
		normal: "400",
		bold: "700",
	},
	avatar: {
		tinyLogo: {
			width: 50,
			height: 50,
		},
		logo: {
			width: 66,
			height: 58,
			borderRadius: 10,
		},
	},
};

export default theme;
