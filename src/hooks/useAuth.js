import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLogoutService from '../services/useLogoutService';
import { Cookies } from 'react-cookie-consent';
<<<<<<< HEAD:src/hooks/useAuth.js
=======
import {
	useGetSessionExpirationService,
	useKeepSessionAliveService,
} from '../services/useSessionService';
>>>>>>> 8b7dcb3cb (added session timeout check, removed idle timer library):main/src/hooks/useAuth.js

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage('user', null);
	const [state, setState] = useLocalStorage('state', null);
	const nav = useNavigate();
	const { logoutService } = useLogoutService();
	const [searchParams] = useSearchParams();
<<<<<<< HEAD:src/hooks/useAuth.js
=======
	const { keepAlive } = useKeepSessionAliveService();
	const { getSessionExpiration } = useGetSessionExpirationService();
	let intervalID;
>>>>>>> 8b7dcb3cb (added session timeout check, removed idle timer library):main/src/hooks/useAuth.js

	const clearKFState = () => {
		window.KF.state.activeSubModule = '';
		delete window.KF.state.feature;
		delete window.KF.state.homeAccountCfg;
		delete window.KF.state.permissions;
		delete window.KF.state.report;
		delete window.KF.state.roles;
		window.KF.state.user = {};
		window.KF.state.user.sessionKey = '';
		delete window.KF.state.userUuid;

		// TODO:
		// "is_demo_acct": false,
		// "pw_max_tries": 5,
		// "pw_min_group": 3,
		// "pw_min_length": 5
	};

	const clearState = () => {
		setUser(null);
		setState(null);
		nav(`/login?abbrevName=${state.homeAccount.acctAbbrevName}`);
		clearKFState();
	};

	const logout = () => {
		logoutService(user.sessionKey).then((response) => {
			if (!response || response.status !== 200) {
				clearState();
				throw response === undefined
					? Error('Network Error')
					: Error(response.statusText);
			}

			clearState();
			clearInterval(intervalID);
			// release our intervalID from the variable
			intervalID = null;
		});
	};

	function scheduleNewCheck(millisToNextCheck, key) {
		if (!intervalID) {
			intervalID = setInterval(() => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				checkExpiration(key);
			}, millisToNextCheck);
		}
	}

	function checkExpiration(key) {
		const sessionExpiration = getSessionExpiration(key);
		sessionExpiration.then((res) => {
			const now = Date.now();
			const millisToNextCheck = res.value - now - 300000;

			if (millisToNextCheck <= 300000) {
				//leaving this in as placeholder for next story
				const conf = window.confirm(
					//prettier-ignore
					'Your session is about to expire. Click \'OK\' to extend your session or \'Cancel\' to log out.',
				);
				if (conf) {
					if (res.value < new Date().getTime()) {
						// if the user clicks ok and session is expired just log them out
						logout();
					} else {
						keepAlive(key);
						clearInterval(intervalID);
						intervalID = null;
						scheduleNewCheck(1500000, key);
					}
				} else {
					logout();
				}
			} else {
				clearInterval(intervalID);
				intervalID = null;
				scheduleNewCheck(millisToNextCheck, key);
			}
		});
	}

	const login = async ({
		initialUserData,
		completeUserData,
		userRoles,
		userAccount,
	}) => {
		window.KF.state.user.sessionKey = initialUserData.sessionKey;
		window.KF.state.user.userKey = initialUserData.userContexts[0].userKey;
		window.KF.state.homeAccount = {};
		window.KF.state.homeAccount.acctKey =
			initialUserData.userContexts[0].accountKey;
		window.KF.state.homeAccount.acctUuid =
			initialUserData.userContexts[0].accountUid;
		window.KF.state.homeAccount.acctFullName =
			initialUserData.userContexts[0].accountName;
		window.KF.state.permissions = [];

		for (let permission of initialUserData.userContexts[0].permissions) {
			window.KF.state.permissions.push({
				account: permission.accountUid,
				name: permission.name,
				applicationArea: permission.applicationArea,
			});
		}

		window.KF.state.userUuid = completeUserData.uid;
		window.KF.state.user.firstName = completeUserData.firstName;
		window.KF.state.user.lastName = completeUserData.lastName;

		window.KF.state.user.roles = userRoles.items.map((role) => {
			return { name: role.name, account: role.accountKey };
		});

		const feature = {};
		if (userAccount.features) {
			for (let userAccountFeature of userAccount.features) {
				feature[userAccountFeature.name] = true;
			}
		}
		window.KF.state.feature = feature;
		window.KF.state.homeAccount.acctAbbrevName = searchParams.get('abbrevName');
		window.KF.state.homeAccount.acctFullName = userAccount.name;
		setUser(window.KF.state.user);
		setState(window.KF.state);
		Cookies.set('session_key', initialUserData.sessionKey, {
			path: '/',
		});
<<<<<<< HEAD:src/hooks/useAuth.js
		nav('/app');
	};

	const logout = () => {
		logoutService(user.sessionKey).then((response) => {
			if (!response || response.status !== 200) {
				clearState();
				throw response === undefined
					? Error('Network Error')
					: Error(response.statusText);
			}

			clearState();
		});
	};
=======
		checkExpiration(initialUserData.sessionKey);
		nav('/app');
	};

>>>>>>> 8b7dcb3cb (added session timeout check, removed idle timer library):main/src/hooks/useAuth.js
	const value = useMemo(
		() => ({
			user,
			state,
			login,
			logout,
		}),
		[user, state],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
