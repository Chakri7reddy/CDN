import React from "react";
import { icp_cdn_backend } from "declarations/icp_cdn_backend";
import { FaDownload } from "react-icons/fa";


const UploadedFiles = ({ files }) => {
  const handleDownload = async (name) => {
    try {
      const bytes = await icp_cdn_backend.get_file(name);
      const blob = new Blob([new Uint8Array(bytes)]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-[rgb(0,230,122)] mb-3">
        Uploaded Files
      </h2>
      {files.length > 0 ? (
        <ul className="space-y-4">
          {files.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow-[0px_5px_7px_rgb(9,6,6)] shadow-md hover:bg-gray-200 transition"
            >
              <span className="text-gray-700 hover:text-[rgb(4,196,106)] truncate max-w-xs">{file}</span>
              <button
                onClick={() => handleDownload(file)}
                className=" text-[rgb(0,230,122)] hover:text-[rgb(4,196,106)] text-sm font-medium flex items-center gap-2"
              >
                <FaDownload />
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadedFiles;
