import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/auth';
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phone_number: ''
    });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAddress, setNewAddress] = useState({
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        is_primary: false
    });

    useEffect(() => {
        loadProfile();
        loadAddresses();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getUserProfile();
            setProfile(data);
        } catch (err) {
            toast.error('Failed to load profile');
            setError('Failed to load profile');
        }
    };

    const loadAddresses = async () => {
        try {
            const data = await fetchAddresses();
            setAddresses(data);
        } catch (err) {
            toast.error('Failed to load addresses');
            setError('Failed to load addresses');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(profile);
            toast.success('Profile updated successfully!');
            setError(null);
        } catch (err) {
            const errorMsg = err.response?.data?.detail || 'Failed to update profile';
            toast.error(errorMsg);
            setError(errorMsg);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAddress(newAddress);
            toast.success('Address added successfully!');
            await loadAddresses();
            // Reset form
            setNewAddress({
                street_address: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                is_primary: false
            });
            setError(null);
        } catch (err) {
            const errorMsg = err.response?.data?.detail || 'Failed to add address';
            toast.error(errorMsg);
            setError(errorMsg);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId);
            toast.success('Address deleted successfully!');
            await loadAddresses();
            setError(null);
        } catch (err) {
            const errorMsg = err.response?.data?.detail || 'Failed to delete address';
            toast.error(errorMsg);
            setError(errorMsg);
        }
    };

    const handleProfileChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleAddressChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-base-200 flex flex-col items-center pt-10">
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Form */}
                        <div className="bg-base-100 text-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                            <form onSubmit={handleProfileSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleProfileChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={profile.phone_number || ''}
                                        onChange={handleProfileChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>

                        {/* Addresses Section */}
                        <div className="bg-base-100 p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
                            
                            {/* Address List */}
                            <div className="mb-6">
                                {addresses.map(address => (
                                    <div key={address.id} className="border-b py-3">
                                        <p>{address.street_address}</p>
                                        <p>{`${address.city}, ${address.state} ${address.postal_code}`}</p>
                                        <p>{address.country}</p>
                                        {address.is_primary && (
                                            <span className="text-green-600 text-sm">Primary Address</span>
                                        )}
                                        <button
                                            onClick={() => handleDeleteAddress(address.id)}
                                            className="text-red-500 text-sm mt-2 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* New Address Form */}
                            <form onSubmit={handleAddressSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        name="street_address"
                                        value={newAddress.street_address}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleAddressChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleAddressChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postal_code"
                                            value={newAddress.postal_code}
                                            onChange={handleAddressChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={newAddress.country}
                                            onChange={handleAddressChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_primary"
                                            checked={newAddress.is_primary}
                                            onChange={(e) => setNewAddress(prev => ({
                                                ...prev,
                                                is_primary: e.target.checked
                                            }))}
                                            className="mr-2"
                                        />
                                        <span className="text-white">Set as primary address</span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    disabled={loading}
                                >
                                    Add Address
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;