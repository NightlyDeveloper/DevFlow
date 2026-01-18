import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  const token = localStorage.getItem('token');

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={token ? <Navigate to='/dashboard' /> : <Landing /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App