import { requireUser } from '../utils/user';
import { getSession, getSessionExpiration } from '../services/auth.reactrouter';
import { json } from 'react-router-dom';
import { ActionFunction, LoaderFunction } from 'react-router';

export const keepAliveAction: ActionFunction = async () => {
	const user = requireUser();
	const { response } = await getSession(user.sessionKey);
	if (response && response.ok) {
		const {
			data: { value: expiration },
		} = await getSessionExpiration(user.sessionKey);
		return json({ user, expiration });
	}
	return new Error('Session not found');
};

export const keepAliveLoader: LoaderFunction = async () => {
	return json({ showSessionDialog: true });
};
