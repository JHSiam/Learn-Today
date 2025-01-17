import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn=true, userName, profilePicture }) => {
    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      {/* Logo and Website Name */}
      <div className="flex-1">
        <a className="text-xl font-bold">
          Website Name
        </a>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#classes">All Classes</a>
          </li>
          <li>
            <a href="#teach">Teach on Website</a>
          </li>
          {isLoggedIn ? (
            <li className="relative">
              <button
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-10 rounded-full">
                  <img src={profilePicture} alt="Profile" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-10 bg-white rounded-lg shadow-lg p-2 w-48">
                  <div className="py-2 px-4 font-semibold text-gray-700">
                    {userName}
                  </div>
                  <ul>
                    <li>
                      <a
                        href="#dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => alert("Logout")}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <li>
              <a href="#signin" className="btn btn-primary">
                Sign In
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
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
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#classes">All Classes</a>
          </li>
          <li>
            <a href="#teach">Teach on Website</a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="#dashboard">Dashboard</a>
              </li>
              <li>
                <button onClick={() => alert("Logout")}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <a href="#signin" className="btn btn-primary">
                Sign In
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
