import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:5000/api";

export const runCode = async (language, code, input) => {
    try {
        const response = await axios.post(
            `${baseURL}/run`,
            { code, language, input }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const submitCode = async (language, code, hiddenInputs, hiddenOutputs) => {
    try {
        const response = await axios.post(
            `${baseURL}/submit`,
            { inputs: hiddenInputs, outputs: hiddenOutputs, code, language }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


