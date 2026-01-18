import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-200">
      
      {/* --- HERO SECTION --- */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">DevFlow</h1>
            <p className="py-6 text-xl">
              Sync your workflow. Track your progress. 
              <br/>
              The ultimate developer activity tracker for high-performance teams.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="btn btn-primary shadow-lg shadow-primary/30">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Developers Love Us</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">🚀</div>
              <h2 className="card-title text-secondary">Real-time Tracking</h2>
              <p>Automatically log your coding sessions directly from VS Code without lifting a finger.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <h2 className="card-title text-secondary">Secure Teams</h2>
              <p>Join organizations and manage permissions with our enterprise-grade JWT authentication.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">📊</div>
              <h2 className="card-title text-secondary">Deep Analytics</h2>
              <p>Visualize your productivity trends and team velocity with beautiful, detailed dashboards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
        <div>
          <p className="font-bold">
            DevFlow Systems <br/>Providing reliable tech since 2026
          </p> 
          <p>Copyright © 2026 - All right reserved</p>
        </div> 
      </footer>

    </div>
  );
};

export default Landing;