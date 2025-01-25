import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
//import { AuthContext } from '../authentication/AuthProvider';
import { AuthContext } from '../authentication/AuthProvider';
//import Loading from '../components/Loading';

export default function PrivatePage({children}) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);
    if (loading) {
      return <div>loading....</div>;
    }
    if (user && user?.email) {
      return children;
    }
  return (
    <Navigate state={location.pathname} to={"/login"}></Navigate>
  )
}