import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import Navbar from "./Navbar";
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      toast.success('Login successful!');
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      setError(err.response?.data?.detail || "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl p-6">
          <div className="my-8">
            <h1 className="justify-center text-center text-2xl font-bold">
              Welcome to <span className="text-indigo-600">Up</span>Load
            </h1>
            <h2 className="pt-6 text-center text-2xl font-bold">Login</h2>
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-10">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
            <div className="flex justify-around mt-4">
              <p>
                New User?{" "}
                <Link to="/signup" className="link link-primary">
                  Sign up here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
