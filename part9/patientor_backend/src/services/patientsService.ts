import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient, Entry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
	return patients;
};

const getPatient = (id: string): Patient | undefined =>
	patients.find((p) => p.id === id);

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		entries: new Array<Entry>(),
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getPatient,
	getNonSensitivePatients,
	addPatient,
};
