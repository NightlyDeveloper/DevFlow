import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import api from '../lib/axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    team: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Basic validation for Step 1
    if (formData.name && formData.email && formData.password) {
      setStep(2);
    } else {
      // You can add a toast error here
      alert("Please fill in all fields");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  // ---------------------------------------------------------
  // YOUR TURN: Implement the final POST request here
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Logic: If teamName is empty, we treat it as "None"
    const finalData = {
      ...formData,
      team: formData.teamName.trim() === '' ? 'None' : formData.teamName
    };

    console.log("Registering with:", finalData);
    try{
        const res = await api.post('/auth/register', finalData);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        toast.success("Registration Successful!");
    }catch(error){
        setStep(1);
    }
  };

  return (
    <AuthLayout title="Join the Squad" subtitle="Create your developer account">
      <form onSubmit={handleSubmit} className="min-h-[300px] flex flex-col justify-between">
        
        {/* --- STEP 1: ACCOUNT DETAILS --- */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-right">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <input 
                type="text" name="name" placeholder="John Doe" 
                className="input input-bordered w-full focus:input-primary" 
                value={formData.name} onChange={handleChange} autoFocus 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <input 
                type="email" name="email" placeholder="dev@example.com" 
                className="input input-bordered w-full focus:input-primary" 
                value={formData.email} onChange={handleChange} 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <input 
                type="password" name="password" placeholder="••••••••" 
                className="input input-bordered w-full focus:input-primary" 
                value={formData.password} onChange={handleChange} 
              />
            </div>

            <button 
              type="button" // Important: type="button" prevents form submit
              onClick={handleNext} 
              className="btn btn-primary w-full mt-4"
            >
              Next
            </button>
          </div>
        )}

        {/* --- STEP 2: TEAM SELECTION --- */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in-right">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold">Pick your Team</h3>
              <p className="text-sm text-base-content/60">
                Join an existing squad or start a new one.
              </p>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Team Name</span></label>
              <input 
                type="text" name="team" placeholder="e.g. Frontend Warriors" 
                className="input input-bordered w-full focus:input-primary" 
                value={formData.team} onChange={handleChange} 
                autoFocus
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Leave empty to join as a solo developer (None)
                </span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                type="button" 
                onClick={handleBack} 
                className="btn btn-ghost flex-1"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary flex-1 shadow-lg shadow-primary/20"
              >
                Complete Registration
              </button>
            </div>
          </div>
        )}

        {/* --- PROGRESS INDICATOR (LINES) --- */}
        <div className="mt-8">
          <div className="flex gap-2">
            {/* Line 1 */}
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              step >= 1 ? 'bg-primary' : 'bg-base-300'
            }`}></div>
            
            {/* Line 2 */}
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              step >= 2 ? 'bg-primary' : 'bg-base-300'
            }`}></div>
          </div>
          <p className="text-xs text-center mt-2 text-base-content/50">
            Step {step} of 2
          </p>
        </div>

      </form>

      {/* Login Link (Always visible) */}
      <div className="text-center mt-6 border-t border-base-content/10 pt-4">
        <p className="text-sm text-base-content/70">
          Already have an account?{' '}
          <Link to="/login" className="link link-primary font-bold">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;