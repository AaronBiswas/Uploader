import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  
import { register } from "../services/auth";
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success('Registration successful! Please login.');
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.username?.[0] 
        || error.response?.data?.email?.[0]
        || error.response?.data?.password?.[0]
        || error.response?.data?.phone_number?.[0]
        || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input 
                type="text" 
                name="username" 
                placeholder="Choose a username" 
                className="input input-bordered w-full" 
                value={formData.username}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                className="input input-bordered w-full" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Create a password" 
                className="input input-bordered w-full" 
                value={formData.password}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input 
                type="tel" 
                name="phone_number"
                placeholder="Enter your phone number" 
                className="input input-bordered w-full" 
                value={formData.phone_number}
                onChange={handleChange} 
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Sign Up</button>
            </div>
          </form>
          <div className="text-center mt-4">
            Already have an account? 
            <Link to="/" className="link link-primary ml-1">Login</Link>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
