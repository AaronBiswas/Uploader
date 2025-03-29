import React, { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../services/api';
import Navbar from './Navbar';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_files: 0,
        file_types: [],
        user_uploads: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardStats();
    }, []);

    const loadDashboardStats = async () => {
        try {
            setLoading(true);
            const data = await fetchDashboardStats();
            setStats(data);
            setError(null);
        } catch (err) {
            setError('Failed to load dashboard statistics');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-base-200 flex flex-col items-center pt-10">
                <div className="card w-96 bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Total Files Card */}
                    <div className="stats shadow mb-6">
                        <div className="stat">
                            <div className="stat-title">Total Files</div>
                            <div className="stat-value text-primary">{stats.total_files}</div>
                        </div>
                    </div>

                    {/* File Types Breakdown */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">File Types</h3>
                        <div className="space-y-3">
                            {stats.file_types.map((type, index) => (
                                <div key={index} className="bg-base-200 p-3 rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">
                                            {type.file_type.toUpperCase()}
                                        </span>
                                        <span className="badge badge-primary">
                                            {type.count} files
                                        </span>
                                    </div>
                                    <progress 
                                        className="progress progress-primary w-full" 
                                        value={(type.count / stats.total_files) * 100} 
                                        max="100"
                                    ></progress>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Upload Stats */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">User Upload Stats</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Files</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.user_uploads.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>
                                                <span className="badge badge-ghost">
                                                    {user.upload_count} files
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;