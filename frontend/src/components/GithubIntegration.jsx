import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GithubDashboard from './GithubDashboard';

const GITHUB_CLIENT_ID = "Iv23li5o0ZxymCSIF6oG"; 
const REDIRECT_URI = "http://localhost:5173/github-callback";

const GithubIntegration = ({ onDataLoaded }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/auth', {
          headers: { 'x-auth-token': token }
        });

        const user = res.data.user || res.data; 

        if (user.githubAccessToken) {
          setIsConnected(true);
          setUsername(user.githubUsername);
          fetchGithubData(user.githubAccessToken, user.githubUsername);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Profile check failed:", err);
        setLoading(false);
      }
    };
    checkConnection();
  }, []);

  const fetchGithubData = async (accessToken, githubUser) => {
    try {
      const authHeader = { Authorization: `Bearer ${accessToken}` };
      
      const repoRes = await axios.get('https://api.github.com/user/repos', {
        headers: authHeader,
        params: { sort: 'updated', direction: 'desc', per_page: 5, visibility: 'all' }
      });
      setRepos(repoRes.data);

      const eventRes = await axios.get(`https://api.github.com/users/${githubUser}/events`, {
        headers: authHeader,
        params: { per_page: 15 }
      });
      const pushEvents = eventRes.data.filter(event => event.type === 'PushEvent');
      setCommits(pushEvents);
      if(onDataLoaded) {
        onDataLoaded({
          repos: repoRes.data,
          commits: pushEvents
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    const scope = "repo read:user"; 
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}`;
  };

  if (loading) return <div className="animate-pulse bg-gray-200 h-24 rounded-lg w-full"></div>;

  return (
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md flex justify-between items-center transition-all">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub Integration
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {isConnected ? `Connected as @${username}` : "Link your account to track repos"}
          </p>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-bold text-sm uppercase">Active</span>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm transition"
          >
            Connect
          </button>
        )}
      </div>
  );
};

export default GithubIntegration;