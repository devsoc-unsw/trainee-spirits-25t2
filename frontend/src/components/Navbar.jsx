import React, { useState, useEffect } from "react";
import { FaMapPin, FaTimes } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ variant = "light" }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the dropdown menu when clicking outside (without using useRef)
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".menu") && !e.target.closest(".avatar")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  return (
    <nav
      className="
        absolute top-0 left-0 w-full z-50
        flex items-center justify-between
        px-10 py-6
        bg-white/10 backdrop-blur-md
        border-b border-white/20
        shadow-sm
      "
    >
      {/* ---------- Logo Section ---------- */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* Map pin icon */}
        <FaMapPin className="text-amber-400 w-6 h-6" />

        {/* Brand title */}
        <span
          className={`text-2xl font-bold ${
            variant === "dark" ? "text-black" : "text-white"
          } tracking-wide`}
        >
          GeoMemo
        </span>
      </div>

      {/* ---------- Right Section (Links & User) ---------- */}
      <div className="flex items-center space-x-8">
        {/* About button */}
        <button
          onClick={() => navigate("/about")}
          className={`${
            variant === "dark" ? "text-black" : "text-white"
          } hover:text-amber-300 text-lg font-medium transition-all`}
        >
          About
        </button>

        {/* ---------- Logged-in user ---------- */}
        {user ? (
          <div className="relative">
            {/* User avatar */}
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

            {/* Dropdown menu */}
            {menuOpen && (
              <div
                className="
                  absolute right-0 top-12 w-64 p-5 menu
                  bg-white/95 backdrop-blur-md border border-amber-100 rounded-xl shadow-xl
                "
              >
                {/* Header section of dropdown */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">
                    Hi, {user.displayName || "User"}
                  </h3>
                  {/* Close icon */}
                  <button
                    className="text-gray-400 hover:text-amber-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Dropdown buttons */}
                <div className="flex flex-col space-y-3">
                  {/* Go to user's memos */}
                  <button
                    onClick={() => {
                      navigate("/app");
                      setMenuOpen(false);
                    }}
                    className="py-2 px-4 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium transition"
                  >
                    View My Memos
                  </button>

                  {/* Sign out */}
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
        ) : (
          /* ---------- Not logged in ---------- */
          <button
            onClick={() => navigate("/login")}
            className="
              px-6 py-2 rounded-full
              text-white font-semibold text-lg
              bg-gradient-to-r from-amber-400 to-amber-600
              hover:from-amber-500 hover:to-amber-700
              shadow-md hover:shadow-amber-500/40
              transform hover:scale-105 active:scale-95
              transition-all duration-300
            "
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
