import axios from "axios";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaryEntries = async () => {
	const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
	return response.data;
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {
	const response = await axios.post<DiaryEntry>(baseUrl, object);
	return response.data;
};
