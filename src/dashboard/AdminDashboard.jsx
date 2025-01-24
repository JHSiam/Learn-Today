import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher, FaBook, FaUser } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white flex flex-col w-full lg:w-64 transition-all duration-300 ease-in-out">
        <div className="text-2xl font-bold p-4 border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="teacher-request"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaChalkboardTeacher className="mr-2" />
                <span>Teacher Request</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="all-users"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaUsers className="mr-2" />
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="all-classes"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaBook className="mr-2" />
                <span>All Classes</span>
              </NavLink>
            </li>
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

export default AdminDashboard;
