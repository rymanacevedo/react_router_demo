import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
	const { user } = useAuth();
	if (!isAllowed && !user) {
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<>
			<Header />
			{children ? children : <Outlet />}
			<Footer />
		</>
	);
};
export default ProtectedRoute;
