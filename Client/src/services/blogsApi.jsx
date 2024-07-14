import axios from "axios";

axios.defaults.withCredentials = true; // Ensure credentials are sent with requests

const baseURL = import.meta.env.VITE_BLOG_BASE_URL;


export const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${baseURL}/all`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBlog = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const likeBlog = async (id) => {
    try {
        const response = await axios.patch(`${baseURL}/like`, { id: id });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createBlog = async ({ title, content, author }) => {
    try {
        const response = await axios.post(`${baseURL}/create`, { title, content, author });
        return response.data;
    } catch (error) {
        throw error;
    }
};
