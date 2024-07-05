import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:5000/api";

export const runCode = async (language, code, input) => {
    try {
        const output = await axios.post(
            `${baseURL}/run`,
            { code: code, language: language, input: input }
        );
        return output.data;
    } catch (e) {
        throw e.response.data;
    }
}


export const submitCode = async (language, code, input) => {
    try {
        const output = await axios.post(
            `${baseURL}/submit`,
            { code: code, language: language, input: input }
        );
        return output.data;
    } catch (e) {
        throw e.response.data;
    }
}