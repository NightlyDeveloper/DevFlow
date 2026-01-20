import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GithubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    const exchangeCode = async () => {
      if (!code) return;

      try {
        const token = localStorage.getItem('token');
        // Send the code to OUR backend to swap it for an Access Token
        await axios.post('http://localhost:5000/api/auth/github', 
          { code }, 
          { headers: { 'x-auth-token': token } }
        );
        navigate('/dashboard'); // Go back to dashboard on success
      } catch (err) {
        console.error("GitHub Login Failed", err);
        navigate('/dashboard');
      }
    };
    exchangeCode();
  }, [code, navigate]);

  return <div className="p-10 text-center">Connecting to GitHub... 🔄</div>;
};

export default GithubCallback;