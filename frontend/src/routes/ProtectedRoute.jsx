import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-saffron-600 border-t-transparent" /></div>;

  if (!user) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
