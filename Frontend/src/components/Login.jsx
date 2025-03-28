import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <div className="my-8">
        <h1 className="justify-center text-center text-2xl font-bold">Welcome to <span className="text-indigo-600">Up</span>Load</h1>
        <h2 className="pt-6 text-center text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-10">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-full">Login</button>
          <div className="flex justify-around mt-4">
          <p>New User? <Link to="/signup" className="underline text-blue-500">Sign up here!</Link></p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
