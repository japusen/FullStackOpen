import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<Patient>();

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getPatient(id);
				setPatient(patient);
			}
		};
		void fetchPatient();
	}, [id]);

	return (
		<div>
			{patient ? (
				<>
					<h1>{patient.name}</h1>
					{patient.dateOfBirth && <p>DOB: {patient.dateOfBirth}</p>}
					<p>Gender: {patient.gender}</p>
					{patient.ssn && <p>ssn: {patient.ssn}</p>}
					<p>Occupation: {patient.occupation}</p>
				</>
			) : (
				<>Patient Not Found</>
			)}
		</div>
	);
};

export default PatientPage;
