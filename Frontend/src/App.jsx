import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import FileUpload from "./components/FileUpload.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/Signup.jsx"

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error('Please login to access this page', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        return <Navigate to="/" replace />;
    }
    return children;
};

export default function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/files"
                    element={
                        <ProtectedRoute>
                            <FileUpload />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
