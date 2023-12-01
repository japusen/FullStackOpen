import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { DiagnosisDetails } from "./EntryDetails";

const OccupationHealthcareEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: OccupationalHealthcareEntry;
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
			<p>Employer: {entry.employerName}</p>
			{entry.sickLeave && (
				<>
					<p>Sick Leave: </p>
					<p>
						{entry.sickLeave.startDate} - {entry.sickLeave.endDate}
					</p>
				</>
			)}
			<p>Diagnosed by {entry.specialist}</p>
		</div>
	);
};

export default OccupationHealthcareEntryDetails;
