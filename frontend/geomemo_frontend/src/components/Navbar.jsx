import React from 'react';
import { FaMapPin, FaUser } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-amber-50 border-b border-amber-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <FaMapPin className="w-6 h-6 text-amber-600" />
          <span className="text-xl font-semibold text-gray-800">GeoMemo</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <a 
            href="/about" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            About us
          </a>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer">
            <FaUser className="w-5 h-5" />
            <span>Login</span>
          </div>
        </div>
      </div>
    </nav>
  );
}