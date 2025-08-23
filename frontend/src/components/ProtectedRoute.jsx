import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, initializing = false, children }) {
  const location = useLocation();

  if (initializing) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}


