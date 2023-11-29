export interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	target: number;
	average: number;
}

interface ExerciseValues {
	target: number;
	hours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
	if (args.length < 4) throw new Error("Not enough arguments");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_a, _b, target, ...hours] = args;
	const exerciseHours = hours.map((v) => Number(v));
	if (!isNaN(Number(target)) && !exerciseHours.some(isNaN)) {
		return {
			target: Number(target),
			hours: exerciseHours,
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

export const calculateExercises = (
	exerciseHours: number[],
	target: number
): Result => {
	let periodLength = 0;
	let trainingDays = 0;
	let totalHours = 0;

	exerciseHours.forEach((dailyExercise) => {
		periodLength += 1;
		if (dailyExercise > 0) {
			trainingDays += 1;
			totalHours += dailyExercise;
		}
	});

	const average = totalHours / periodLength;

	return {
		periodLength,
		trainingDays,
		success: average >= target,
		target,
		average,
	};
};

try {
	const { target, hours } = parseExerciseArguments(process.argv);
	console.log(calculateExercises(hours, target));
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
