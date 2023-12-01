import { Entry, Diagnosis } from "../../types";
import HealthCheckEntryDetails from "./HealthCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationHealthcareEntryDetails from "./OccupationalHealthcareEntry";

const EntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	switch (entry.type) {
		case "Hospital":
			return HospitalEntryDetails({ entry, diagnoses });
		case "OccupationalHealthcare":
			return OccupationHealthcareEntryDetails({ entry, diagnoses });
		case "HealthCheck":
			return HealthCheckEntryDetails({ entry, diagnoses });
	}
};

export const DiagnosisDetails = ({
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
