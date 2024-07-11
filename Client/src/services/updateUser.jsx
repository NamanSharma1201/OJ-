import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/user";

export const updateSolvedProblems = async (email, problemID) => {
    try {

        const response = await axios.post(`${baseURL}/updateStats`, { email, problemID });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
