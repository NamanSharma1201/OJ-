import axios from "axios";

axios.defaults.withCredentials = true;


const baseURL = import.meta.env.VITE_PROBLEM_BASE_URL;


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
export const createProblem = async (problem) => {
    try {
        console.log(problem);
        const response = await axios.post(`${baseURL}/create`, problem);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateProblemStats = async (problemID, submissions, accuracy, correctSubmission) => {
    try {
        // console.log(problemID, submissions, accuracy, correctSubmission);
        const response = await axios.patch(
            `${baseURL}/update/${problemID}`,
            { problemID, submissions, accuracy, correctSubmission }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
