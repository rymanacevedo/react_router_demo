import { Box } from '@chakra-ui/react';
import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderNav from '../components/HeaderNav';
import { AuthenticationData } from './Root';
import {
	CustomAppProviderType,
	useCustomApp,
} from '../hooks/useCustomAppProvider';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
	const { user } = useCustomApp() as CustomAppProviderType;
	const { tabs } = useRouteLoaderData('root') as AuthenticationData;
	if (!user) {
		return <Navigate to={redirectPath} replace />;
	}

	return (
		<Box bg="#F5F5F5" boxSizing="border-box">
			<HeaderNav user={user} tabs={tabs} />
			<Box minH="80vh" w="100%" boxSizing="border-box">
				<Outlet />
			</Box>
			<Footer />
		</Box>
	);
};
export default ProtectedRoute;
