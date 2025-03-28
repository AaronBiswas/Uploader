import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/addresses/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setAddresses(data);
    }
  };

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://127.0.0.1:8000/api/profile/", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(profile),
    });

    alert("Profile updated!");
  };

  const handleAddressAdd = async () => {
    if (!newAddress.trim()) {
      alert("Please enter an address");
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/addresses/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ address: newAddress }),
    });

    if (response.ok) {
      fetchAddresses();
      setNewAddress("");
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-10 p-4 flex justify-center">
      <div className="card bg-base-100 shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <div className="space-y-4 flex flex-col items-center">
          <div>
            <input 
              type="text" 
              placeholder="Username" 
              value={profile.username} 
              onChange={(e) => setProfile({ ...profile, username: e.target.value })} 
              className="input input-bordered w-80" 
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Phone" 
              value={profile.phone} 
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })} 
              className="input input-bordered w-80" 
            />
          </div>
          <div>
            <button 
              onClick={handleProfileUpdate} 
              className="btn btn-primary w-80"
            >
              Update Profile
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-center">Addresses</h3>
          <ul className="space-y-2 mb-4">
            {addresses.map((addr, idx) => (
              <li key={idx} className="bg-base-200 p-2 rounded text-center">
                {addr.address}
              </li>
            ))}
          </ul>
          <div className="space-y-2 flex flex-col items-center">
            <div>
              <input 
                type="text" 
                placeholder="Add new address" 
                value={newAddress} 
                onChange={(e) => setNewAddress(e.target.value)} 
                className="input input-bordered w-80" 
              />
            </div>
            <div>
              <button 
                onClick={handleAddressAdd} 
                className="btn btn-secondary w-80"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;