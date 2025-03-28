import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
