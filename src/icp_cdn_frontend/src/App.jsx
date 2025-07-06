import { useEffect, useState } from "react";
import { icp_cdn_backend } from "declarations/icp_cdn_backend";
import FileUpload from "./components/FileUpload";
import UploadedFiles from "./components/UploadedFiles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const list = await icp_cdn_backend.list_files();
      setFiles(list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className=" min-h-screen bg-[#1f1e1e] p-6 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto bg-[#353434] shadow-[0px_5px_7px_rgb(9,6,6)] shadow-md rounded-lg p-6">

        <h1 className="text-3xl font-bold text-[rgb(0,230,122)] text-center mb-6">
          Decentralized CDN Dashboard
        </h1>

        <FileUpload onUploadSuccess={fetchFiles} />

        <UploadedFiles files={files} />

      </div>
    </div>
  );
}

export default App;