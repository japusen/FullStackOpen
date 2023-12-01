import { Entry, Diagnosis } from "../../types";

const EntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	return (
		<div>
			<p>
				{entry.date} <em>{entry.description}</em>
			</p>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map((code) => (
						<DiagnosisDetails
							key={code}
							code={code}
							diagnoses={diagnoses}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

const DiagnosisDetails = ({
	code,
	diagnoses,
}: {
	code: string;
	diagnoses: Diagnosis[];
}) => {
	const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);

	return (
		<li key={code}>
			{code} {diagnosis ? diagnosis.name : null}
		</li>
	);
};

export default EntryDetails;
