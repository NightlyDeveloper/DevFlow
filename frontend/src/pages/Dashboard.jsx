import React from 'react';
import { useAuth } from '../context/AuthContext'; // That's all we need!
import ActivityLog from '../components/ActivityLog';

const Dashboard = () => {
  const { user, logout } = useAuth(); // Grab user data directly

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">DevFlow Dashboard</h1>
          <p className="text-base-content/70">
            Welcome back, <span className="text-secondary font-bold">{user?.name}</span>
          </p>
        </div>
        <button onClick={logout} className="btn btn-outline btn-error btn-sm">
          Logout
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-primary">
          <div className="card-body">
            <h2 className="card-title">My Profile</h2>
            <p><span className="font-bold">Email:</span> {user?.email}</p>
            <p><span className="font-bold">ID:</span> <span className="text-xs font-mono bg-base-200 p-1 rounded">{user?._id}</span></p>
            <div className="mt-4">
              <span className="badge badge-lg badge-secondary badge-outline p-4">
                 Team: {user?.team || "Solo"}
              </span>
            </div>
          </div>
        </div>

        {/* Extension Instructions */}
        <div className="card bg-base-100 shadow-xl md:col-span-2 border-l-4 border-accent">
          <div className="card-body">
            <h2 className="card-title">🔌 Connect VS Code</h2>
            <p>Copy your unique ID below to connect your editor:</p>
            <div className="mockup-code mt-2 bg-neutral text-neutral-content">
              <pre data-prefix=">"><code>User ID: {user?._id}</code></pre> 
            </div>
          </div>
        </div>

      </div>
      <ActivityLog />
    </div>
  );
};

export default Dashboard;