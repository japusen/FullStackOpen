import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const EntryView = ({
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
			{entry.diagnosisCodes ? (
				<ul>
					{entry.diagnosisCodes.map((code) => (
						<DiagnosisView
							key={code}
							code={code}
							diagnoses={diagnoses}
						/>
					))}
				</ul>
			) : (
				<></>
			)}
		</div>
	);
};

const DiagnosisView = ({
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
			{patient && diagnoses ? (
				<>
					<PatientInfo patient={patient} />

					<h3>entries</h3>
					{patient.entries.map((entry) => (
						<EntryView
							key={entry.id}
							entry={entry}
							diagnoses={diagnoses}
						/>
					))}
				</>
			) : (
				<>Patient Not Found</>
			)}
		</div>
	);
};

export default PatientPage;
