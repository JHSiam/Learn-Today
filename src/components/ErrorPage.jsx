
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg text-center max-w-md mt-2">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Go to Home
      </button>
    </div>
  );
}