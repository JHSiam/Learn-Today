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
import TeacherDashboard from './dashboard/TeacherDashboard.jsx';
import AddClass from './dashboard/teacher/AddClass.jsx';
import AllClass from './dashboard/admin/AllClass.jsx';
import MyClass from './dashboard/teacher/MyClass.jsx';
import AllApprovedClass from './components/AllApprovedClass.jsx';
import ThisClassDetails from './components/ThisClassDetails.jsx';
import Payment from './components/payment/Payment.jsx';
import StudentDashboard from './dashboard/StudentDashboard.jsx';
import MyEnrolledClass from './dashboard/student/MyEnrolledClass.jsx';
import MyClassDetails from './dashboard/teacher/MyClassDetails.jsx';
import MyEnrolledClassDetails from './dashboard/student/MyEnrolledClassDetails.jsx';
import AdminClassProgression from './dashboard/admin/AdminClassProgression.jsx';
import HomeLayout from './components/homepage/HomeLayout.jsx';
import ProfileInfo from './dashboard/ProfileInfo.jsx';
import PrivatePage from './routes/PrivatePage.jsx';
//import PaymentPage from './components/payment/PaymentPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>
      },
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
        element: <PrivatePage><AdminDashboard></AdminDashboard></PrivatePage>,
        children: [
          {
            path: "all-users",
            element: <AllUsers></AllUsers>
          },
          {
            path: 'teacher-request',
            element: <TeacherApplications></TeacherApplications>
          },
          {
            path: 'all-classes',
            element: <AllClass></AllClass>
          },
          {
            path: 'all-classes/admin-class-progress/:classId',
            element: <AdminClassProgression></AdminClassProgression>
          },
          {
            path: 'profile',
            element: <ProfileInfo></ProfileInfo>
          }
        ]
      },
      {
        path: "/teacher-dashboard",
        element: <PrivatePage><TeacherDashboard></TeacherDashboard></PrivatePage>,
        children: [
          {
            path: "add-class",
            element: <AddClass></AddClass>
          },
          {
            path: "my-classes",
            element: <MyClass></MyClass>
          },
          {
            path: "my-classes/my-class-details/:id",
            element: <MyClassDetails></MyClassDetails>
          },
          {
            path: 'profile',
            element: <ProfileInfo></ProfileInfo>
          }
        ]
      },
      {
        path: "/student-dashboard",
        element: <PrivatePage><StudentDashboard></StudentDashboard></PrivatePage>,
        children: [
          {
            path: "my-enrolled-classes",
            element: <MyEnrolledClass></MyEnrolledClass>
          },
          {
            path: "my-enrolled-classes/my-enroll-class-details/:id",
            element: <MyEnrolledClassDetails></MyEnrolledClassDetails>
          },
          {
            path: 'profile',
            element: <ProfileInfo></ProfileInfo>
          }
        ]
      },
      {
        path:"/teach",
        element: <PrivatePage><TeacherRequest></TeacherRequest></PrivatePage>
      },
      {
        path: "/classes",
        element: <AllApprovedClass></AllApprovedClass>
      },
      {
        path: "/this-class-details/:id",
        element: <PrivatePage><ThisClassDetails></ThisClassDetails></PrivatePage>
      },
      {
        path: "/payment/:id",
        element: <PrivatePage><Payment></Payment></PrivatePage>
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
