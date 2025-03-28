import React, { useState } from "react";
import { uploadFile } from "../services/api";
import Navbar from "./Navbar";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadFile(file);
      alert("File uploaded successfully!");
    } catch {
      alert("Upload failed.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-center text-2xl font-bold">Upload File</h2>
        <input
          type="file"
          className="file-input file-input-bordered w-full mt-4"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary mt-4 w-full" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
    </>
    
  );
};

export default FileUpload;
