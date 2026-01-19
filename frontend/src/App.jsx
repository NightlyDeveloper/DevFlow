import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

const App = () => {

  const token = localStorage.getItem('token');
  const { isAuthenticated, loading } = useAuth();

  if(loading){
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Landing /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={isAuthenticated? <Dashboard /> : <Landing />} />
      </Routes>
    </>
  )
}

export default App