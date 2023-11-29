import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const weight = Number(req.query.weight);
	const height = Number(req.query.height);

	if (isNaN(weight) || isNaN(height)) {
		return res.send({
			error: "malformatted parameters",
		});
	}

	const bmi = calculateBmi(height, weight);
	return res.send({
		weight,
		height,
		bmi,
	});
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const body = req.body;
	console.log("body", body);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (!body.daily_exercises || !body.target)
		return res.send({ error: "parameters missing" });

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	if (isNaN(Number(body.target)) || body.daily_exercises.some(isNaN))
		return res.send({ error: "malformatted parameters" });

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
	const result = calculateExercises(body.daily_exercises, body.target);
	return res.send(result);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
