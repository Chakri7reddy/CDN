
import React, { useState } from "react";
import { icp_cdn_backend } from "declarations/icp_cdn_backend";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      //setStatus("⚠ Please select a file.");
      toast.warning("⚠ Please select a file.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = [...new Uint8Array(arrayBuffer)];

      //setStatus("⏳ Uploading...");
      toast.info("⏳ Uploading...");
      await icp_cdn_backend.upload_file(file.name, bytes);
      //setStatus("✅ File uploaded!");
      toast.success("✅ File uploaded!");
      setFile(null);

      // Call the parent callback to refresh file list
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error(error);
      //setStatus("❌ Upload failed.");
      toast.error("❌ Upload failed.");
      toast.error("❌ Please rename your file and upload again.");
    }
  };

  return (
    <div className="border border-gray-400 shadow-[0px_5px_7px_rgb(9,6,6)] rounded-lg p-6 mb-4 bg-gray-50">
      <label className="block mb-2 text-[rgb(0,230,122)] font-medium">
        Select File to Upload
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-2 rounded text-sm mb-4"
      />
      <button
        onClick={handleUpload}
        className=" bg-[rgb(0,230,122)] hover:bg-[rgb(4,196,106)] font-bold text-white px-4 py-2 rounded transition"
      >
        Upload
      </button>
      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </div>
  );
};

export default FileUpload;
