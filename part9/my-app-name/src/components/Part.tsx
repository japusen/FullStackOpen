import { CoursePart } from "../types";

const noMargin = { margin: 0 };
const divStyle = { marginBottom: 20 };

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case "basic":
			return (
				<div style={divStyle}>
					<h4 style={noMargin} key={part.name}>
						{part.name} {part.exerciseCount}
					</h4>
					<p style={noMargin}>
						<em>{part.description}</em>
					</p>
				</div>
			);
		case "group":
			return (
				<div style={divStyle}>
					<h4 style={noMargin} key={part.name}>
						{part.name} {part.exerciseCount}
					</h4>
					<p style={noMargin}>
						Group projects: {part.groupProjectCount}
					</p>
				</div>
			);
		case "background":
			return (
				<div style={divStyle}>
					<h4 style={noMargin} key={part.name}>
						{part.name} {part.exerciseCount}
					</h4>
					<p style={noMargin}>
						<em>{part.description}</em>
					</p>
					<p style={noMargin}>submit to {part.backgroundMaterial}</p>
				</div>
			);
		case "special":
			return (
				<div style={divStyle}>
					<h4 style={noMargin} key={part.name}>
						{part.name} {part.exerciseCount}
					</h4>
					<p style={noMargin}>
						<em>{part.description}</em>
					</p>
					<p style={noMargin}>
						required skills:
						{part.requirements.map(
							(requirement: string) => ` ${requirement},`
						)}
					</p>
				</div>
			);
	}
};

export default Part;
