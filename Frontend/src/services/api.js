import axios from "axios";
import { getToken } from "./auth";

const API_URL = "http://127.0.0.1:8000/api/";

export const fetchFiles = async () => {
    const response = await axios.get(`${API_URL}files/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_URL}files/`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};
