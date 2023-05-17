import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { getUser } from '../utils/user';
import { User } from '../services/user';

type AuthType = {
	auth: {
		user: User | null;
		state: object | null;
	};
	setAuth: (auth: any) => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState({
		user: getUser(),
		state: null,
	});

	const value = useMemo(
		() => ({
			auth,
			setAuth,
		}),
		[auth, setAuth],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
