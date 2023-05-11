import { Suspense, useEffect } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { AuthenticationData } from '../routes/Root';

export default function Authenticate() {
	const navigate = useNavigate();
	const { redirectTo } = useRouteLoaderData('root') as AuthenticationData;
	useEffect(() => {
		navigate(`/${redirectTo}`);
	}, []);
	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			{/*TODO: add an error component from Remix in case auth fails*/}
		</Suspense>
	);
}
