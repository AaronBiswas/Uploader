import axios from "axios";
import { axiosAuth } from "./auth";

const API_URL = "http://127.0.0.1:8000/api/";

// File Management
export const fetchFiles = async () => {
    const response = await axiosAuth.get(`${API_URL}files/`);
    return response.data;
};

export const uploadFile = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file, file.name);  // Added file.name as third parameter
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
        // Add onUploadProgress for tracking upload progress
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (onProgress) {
                onProgress(percentCompleted);
            }
        }
    };
    
    const response = await axiosAuth.post(`${API_URL}files/`, formData, config);
    return response.data;
};

export const deleteFile = async (fileId) => {
    const response = await axiosAuth.delete(`${API_URL}files/${fileId}/`);
    return response.data;
};

// Address Management
export const fetchAddresses = async () => {
    const response = await axiosAuth.get(`${API_URL}addresses/`);
    return response.data;
};

export const addAddress = async (addressData) => {
    const response = await axiosAuth.post(`${API_URL}addresses/`, addressData);
    return response.data;
};

export const updateAddress = async (addressId, addressData) => {
    const response = await axiosAuth.put(`${API_URL}addresses/${addressId}/`, addressData);
    return response.data;
};

export const deleteAddress = async (addressId) => {
    const response = await axiosAuth.delete(`${API_URL}addresses/${addressId}/`);
    return response.data;
};

export const setPrimaryAddress = async (addressId) => {
    const response = await axiosAuth.put(`${API_URL}addresses/${addressId}/`, {
        is_primary: true
    });
    return response.data;
};

// Dashboard Statistics
export const fetchDashboardStats = async () => {
    const response = await axiosAuth.get(`${API_URL}dashboard/`);
    return response.data;
};

// Error Handler
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return {
            status: error.response.status,
            message: error.response.data.detail || 'An error occurred',
            errors: error.response.data
        };
    } else if (error.request) {
        // Request made but no response
        return {
            status: 503,
            message: 'Service unavailable'
        };
    } else {
        // Error setting up request
        return {
            status: 500,
            message: error.message
        };
    }
};
