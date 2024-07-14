import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_COMMENT_BASE_URL;

export const createComment = async ({ id, content, name }) => {
    try {
        const response = await axios.post(`${baseURL}/${id}`, { content, name });

        return response.data;

    } catch (error) {
        throw error;
    }
}


export const getComments = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/${id}`);

        return response.data;

    } catch (error) {
        throw error;
    }
}