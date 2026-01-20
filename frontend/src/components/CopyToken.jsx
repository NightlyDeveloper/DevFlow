import React from 'react';
const CopyToken = () => {
  const copyToClipboard = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }
    navigator.clipboard.writeText(token);
    alert("Token copied to clipboard! Now paste it in VS Code.");
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-bold mb-2">🔑 Connect VS Code</h3>
      <p className="text-gray-400 mb-4 text-sm">
        To track your coding hours, you need to connect the extension.
      </p>
      <button 
        onClick={copyToClipboard}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Copy Extension Token
      </button>
    </div>
  );
};

export default CopyToken;