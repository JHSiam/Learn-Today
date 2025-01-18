import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
//import useSingleUser from "../hooks/useSingleUser";
import useAdmin from "../hooks/useAdmin";

const Navbar = ({ isLoggedIn = false, userName, profilePicture }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  //const [SingleUser] = useSingleUser();
  const [isAdmin] = useAdmin();


  function handleLogout() {
    logout()
  }

  //console.log(isAdmin);





  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      {/* Logo and Website Name */}
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-bold">
          Website Name
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <NavLink
              to="/home"
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
              Teach on Website
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
                <div className="absolute right-0 mt-10 bg-white rounded-lg shadow-lg p-2 w-48">
                  <div className="py-2 px-4 font-semibold text-gray-700">
                    {userName}
                  </div>
                  <ul>
                    {
                      user && isAdmin && <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    }

                    {
                      user && !isAdmin && <li>
                        <NavLink
                          to="/student-dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    }

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
              <NavLink
                to="/login"
                className="btn btn-primary"
              >
                Sign In
              </NavLink>
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
            <NavLink
              to="/home"
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
              Teach on Website
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
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
              <li>
                <button onClick={() => alert("Logout")}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/signin"
                className="btn btn-primary"
              >
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
