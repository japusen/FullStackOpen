const express = require("express");
const app = express();

app.use(express.json());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/info", (request, response) => {
	response.send(
		`<p>Phonebook has info for ${
			persons.length
		} people</p><p>${new Date().toLocaleTimeString()}</p>`
	);
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((p) => p.id === id);

	if (!person) {
		response.send(404).end();
	} else {
		response.send(person);
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((p) => p.id !== id);

	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const id = Math.random() * 100000;
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "content missing",
		});
	} else if (persons.find((p) => p.name === body.name)) {
		return response.status(400).json({
			error: "person already exists",
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: id,
	};

	persons = persons.concat(person);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT);
