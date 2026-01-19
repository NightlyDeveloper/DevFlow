import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/activity/me', {
          headers: { 'x-auth-token': token }
        });
        setActivities(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading coding stats...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🧩 Recent DevFlow Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500">No coding sessions recorded yet. Start coding!</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((log) => (
            <li key={log._id} className="border-b pb-2 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{log.project}</p>
                <p className="text-xs text-gray-500">{log.fileName}</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {log.language}
                </span>
                <p className="text-sm font-bold text-gray-700 mt-1">
                  {log.duration} sec
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;