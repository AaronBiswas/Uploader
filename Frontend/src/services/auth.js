import axios from "axios";

// Use relative URL in production, absolute URL in development
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? "http://127.0.0.1:8000/api/" 
    : "https://uploader-ylgd.onrender.com/api/";

// Create an axios instance for authenticated requests
export const axiosAuth = axios.create();

// Authentication
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}token/`, { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);
    
    // Set the default Authorization header for future requests
    axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}users/`, userData);
    return response.data;
};

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return null;
    
    const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh,
    });
    const { access } = response.data;
    localStorage.setItem("token", access);
    
    // Update the Authorization header
    axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    
    return access;
};

// Token Management
export const getToken = () => localStorage.getItem("token");

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    // Clear the Authorization header
    delete axiosAuth.defaults.headers.common["Authorization"];
};

// User Profile Management
export const getUserProfile = async () => {
    const response = await axiosAuth.get(`${API_URL}profile/`);
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await axiosAuth.put(`${API_URL}profile/`, profileData);
    return response.data;
};

// Set up axios interceptors for the authenticated instance
axiosAuth.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const token = await refreshToken();
                if (token) {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosAuth(originalRequest);
                }
            } catch (refreshError) {
                // If refresh token fails, log out the user
                logout();
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

// Initialize auth header if token exists
const token = getToken();
if (token) {
    axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Set up default headers
axiosAuth.defaults.headers.common["Content-Type"] = "application/json";
