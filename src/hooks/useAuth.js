import {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
	useRef,
} from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLogoutService from '../services/useLogoutService';
import { Cookies } from 'react-cookie-consent';
import {
	useGetSessionExpirationService,
	useKeepSessionAliveService,
} from '../services/useSessionService';
import SessionDialogComponent from '../components/ui/SessionDialogComponent';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage('user', null);
	const [state, setState] = useLocalStorage('state', null);
	const nav = useNavigate();
	const { logoutService } = useLogoutService();
	const [searchParams] = useSearchParams();
	const { keepAlive } = useKeepSessionAliveService();
	const { getSessionExpiration } = useGetSessionExpirationService();
	const [showSessionDialog, setShowSessionDialog] = useState(false);
	const [staySignedIn, setStaySignedIn] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [expiration, setExpiration] = useState(null);
	const FIVE_MINS = 300000;
	const checkExpirationTimeoutRef = useRef(null);
	const autoLogoutTimeoutRef = useRef(null);

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
		const currentState = JSON.parse(localStorage.getItem('state'));
		setUser(null);
		setState(null);
		nav(`/login?abbrevName=${currentState.homeAccount.acctAbbrevName}`);
		clearKFState();
	};

	const logout = () => {
		const currentUser = JSON.parse(localStorage.getItem('user'));
		const key = currentUser.sessionKey;
		logoutService(key).then((response) => {
			if (!response || response.status !== 200) {
				clearState();
				throw response === undefined
					? Error('Network Error')
					: Error(response.statusText);
			}

			clearState();
		});
	};

	const handleCloseSession = () => {
		setShowSessionDialog(false);
		setIsSignedIn(false);
		setStaySignedIn(false);
		setExpiration(null);
		if (user) {
			logout();
		}
	};

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
		setIsSignedIn(true);
		nav('/app');
	};

	const handleStaySignedIn = () => {
		setStaySignedIn(true);
	};

	const getExpiration = () => {
		getSessionExpiration(user.sessionKey).then((res) => {
			setExpiration(res.value);
		});
	};

	const checkExpiration = () => {
		if (expiration !== null && expiration < new Date().getTime()) {
			handleCloseSession();
		}

		const now = Date.now();
		const nextCheck = expiration - now - FIVE_MINS;
		if (nextCheck <= FIVE_MINS) {
			setShowSessionDialog(true);
			setStaySignedIn(false);
		} else {
			getExpiration();
		}
	};

	useEffect(() => {
		if (isSignedIn) {
			getExpiration();
		}
	}, [isSignedIn]);

	useEffect(() => {
		if (expiration !== null) {
			const now = Date.now();
			const secondsToNext = expiration - now - FIVE_MINS;
			const secondsToAutoLogout = expiration - now;

			clearTimeout(checkExpirationTimeoutRef.current);
			clearTimeout(autoLogoutTimeoutRef.current);

			checkExpirationTimeoutRef.current = setTimeout(() => {
				checkExpiration();
			}, secondsToNext);

			autoLogoutTimeoutRef.current = setTimeout(() => {
				handleCloseSession();
			}, secondsToAutoLogout);
		}
		return () => {
			clearTimeout(checkExpirationTimeoutRef.current);
			clearTimeout(autoLogoutTimeoutRef.current);
		};
	}, [expiration]);

	useEffect(() => {
		if (staySignedIn) {
			keepAlive(user.sessionKey).then(() => {
				getExpiration();
			});
			setShowSessionDialog(false);
		}
	}, [staySignedIn]);

	const value = useMemo(
		() => ({
			user,
			state,
			login,
			logout,
		}),
		[user, state],
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
			<SessionDialogComponent
				isOpen={showSessionDialog}
				onClose={() => handleCloseSession()}
				handleStaySignedIn={handleStaySignedIn}
			/>
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
