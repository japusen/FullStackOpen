import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientInfo = ({ patient }: { patient: Patient }) => {
	return (
		<div>
			<h2>{patient.name}</h2>
			{patient.dateOfBirth && <p>DOB: {patient.dateOfBirth}</p>}
			<p>Gender: {patient.gender}</p>
			{patient.ssn && <p>ssn: {patient.ssn}</p>}
			<p>Occupation: {patient.occupation}</p>
		</div>
	);
};

const PatientPage = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<Patient>();
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getPatient(id);
				setPatient(patient);
			}
		};
		const fetchDiagnoses = async () => {
			const diagnoses = await diagnosesService.getAll();
			setDiagnoses(diagnoses);
		};
		fetchPatient();
		fetchDiagnoses();
	}, [id]);

	return (
		<div>
			{patient && diagnoses && (
				<>
					<PatientInfo patient={patient} />

					<h3>entries</h3>
					{patient.entries.map((entry) => (
						<div
							style={{
								border: "solid 1px black",
								marginBottom: 10,
								padding: 10,
							}}
						>
							<EntryDetails
								key={entry.id}
								entry={entry}
								diagnoses={diagnoses}
							/>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default PatientPage;
