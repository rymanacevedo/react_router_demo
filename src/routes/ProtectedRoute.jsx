import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import TestProgressBarMenu from '../components/ui/TestProgressBarMenu';

const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
	const { user } = useAuth();
	if (!isAllowed && !user) {
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<>
<<<<<<< HEAD:src/routes/ProtectedRoute.jsx
			<Header />
			{children ? children : <Outlet />}
=======
			<HeaderNav />
<<<<<<< HEAD:src/routes/ProtectedRoute.jsx
			<TestProgressBarMenu />

			<Box minH="80vh" margin="16px">
				{children ? children : <Outlet />}
			</Box>
>>>>>>> 852b1f17f (Feat: completed ui for progress bar):main/src/routes/ProtectedRoute.jsx
=======
			<Box minH="80vh">{children ? children : <Outlet />}</Box>
>>>>>>> 44b1afbb3 (Feat: create learning view route, create learning view component, added pop over to test progress bar):main/src/routes/ProtectedRoute.jsx
			<Footer />
		</>
	);
};
export default ProtectedRoute;
