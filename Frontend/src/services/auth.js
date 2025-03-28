import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}token/`, { email, password });
    localStorage.setItem("token", response.data.access);
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
    localStorage.removeItem("token");
};
