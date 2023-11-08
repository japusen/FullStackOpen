const Header = ({ title }) => <h1>{title}</h1>;

const Total = ({ sum }) => <p>Total of {sum} exercises</p>;

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
		<Total sum={parts.reduce((sum, part) => sum + part.exercises, 0)} />
	</>
);

const Course = ({ course }) => {
	return (
		<>
			<Header title={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

export default Course;
