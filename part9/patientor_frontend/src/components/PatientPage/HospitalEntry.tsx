import { Diagnosis, HospitalEntry } from "../../types";
import { DiagnosisDetails } from "./EntryDetails";

const HospitalEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: HospitalEntry;
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
			<p>
				Discharge: {entry.discharge.date} {entry.discharge.criteria}
			</p>
			<p>Diagnosed by {entry.specialist}</p>
		</div>
	);
};

export default HospitalEntryDetails;
