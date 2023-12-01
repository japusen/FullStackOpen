import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();
	}, []);

	// const match = useMatch("/patients/:id");
	// const patient = match
	// 	? patients.find((patient) => patient.id === match.params.id)
	// 	: null;

	return (
		<div className="App">
			<Container>
				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>
				<Button
					component={Link}
					to="/"
					variant="contained"
					color="primary"
				>
					Home
				</Button>
				<Divider hidden />
				<Routes>
					<Route
						path="/"
						element={
							<PatientListPage
								patients={patients}
								setPatients={setPatients}
							/>
						}
					/>
					<Route path="/patients/:id" element={<PatientPage />} />
				</Routes>
			</Container>
		</div>
	);
};

export default App;
