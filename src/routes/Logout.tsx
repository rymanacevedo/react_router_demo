import { redirect } from 'react-router-dom';
import { User } from '../services/user';
import { Dispatch, SetStateAction } from 'react';

export const logoutAction =
	(user: User, setUser: Dispatch<SetStateAction<null>>) => async () => {
		if (user) {
			const accountDomain = user.accountDomain;
			await setUser(null);
			return redirect(`/login?abbrevName=${accountDomain}`);
		}

		throw new Error('User is not logged in');
	};

export const logoutLoader =
	(user: User, setUser: Dispatch<SetStateAction<null>>) => async () => {
		if (user) {
			const accountDomain = user.accountDomain;
			await setUser(null);
			return redirect(`/login?abbrevName=${accountDomain}`);
		}
		return null;
	};
