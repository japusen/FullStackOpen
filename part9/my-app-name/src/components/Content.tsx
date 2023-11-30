interface Course {
	name: string;
	exerciseCount: number;
}

const Content = ({ parts }: { parts: Course[] }) => {
	return (
		<ul>
			{parts.map((part: Course) => (
				<li key={part.name}>
					{part.name} {part.exerciseCount}
				</li>
			))}
		</ul>
	);
};

export default Content;
