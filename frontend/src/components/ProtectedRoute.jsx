import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../lib/axios';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(null);
  
  useEffect(() => {

    const fetchData = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }
    
      try{
        await api.get('/auth/me');
        setIsAuthorized(true);
      }catch(error){
        setIsAuthorized(false);
        console.error("Token validation failed");
        localStorage.removeItem('token');
      }
    }
    
    fetchData();

  }, []);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if(!isAuthorized) return <Navigate to="/" />
  
  return children;
};

export default ProtectedRoute;