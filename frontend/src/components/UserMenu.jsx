import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * UserMenu component
 * Displays a greeting, user avatar, and dropdown menu (View My Memos / Sign Out)
 * Props:
 * - position: Tailwind classes controlling absolute/fixed position (default: "absolute top-4 right-6")
 * - variant: "light" | "dark" → controls text color in light/dark background
 */
export default function UserMenu({
  position = "absolute top-4 right-6",
  variant = "light",
}) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".menu") && !e.target.closest(".avatar")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  if (!user) return null; // No user → don't render anything

  return (
    <div
      className={`${position} z-1000 flex items-center space-x-4
      bg-white/90 backdrop-blur-md border border-amber-100
      rounded-2xl shadow-md px-4 py-2`}
    >
      {/* Greeting */}
      <span
        className={`${
          variant === "dark" ? "text-gray-200" : "text-gray-700"
        } font-medium`}
      >
        Hello,&nbsp;
        <span className="text-amber-600 font-semibold">
          {user.displayName || "User"}
        </span>
      </span>

      {/* Avatar + Dropdown */}
      <div className="relative">
        <img
          src={user.photoURL || "https://i.pravatar.cc/100"}
          alt="User Avatar"
          className="
            w-10 h-10 rounded-full object-cover cursor-pointer avatar
            ring-2 ring-amber-400 hover:ring-amber-300
            shadow-md hover:shadow-amber-500/40
            transform hover:scale-105 transition-all duration-300
          "
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div
            className="
              absolute right-0 top-14 w-64 p-5 menu
              bg-white/95 backdrop-blur-md border border-amber-100
              rounded-xl shadow-xl
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">
                Hi, {user.displayName || "User"}
              </h3>
              <button
                className="text-gray-400 hover:text-amber-500"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="py-2 px-4 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium transition"
              >
                Back to Home Page
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="py-2 px-4 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
