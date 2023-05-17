import { Box } from '@chakra-ui/react';
import {
	json,
	Outlet,
	useFetcher,
	useLoaderData,
	useLocation,
	useNavigate,
	useRouteLoaderData,
} from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderNav from '../components/HeaderNav';
import { AuthenticationData } from './Root';
import { requireUser } from '../utils/user';
import { getSessionExpiration } from '../services/auth.reactrouter';
import { useEffect, useRef } from 'react';
import SessionDialogComponent from '../components/ui/SessionDialogComponent';

const FIVE_MINUTES = 300000;
export const protectedRouteLoader = async () => {
	const user = requireUser();
	const {
		data: { value: expiration },
	} = await getSessionExpiration(user.sessionKey);
	return json({ user, expiration });
};
const ProtectedRoute = () => {
	const { user, expiration } = useLoaderData() as any;
	const { tabs, permissions } = useRouteLoaderData(
		'root',
	) as AuthenticationData;
	const location = useLocation();
	const { pathname } = location;
	const hasPermission = permissions.includes(pathname.slice(1).split('/')[0]);
	const expirationTimeout = useRef(null) as any;
	const autoTimeout = useRef(null) as any;
	const navigate = useNavigate();
	const fetcher = useFetcher();
	const data = fetcher.data;

	useEffect(() => {
		if (!hasPermission) {
			return navigate('/authenticate');
		}
	}, [permissions]);

	useEffect(() => {
		if (expiration !== null) {
			const now = Date.now();
			const secondsToNext = expiration - now - FIVE_MINUTES;
			const secondsToAutoLogout = expiration - now;

			clearTimeout(expirationTimeout.current);
			clearTimeout(autoTimeout.current);

			expirationTimeout.current = setTimeout(() => {
				fetcher.load('/keep-alive');
			}, secondsToNext);

			autoTimeout.current = setTimeout(() => {
				fetcher.load('/logout');
			}, secondsToAutoLogout);
		}
		return () => {
			clearTimeout(expirationTimeout.current);
			clearTimeout(autoTimeout.current);
		};
	}, [expiration]);

	return (
		<Box bg="#F5F5F5" boxSizing="border-box">
			<HeaderNav user={user} tabs={tabs} />
			<Box minH="80vh" w="100%" boxSizing="border-box">
				<Outlet />
			</Box>
			<SessionDialogComponent
				expiration={expiration}
				isOpen={data ? data.showSessionDialog : false}
				fetcher={fetcher}
			/>
			<Footer />
		</Box>
	);
};
export default ProtectedRoute;
