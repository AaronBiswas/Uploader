import React, { useEffect, useState } from "react";
import { fetchFiles } from "../services/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles().then(setFiles).catch(() => navigate("/"));
  }, []);

  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    switch(ext) {
      case 'pdf': return 'PDF';
      case 'xlsx':
      case 'xls': return 'Excel';
      case 'txt': return 'Text';
      case 'docx':
      case 'doc': return 'Word';
      default: return 'Other';
    }
  };

  const fileTypeCounts = files.reduce((acc, file) => {
    const type = getFileType(file.file.split('/').pop());
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-base-200 flex flex-col items-center pt-10">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-center text-2xl font-bold">Dashboard</h2>
        <div className="flex justify-between items-center mt-4">
          <p>Total Files: {files.length}</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => { logout(); navigate("/"); }}
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">File Type Breakdown</h3>
          {Object.entries(fileTypeCounts).map(([type, count]) => (
            <div key={type} className="flex justify-between p-2 bg-base-200 rounded mt-1">
              <span>{type} Files:</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>

        <ul className="mt-4 space-y-2">
          {files.map((file) => (
            <li 
              key={file.id} 
              className="text-blue-500 hover:underline flex justify-between items-center"
            >
              <a 
                href={`http://127.0.0.1:8000${file.file}`} 
                download
                className="truncate"
              >
                {file.file.split('/').pop()}
              </a>
              <span className="text-xs text-gray-500">
                {getFileType(file.file.split('/').pop())}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Dashboard;