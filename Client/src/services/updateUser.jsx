import axios from "axios";

const baseURL = import.meta.env.VITE_USER_BASE_URL;

export const updateSolvedProblems = async (email, problemID) => {
    try {

        const response = await axios.post(`${baseURL}/updateStats`, { email, problemID });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
