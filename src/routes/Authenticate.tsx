import { Suspense } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { AuthenticationData } from '../App';
import useEffectOnce from '../hooks/useEffectOnce';
import { setSessionKey } from '../lib/auth/cookies';

export default function Authenticate() {
	const navigate = useNavigate();
	const { redirectTo, user } = useRouteLoaderData('root') as AuthenticationData;
	useEffectOnce(() => {
		setSessionKey(user.sessionKey);
		navigate(`/${redirectTo}`);
	});
	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			{/*TODO: add an error component from Remix in case auth fails*/}
		</Suspense>
	);
}
