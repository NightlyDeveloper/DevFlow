import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios'; // Use your configured axios instance

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user data", err);
        // If the token is invalid, kick them out
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* Navbar Area */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">DevFlow Dashboard</h1>
          <p className="text-base-content/70">
            Welcome back, <span className="text-secondary font-bold">{user?.name}</span>
          </p>
        </div>
        <button 
          onClick={handleLogout} 
          className="btn btn-outline btn-error btn-sm"
        >
          Logout
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: User Profile */}
        <div className="card bg-base-100 shadow-xl border-l-4 border-primary">
          <div className="card-body">
            <h2 className="card-title">My Profile</h2>
            <div className="space-y-2 mt-2">
              <p><span className="font-bold">Email:</span> {user?.email}</p>
              <p><span className="font-bold">Role:</span> {user?.role || "Developer"}</p>
              <div className="mt-4">
                <span className="badge badge-lg badge-secondary badge-outline p-4">
                  Team: {user?.team || "Solo Developer"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Placeholder for Extension Status */}
        <div className="card bg-base-100 shadow-xl md:col-span-2 border-l-4 border-accent">
          <div className="card-body">
            <h2 className="card-title">Extension Status</h2>
            <p className="text-base-content/60">
              Your VS Code extension is not connected yet.
            </p>
            
            <div className="mockup-code mt-4 bg-neutral text-neutral-content">
              <pre data-prefix="$"><code>npm install vs-code-extension</code></pre> 
              <pre data-prefix=">" className="text-warning"><code>Waiting for data...</code></pre> 
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;