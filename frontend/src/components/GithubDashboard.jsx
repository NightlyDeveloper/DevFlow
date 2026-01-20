import React from 'react'

const GithubDashboard = (props) => {
    const { repos, commits } = props;
    console.log(commits[0].payload);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📂 Active Repos</h3>
            <ul className="space-y-4">
              {repos.map(repo => (
                <li key={repo.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-blue-600 hover:underline">
                      {repo.name}
                    </a>
                    <div className="flex gap-2 mt-1">
                      {repo.private && <span className="text-[10px] bg-gray-200 px-1 rounded">PRIVATE</span>}
                      <span className="text-xs text-gray-500">{repo.language}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(repo.updated_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">🔥 Recent Commits</h3>
            <ul className="space-y-3 custom-scrollbar overflow-y-auto max-h-[300px] pr-2">
              {commits.map(event => (
                <li key={event.id} className="bg-gray-700 p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-bold text-green-400 text-sm">{event.repo.name}</span>
                    <span className="text-[10px] text-gray-400">{new Date(event.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1 italic truncate">"{event.payload.commits?.[0]?.message || "Commit message not available. Please check your GitHub Commit History"}"</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
  );
}

export default GithubDashboard