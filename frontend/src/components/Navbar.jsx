import React from "react";
import { FaMapPin, FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import Logout from "./Logout";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-amber-50 border-b border-amber-200 px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <FaMapPin className="w-6 h-6 text-amber-600" />
          <a href="/">
            <span className="text-xl font-semibold text-gray-800">GeoMemo</span>
          </a>
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
            {user ? (
              <Logout />
            ) : (
              <a
                href="/login"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
