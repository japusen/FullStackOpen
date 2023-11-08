const Header = (props) => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	);
};

const Content = (props) => {
	return (
		<>
			<Part
				title={props.parts[0].title}
				numExercises={props.parts[0].numExercises}
			/>
			<Part
				title={props.parts[1].title}
				numExercises={props.parts[1].numExercises}
			/>
			<Part
				title={props.parts[2].title}
				numExercises={props.parts[2].numExercises}
			/>
		</>
	);
};

const Part = (props) => {
	return (
		<>
			<p>
				{props.title} {props.numExercises}
			</p>
		</>
	);
};

const Footer = (props) => {
	return (
		<>
			<p>Number of exercises {props.total}</p>
		</>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{ title: "Fundamentals of React", numExercises: 10 },
			{ title: "Using props to pass data", numExercises: 7 },
			{ title: "State of a component", numExercises: 14 },
		],
	};
	const total = course.parts.reduce(
		(total, part) => total + part.numExercises,
		0
	);
	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Footer total={total} />
		</div>
	);
};

export default App;
