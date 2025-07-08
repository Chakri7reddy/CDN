import { useEffect, useState } from "react";
<<<<<<< HEAD
import { icp_cdn_backend } from "declarations/icp_cdn_backend";
import FileUpload from "./components/FileUpload";
import UploadedFiles from "./components/UploadedFiles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [files, setFiles] = useState([]);
=======
import { icp_cdn_backend } from "../../declarations/icp_cdn_backend";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewContent, setPreviewContent] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setStatus("⚠ Please select a file.");
      return;
    }

    if (!file.name || file.name.trim() === "") {
      setStatus("❌ File name is invalid.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = [...new Uint8Array(arrayBuffer)];

      setStatus("⏳ Uploading...");
      await icp_cdn_backend.upload_file(file.name, bytes);
      setStatus("✅ File uploaded!");
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      setStatus(`❌ Upload failed: ${error.message || error}`);
    }
  };
>>>>>>> e017c08fad1dff1f7f6d282fc12e4aa4ed3b9bef

  const fetchFiles = async () => {
    try {
      const list = await icp_cdn_backend.list_files();
      setFiles(list);
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
=======
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

  const handlePreview = async (name) => {
    try {
      const bytes = await icp_cdn_backend.get_file(name);
      const uint8 = new Uint8Array(bytes);
      const blob = new Blob([uint8]);
      const url = URL.createObjectURL(blob);

      if (name.match(/\.(png|jpg|jpeg|gif)$/i)) {
        setPreviewContent(<img src={url} alt={name} className="max-h-64 mx-auto" />);
      } else if (name.match(/\.(txt|md|js|json|log|html|css)$/i)) {
        const text = await blob.text();
        setPreviewContent(
          <pre className="whitespace-pre-wrap max-h-64 overflow-y-auto bg-gray-200 p-2 rounded">{text}</pre>
        );
      } else {
        setPreviewContent(<p className="text-sm text-gray-500 text-center">📄 Cannot preview this file type.</p>);
      }
    } catch (error) {
      console.error("Preview error:", error);
      setPreviewContent(<p className="text-red-500">Failed to load preview.</p>);
    }
  };

  const handleDelete = async (name) => {
    try {
      await icp_cdn_backend.delete_file(name);
      fetchFiles();
      setPreviewContent(null);
      setStatus(`🗑 ${name} deleted`);
    } catch (error) {
      console.error("Delete error:", error);
      setStatus("❌ Delete failed.");
    }
  };

>>>>>>> e017c08fad1dff1f7f6d282fc12e4aa4ed3b9bef
  useEffect(() => {
    fetchFiles();
  }, []);

<<<<<<< HEAD
  return (
    <div className=" min-h-screen bg-[#1f1e1e] p-6 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto bg-[#353434] shadow-[0px_5px_7px_rgb(9,6,6)] shadow-md rounded-lg p-6">

        <h1 className="text-3xl font-bold text-[rgb(0,230,122)] text-center mb-6">
          Decentralized CDN Dashboard
        </h1>

        <FileUpload onUploadSuccess={fetchFiles} />

        <UploadedFiles files={files} />

=======
  const filteredFiles = files.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Decentralized CDN Dashboard
        </h1>

        <div className="border border-dashed border-gray-400 rounded-lg p-6 mb-4 bg-gray-50">
          <label className="block mb-2 text-gray-700 font-medium">
            Select File to Upload
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded text-sm mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
          >
            Upload
          </button>
          <p className="mt-2 text-sm text-gray-600">{status}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Uploaded Files
          </h2>

          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {filteredFiles.length > 0 ? (
            <ul className="space-y-3">
              {filteredFiles.map((file, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow-sm hover:bg-gray-200 transition"
                >
                  <span className="text-gray-700 truncate max-w-xs">{file}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDownload(file)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handlePreview(file)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No files match your search.</p>
          )}

          {previewContent && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">File Preview</h3>
              <div className="bg-gray-100 p-4 rounded">{previewContent}</div>
            </div>
          )}
        </div>
>>>>>>> e017c08fad1dff1f7f6d282fc12e4aa4ed3b9bef
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> e017c08fad1dff1f7f6d282fc12e4aa4ed3b9bef
