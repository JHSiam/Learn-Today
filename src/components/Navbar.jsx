import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import { SiSololearn } from "react-icons/si";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();

  function handleLogout() {
    logout();
  }

  return (
    <div className="navbar bg-purple-400 shadow-lg lg:px-20 w-full mx-auto sticky top-0 z-40">
      {/* Logo and Website Name */}
      <div className="flex-1 items-center gap-1">
      <SiSololearn />
        <NavLink to="/" className="text-xl font-bold">
          LearnToday
        </NavLink>
      </div>

      {/* Navigation Links for Large Devices */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teach"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Teach on LearnToday
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Contact
            </NavLink>
          </li>
          {user?.email ? (
            <li className="relative">
              <button
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="Profile" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-10 bg-white rounded-lg shadow-lg p-2 w-60 z-20 hover:bg-white">
                  <div className="py-2 px-4 font-semibold text-gray-700">
                    {user.displayName}
                  </div>
                  <ul>
                    {user && isAdmin && (
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}

                    {user && !isAdmin && !isTeacher && (
                      <li>
                        <NavLink
                          to="/student-dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}

                    {user && isTeacher && (
                      <li>
                        <NavLink
                          to="/teacher-dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}

                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={handleLogout}
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
              <NavLink to="/login" className="btn btn-primary">
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end lg:hidden z-30">
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              All Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teach"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Teach on LearnToday
            </NavLink>
          </li>
          {user?.email ? (
            <>
              {user && isAdmin && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
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
                      isActive ? "text-primary font-bold" : ""
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
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="btn btn-primary">
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
