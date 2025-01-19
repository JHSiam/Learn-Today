import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AuthProvider from './authentication/AuthProvider.jsx';
import Register from './authentication/Register.jsx';
import Login from './authentication/Login.jsx';
import AdminDashboard from './dashboard/AdminDashboard.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import AllUsers from './dashboard/admin/AllUsers.jsx';
import TeacherRequest from './components/TeacherRequest.jsx';
import TeacherApplications from './dashboard/admin/TeacherApplications.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/dashboard",
        element: <AdminDashboard></AdminDashboard>,
        children: [
          {
            path: "all-users",
            element: <AllUsers></AllUsers>
          },
          {
            path: 'teacher-request',
            element: <TeacherApplications></TeacherApplications>
          }
        ]
      },
      {
        path:"/teach",
        element: <TeacherRequest></TeacherRequest>
      }
    ]
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router}></RouterProvider>

      </QueryClientProvider>
    </AuthProvider>

  </StrictMode>,
)
