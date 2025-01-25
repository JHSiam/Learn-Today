import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaUser } from "react-icons/fa";

const StudentDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white flex flex-col w-full lg:w-64 transition-all duration-300 ease-in-out">
        <div className="text-2xl font-bold p-4 border-b border-gray-700">
          Student Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {/* My Enrolled Classes */}
            <li>
              <NavLink
                to="my-enrolled-classes"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaBook className="mr-2" />
                <span>My Enrolled Classes</span>
              </NavLink>
            </li>

            {/* Profile */}
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaUser className="mr-2" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
