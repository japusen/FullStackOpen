const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.ksn2elb.mongodb.net/personsApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	Person.find({}).then((persons) => {
		console.log("Phonebook:");
		persons.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});

	person.save().then((result) => {
		console.log(
			`added ${person.name} number ${person.number} to phonebook`
		);
		mongoose.connection.close();
	});
} else {
	console.log("invalid parameters");
	mongoose.connection.close();
}
