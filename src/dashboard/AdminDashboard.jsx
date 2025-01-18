import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher, FaBook, FaUser } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
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
                Teacher Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="users"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaUsers className="mr-2" />
                Users
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
                All Classes
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
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
