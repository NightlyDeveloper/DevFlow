import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl normal-case font-bold text-primary">
          <span className="text-secondary">Dev</span>Flow
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <Link to="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary btn-sm">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;