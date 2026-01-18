import React from 'react';

// This component acts as the "Frame"
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    // 1. The Background Container (Full Screen, Centered)
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. The Card (White/Dark Box with Shadow) */}
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          
          {/* 3. The Header (Title & Subtitle) */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              {title}
            </h1>
            <p className="text-base-content/70 mt-2 text-sm">
              {subtitle}
            </p>
          </div>

          {/* 4. The Dynamic Content (Where your Form goes) */}
          {children}
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;