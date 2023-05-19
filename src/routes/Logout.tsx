import { redirect } from 'react-router-dom';
import { Suspense } from 'react';
import { getUser, removeUser } from '../utils/user';

export const logoutAction = () => {
	const user = getUser();
	if (user) {
		const accountDomain = user.accountDomain;
		// TODO: error handling if logout fails
		// await logoutSession(user.sessionKey);
		removeUser();
		return redirect(`/login?abbrevName=${accountDomain}`);
	}
	return redirect('/login');
};

export const logoutLoader = async () => {
	const user = getUser();
	if (user) {
		const accountDomain = user.accountDomain;
		// TODO: error handling if logout fails
		// await logoutSession(user.sessionKey);
		removeUser();
		return redirect(`/login?abbrevName=${accountDomain}`);
	}
	return redirect('/login');
};

export default function Logout() {
	return <Suspense fallback={<h1>Logging out...</h1>} />;
}
