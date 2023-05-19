import { User, UserSchema } from '../services/user';
import { redirect } from 'react-router-dom';

export function getUser(): User | null {
	try {
		const value = window.localStorage.getItem('user');
		if (value) {
			const user = JSON.parse(value);
			UserSchema.parse(user); // this will throw if the user object does not match the schema
			return user;
		}
		return null;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function requireUser(): User {
	const user = getUser();
	if (!user) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect('/login');
	}
	return user;
}

export function setUser(user: User) {
	return window.localStorage.setItem('user', JSON.stringify(user));
}

export function removeUser() {
	return window.localStorage.removeItem('user');
}
