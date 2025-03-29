import React, { useState, useEffect } from 'react';
import { fetchFiles, uploadFile, deleteFile } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        try {
            setLoading(true);
            const data = await fetchFiles();
            setFiles(data);
            setError(null);
        } catch (err) {
            toast.error('Failed to load files');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Get file extension
        const extension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['pdf', 'xls', 'xlsx', 'txt'];
        
        if (!allowedExtensions.includes(extension)) {
            toast.error('Invalid file type. Only PDF, Excel, and TXT files are allowed.');
            event.target.value = ''; // Reset file input
            return;
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            toast.error('File size must be less than 10MB');
            event.target.value = '';
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setUploadProgress(0);

            // Create a progress handler
            const progressHandler = (percent) => {
                setUploadProgress(percent);
            };

            await uploadFile(file, progressHandler);
            toast.success('File uploaded successfully!');
            await loadFiles(); // Refresh file list
            event.target.value = ''; // Reset file input
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(err.response?.data?.detail || 'Failed to upload file');
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const handleDeleteFile = async (fileId) => {
        try {
            setLoading(true);
            await deleteFile(fileId);
            toast.success('File deleted successfully!');
            await loadFiles(); // Refresh file list
            setError(null);
        } catch (err) {
            toast.error('Failed to delete file');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFileTypeIcon = (fileType) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return '';
            case 'xls':
            case 'xlsx':
                return '';
            case 'txt':
                return '';
            default:
                return '';
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-base-200 flex flex-col items-center pt-10">
                <div className="card w-96 bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">File Management</h2>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Upload File (Max 10MB)</span>
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.xls,.xlsx,.txt"
                            onChange={handleFileUpload}
                            className="file-input file-input-bordered w-full"
                            disabled={loading}
                        />
                        {loading && (
                            <div className="mt-2">
                                <progress 
                                    className="progress progress-primary w-full" 
                                    value={uploadProgress} 
                                    max="100"
                                ></progress>
                                <div className="text-center text-sm mt-1">
                                    Uploading... {uploadProgress}%
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file.id}>
                                        <td>{getFileTypeIcon(file.file_type)}</td>
                                        <td className="max-w-xs truncate">{file.filename}</td>
                                        <td>{formatDate(file.uploaded_at)}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteFile(file.id)}
                                                className="btn btn-error btn-xs"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {files.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            No files uploaded yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FileUpload;
