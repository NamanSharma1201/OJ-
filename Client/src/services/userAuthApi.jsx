import axios from "axios";
axios.defaults.withCredentials = true
const baseURL = "http://127.0.0.1:8000/api";

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${baseURL}/user/signup`, user, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${baseURL}/user/login`, user, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const sendPasswordResetEmail = async (user) => {
    try {
        const response = await axios.post(`${baseURL}/user/reset-password`, user, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const resetPassword = async ({ id, token, password }) => {
    try {
        const response = await axios.post(
            `${baseURL}/user/reset/${id}/${token}`,
            { password },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const changePassword = async (newPassword) => {
    try {
        const response = await axios.post(`${baseURL}/user/changepassword`, { newPassword }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
