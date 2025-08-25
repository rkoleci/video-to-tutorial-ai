import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Store the intended route for redirect after login
      localStorage.setItem('intendedRoute', window.location.pathname);
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  };


export default ProtectedRoute