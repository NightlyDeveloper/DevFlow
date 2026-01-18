import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  // State to hold input values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------------------------------------
  // YOUR TURN: Implement the connection logic here later
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    try{
        const res = await api.post('/auth/login', {
            email: formData.email,
            password: formData.password
        })
        localStorage.setItem('token', res.data.token);
        toast.success('Login successful')
        console.log(res.data);
        navigate('/dashboard');
    }catch(error){
        toast.error("Error logging in: ", error.response.data.message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to access your workspace">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input 
            type="email" 
            name="email" 
            placeholder="dev@example.com" 
            className="input input-bordered w-full focus:input-primary transition-all" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Password Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            className="input input-bordered w-full focus:input-primary transition-all" 
            value={formData.password}
            onChange={handleChange} 
            required 
          />
          {/* Forgot Password Link (Visual only) */}
          <label className="label">
            <span className="label-text-alt link link-hover text-gray-500">
              Forgot password?
            </span>
          </label>
        </div>

        {/* Action Button */}
        <button type="submit" className="btn btn-primary w-full mt-6 shadow-lg shadow-primary/20">
          Login
        </button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Don't have an account?{' '}
            <Link to="/register" className="link link-primary font-bold">
              Register
            </Link>
          </p>
        </div>
        
      </form>
    </AuthLayout>
  );
};

export default Login;