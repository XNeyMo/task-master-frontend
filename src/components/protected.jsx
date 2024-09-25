import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function Protected() {
	const { user, isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Navigate to="/auth" replace />;

	return (
		<Outlet />
	)
}
