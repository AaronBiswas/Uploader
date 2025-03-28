import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import FileUpload from "./components/FileUpload.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/Signup.jsx"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/files" element={<FileUpload />} />
            </Routes>
        </BrowserRouter>
    );
}
