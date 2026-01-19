import React from 'react';

const StatsOverview = ({ activities }) => {
  
  const totalSeconds = activities.reduce((acc, curr) => acc + curr.duration, 0);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const langCounts = {};
  activities.forEach(act => {
    langCounts[act.language] = (langCounts[act.language] || 0) + act.duration;
  });
  
  const topLang = Object.keys(langCounts).reduce((a, b) => 
    langCounts[a] > langCounts[b] ? a : b, "N/A"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg opacity-80">Total Focus Time</h3>
        <p className="text-3xl font-bold">{hours}h {minutes}m</p>
      </div>

      <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg opacity-80">Top Language</h3>
        <p className="text-3xl font-bold capitalize">{topLang}</p>
      </div>

      <div className="bg-emerald-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg opacity-80">Sessions Recorded</h3>
        <p className="text-3xl font-bold">{activities.length}</p>
      </div>
    </div>
  );
};

export default StatsOverview;