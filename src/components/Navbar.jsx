import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import { SiSololearn } from "react-icons/si";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return true;
  });
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleThemeToggle = (e) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <div className="navbar shadow-2xl lg:px-20 w-full mx-auto sticky top-0 z-40 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-b border-purple-500/30">
      {/* Logo and Website Name */}
      <div className="flex-1 items-center gap-2">
        <SiSololearn className="w-7 h-7 text-purple-400" />
        <NavLink to="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
          LearnToday
        </NavLink>
      </div>

      {/* Navigation Links for Large Devices */}
      <div className="hidden lg:flex flex-none gap-4 items-center">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold border-b-2 border-purple-400" 
                  : "text-gray-300 hover:text-purple-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold border-b-2 border-purple-400" 
                  : "text-gray-300 hover:text-purple-400"
              }
            >
              All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teach"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold border-b-2 border-purple-400" 
                  : "text-gray-300 hover:text-purple-400"
              }
            >
              Teach on LearnToday
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold border-b-2 border-purple-400" 
                  : "text-gray-300 hover:text-purple-400"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold border-b-2 border-purple-400" 
                  : "text-gray-300 hover:text-purple-400"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Theme Toggle using Daisy UI */}
        <input
          type="checkbox"
          className="toggle toggle-sm bg-gray-600 border-gray-500"
          checked={isDarkMode}
          onChange={handleThemeToggle}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        />

        {/* Auth Section */}
        {user?.email ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="btn btn-ghost btn-circle avatar ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-900 hover:ring-pink-500 transition-all"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="Profile" />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-10 bg-gray-800/95 border border-purple-500/30 rounded-xl shadow-2xl p-0 w-72 z-20 backdrop-blur-sm overflow-hidden">
                <div className="py-4 px-6 font-semibold text-purple-300 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                  {user.displayName}
                </div>
                <ul className="divide-y divide-purple-500/10">
                  {user && isAdmin && (
                    <li>
                      <NavLink
                        to="/dashboard"
                        className="block px-6 py-3 text-gray-300 hover:bg-purple-900/40 hover:text-purple-300 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {user && !isAdmin && !isTeacher && (
                    <li>
                      <NavLink
                        to="/student-dashboard"
                        className="block px-6 py-3 text-gray-300 hover:bg-purple-900/40 hover:text-purple-300 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {user && isTeacher && (
                    <li>
                      <NavLink
                        to="/teacher-dashboard"
                        className="block px-6 py-3 text-gray-300 hover:bg-purple-900/40 hover:text-purple-300 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <button
                      className="block w-full text-left px-6 py-3 text-red-400 hover:bg-red-900/20 transition-colors font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/50 font-medium">
            Sign In
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end lg:hidden z-30">
        <label tabIndex={0} className="btn btn-ghost text-gray-300 hover:text-purple-400 hover:bg-purple-900/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-800/95 border border-purple-500/30 rounded-xl w-52 divide-y divide-purple-500/10 backdrop-blur-sm"
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold bg-purple-900/40" 
                  : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold bg-purple-900/40" 
                  : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
              }
            >
              All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teach"
              className={({ isActive }) =>
                isActive 
                  ? "text-purple-400 font-bold bg-purple-900/40" 
                  : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
              }
            >
              Teach on LearnToday
            </NavLink>
          </li>

          {/* Theme Toggle in Mobile Menu */}
          <li className="flex items-center justify-between px-4 py-2">
            <span className="text-gray-300">Theme</span>
            <input
              type="checkbox"
              className="toggle toggle-sm bg-gray-600 border-gray-500"
              checked={isDarkMode}
              onChange={handleThemeToggle}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            />
          </li>

          {user?.email ? (
            <>
              {user && isAdmin && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive 
                        ? "text-purple-400 font-bold bg-purple-900/40" 
                        : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user && !isAdmin && !isTeacher && (
                <li>
                  <NavLink
                    to="/student-dashboard"
                    className={({ isActive }) =>
                      isActive 
                        ? "text-purple-400 font-bold bg-purple-900/40" 
                        : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user && isTeacher && (
                <li>
                  <NavLink
                    to="/teacher-dashboard"
                    className={({ isActive }) =>
                      isActive 
                        ? "text-purple-400 font-bold bg-purple-900/40" 
                        : "text-gray-300 hover:text-purple-400 hover:bg-purple-900/40"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white hover:from-purple-700 hover:to-pink-700 font-medium">
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;