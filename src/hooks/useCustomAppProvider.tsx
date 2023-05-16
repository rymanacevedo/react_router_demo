import { createContext, useContext, useMemo } from 'react';
import { User } from '../services/user';
import { useLocalStorage } from './useLocalStorage';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import LoginForm, { loginAction } from '../components/login/LoginForm';
import ForgotPassword from '../components/login/ForgotPassword';
import ForgotUsername from '../components/login/ForgotUsername';
import MultiFactor from '../components/login/MultiFactor';
import SignUp from '../components/login/SignUp';
import Register from '../components/self-registration/Register';
import ProtectedRoute from '../routes/ProtectedRoute';
import Page from '../components/pages/Page';
import LearningView from '../components/pages/LearningView';
import AssignmentReviewView from '../components/pages/AssignmentReviewView/AssignmentReviewView';
import ModuleIntroView from '../components/pages/ModuleIntroView';
import Review from '../components/pages/Review';
import AssignmentView from '../components/pages/AssignmentView/AssignmentView';
import TourView from '../components/pages/TourView';
import AuthLayout from '../components/login/AuthLayout';
import Authenticate from '../routes/Authenticate';
import Root, { rootLoader } from '../routes/Root';
import { AuthProvider } from './useAuth';
import DialogProvider from '../components/DialogProvider';
import { ProgressMenuContextProvider } from './useProgressMenuContext';
import { QuizProvider } from './useQuizContext';

export type CustomAppProviderType = {
	user: User;
	setUser: (user: User) => void;
	state: any;
	setState: (state: any) => void;
};

const CustomAppContext = createContext<CustomAppProviderType | null>(null);

export const CustomAppProvider = () => {
	const [user, setUser] = useLocalStorage('user', null);
	const [state, setState] = useLocalStorage('state', null);

	const routesJSX = (
		<Route
			path="/"
			id="root"
			loader={rootLoader(user)}
			shouldRevalidate={() => {
				return user === null;
			}}
			element={
				<AuthProvider>
					<Root />,
				</AuthProvider>
			}>
			<Route path="/_auth/authenticate" element={<Authenticate />} />
			<Route element={<AuthLayout />}>
				<Route
					path="login"
					action={loginAction(setUser)}
					element={<LoginForm />}
				/>
				<Route path="forgot-password" element={<ForgotPassword />} />
				<Route path="forgot-username" element={<ForgotUsername />} />
				<Route path="mfa" element={<MultiFactor />} />
				<Route path="signup/:abbrevName/:userAltKey" element={<SignUp />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="register" element={<Register />} />
			</Route>

			<Route
				element={
					<DialogProvider>
						<ProgressMenuContextProvider>
							<QuizProvider>
								<ProtectedRoute />
							</QuizProvider>
						</ProgressMenuContextProvider>
					</DialogProvider>
				}>
				<Route
					path="authoring"
					element={
						<Page
							id={'author-dash-main'}
							header={'Authoring'}
							content={'under construction'}
						/>
					}
				/>
				<Route
					path="admin"
					element={
						<Page
							id={'admin-dash-main'}
							header={'Administration'}
							content={'under construction'}
						/>
					}
				/>
				<Route path="learning" element={<LearningView />} />
				<Route
					path="learning/assignmentReview/:assignmentKey"
					element={<AssignmentReviewView />}
				/>
				<Route
					path="learning/moduleIntro/:assignmentKey"
					element={<ModuleIntroView />}
				/>
				<Route path="learning/review/:assignmentKey" element={<Review />} />
				<Route
					path="learning/assignment/:assignmentKey"
					element={<AssignmentView />}
				/>
				<Route
					path="learning/assignment/:assignmentKey/outro"
					element={<ModuleIntroView />}
				/>

				<Route
					path="learning/assignment/:assignmentKey/tour"
					element={<TourView />}
				/>

				<Route
					path="switch-account"
					element={
						<Page
							id={'switch-account'}
							header={'Switch Account'}
							content={'under construction'}
						/>
					}
				/>
				<Route
					path="account"
					element={
						<Page
							id={'account'}
							header={'Account'}
							content={'under construction'}
						/>
					}
				/>
				<Route
					path="reporting"
					element={
						<Page
							id={'reporting'}
							header={'Reporting'}
							content={'under construction'}
						/>
					}
				/>
			</Route>
		</Route>
	);

	const routes = createRoutesFromElements(routesJSX);

	const router = createBrowserRouter(routes, {
		basename: '/main',
		future: {
			v7_normalizeFormMethod: true,
		},
	});

	const value = useMemo(
		() => ({
			user,
			state,
			setUser,
			setState,
		}),
		[user, state, setUser, setState],
	);

	return (
		<CustomAppContext.Provider value={value}>
			<RouterProvider router={router} />
		</CustomAppContext.Provider>
	);
};

export const useCustomApp = () => {
	return useContext(CustomAppContext);
};
