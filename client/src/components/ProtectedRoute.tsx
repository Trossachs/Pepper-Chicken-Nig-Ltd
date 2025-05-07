import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      setLocation('/login');
    }
  }, [setLocation]);

  // If we're checking auth status, show nothing
  return (
    <>{children}</>
  );
};

export default ProtectedRoute;