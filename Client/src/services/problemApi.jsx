import axios from "axios";

axios.defaults.withCredentials = true;


const baseURL = "http://127.0.0.1:8000/api/problem";


export const getAllProblems = async () => {
    try {
        const response = await axios.get(`${baseURL}/all`);
        return response.data;
    } catch (error) {
        // Handle errors, log them or throw them as needed
        console.error("Error fetching problems:", error);
        throw error;
    }
};

export const getProblemById = async (problemId) => {
    try {
        const response = await axios.get(`${baseURL}/${problemId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching problem:", error);
        throw error;
    }
}