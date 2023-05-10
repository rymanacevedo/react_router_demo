import { Box } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderNav from '../components/HeaderNav';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
	const { user } = useAuth();
	if (!user) {
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<Box bg="#F5F5F5" boxSizing="border=-box">
			<HeaderNav />
			<Box minH="80vh" w="100%" boxSizing="border=-box">
				{children ? children : <Outlet />}
			</Box>
			<Footer />
		</Box>
	);
};
export default ProtectedRoute;
