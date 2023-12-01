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
					<h2>{patient.name}</h2>
					{patient.dateOfBirth && <p>DOB: {patient.dateOfBirth}</p>}
					<p>Gender: {patient.gender}</p>
					{patient.ssn && <p>ssn: {patient.ssn}</p>}
					<p>Occupation: {patient.occupation}</p>
					<h3>entries</h3>

					{patient.entries.map((entry) => (
						<div key={entry.id}>
							<p>
								{entry.date} <em>{entry.description}</em>
							</p>
							{entry.diagnosisCodes ? (
								<ul>
									{entry.diagnosisCodes.map((code) => (
										<li key={code}>{code}</li>
									))}
								</ul>
							) : (
								<></>
							)}
						</div>
					))}
				</>
			) : (
				<>Patient Not Found</>
			)}
		</div>
	);
};

export default PatientPage;
