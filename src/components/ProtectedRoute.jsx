import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

export default function ProtectedRoute() {
  const { authUser } = useAppContext();
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
}
