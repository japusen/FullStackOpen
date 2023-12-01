import { Diagnosis, HealthCheckEntry } from "../../types";
import { DiagnosisDetails } from "./EntryDetails";

const HealthCheckEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: HealthCheckEntry;
	diagnoses: Diagnosis[];
}) => {
	return (
		<div>
			<p>{entry.type}</p>
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
			<p>Health Check Rating: {entry.healthCheckRating}</p>
			<p>Diagnosed by {entry.specialist}</p>
		</div>
	);
};

export default HealthCheckEntryDetails;
