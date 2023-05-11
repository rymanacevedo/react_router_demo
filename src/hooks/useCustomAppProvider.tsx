import { createContext, useContext, useMemo } from 'react';
import { User } from '../services/user';
import { useLocalStorage } from './useLocalStorage';
import {
	createBrowserRouter,
	RouteObject,
	RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './useAuth';
import Root, { rootLoader } from '../routes/Root';
import Authenticate from '../components/Authenticate';
import LoginWrapper from '../components/login/LoginWrapper';
import LoginForm from '../components/login/LoginForm';
import ForgotPassword from '../components/login/ForgotPassword';
import ForgotUsername from '../components/login/ForgotUsername';
import MultiFactor from '../components/login/MultiFactor';
import SignUp from '../components/login/SignUp';
import Register from '../components/self-registration/Register';
import DialogProvider from '../components/DialogProvider';
import { ProgressMenuContextProvider } from './useProgressMenuContext';
import { QuizProvider } from './useQuizContext';
import ProtectedRoute from '../routes/ProtectedRoute';
import Page from '../components/pages/Page';
import LearningView from '../components/pages/LearningView';
import AssignmentReviewView from '../components/pages/AssignmentReviewView/AssignmentReviewView';
import ModuleIntroView from '../components/pages/ModuleIntroView';
import Review from '../components/pages/Review';
import AssignmentView from '../components/pages/AssignmentView/AssignmentView';
import TourView from '../components/pages/TourView';

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

	const routes: RouteObject[] = [
		{
			path: '/',
			id: 'root',
			element: (
				<AuthProvider>
					<Root />,
				</AuthProvider>
			),
			loader: rootLoader(user),
			children: [
				{
					path: 'authenticate',
					element: <Authenticate />,
				},
				{
					path: '/',
					element: (
						<AuthProvider>
							<LoginWrapper />
						</AuthProvider>
					),
					children: [
						{ path: 'login', element: <LoginForm /> },
						{ path: 'forgot-password', element: <ForgotPassword /> },
						{ path: 'forgot-username', element: <ForgotUsername /> },
						{ path: 'mfa', element: <MultiFactor /> },
						{ path: 'signup/:abbrevName/:userAltKey', element: <SignUp /> },
						{ path: 'signup', element: <SignUp /> },
						{ path: 'register', element: <Register /> },
					],
				},
				{
					path: '/',
					element: (
						<AuthProvider>
							<DialogProvider>
								<ProgressMenuContextProvider>
									<QuizProvider>
										<ProtectedRoute />
									</QuizProvider>
								</ProgressMenuContextProvider>
							</DialogProvider>
						</AuthProvider>
					),
					children: [
						{
							path: 'authoring',
							element: (
								<Page
									id="author-dash-main"
									header="Authoring"
									content="under construction"
								/>
							),
						},
						{
							path: 'admin',
							element: (
								<Page
									id="admin-dash-main"
									header="Administration"
									content="under construction"
								/>
							),
						},
						{ path: 'learning', element: <LearningView /> },
						{
							path: 'learning/assignmentReview/:assignmentKey',
							element: <AssignmentReviewView />,
						},
						{
							path: 'learning/moduleIntro/:assignmentKey',
							element: <ModuleIntroView />,
						},
						{ path: 'learning/review/:assignmentKey', element: <Review /> },
						{
							path: 'learning/assignment/:assignmentKey',
							element: <AssignmentView />,
						},
						{
							path: 'learning/assignment/:assignmentKey/outro',
							element: <ModuleIntroView />,
						},
						{
							path: 'learning/assignment/:assignmentKey/tour',
							element: <TourView />,
						},
						{
							path: 'switch-account',
							element: (
								<Page
									id="switch-account"
									header="Switch Account"
									content="under construction"
								/>
							),
						},
						{
							path: 'account',
							element: (
								<Page
									id="account"
									header="Account"
									content="under construction"
								/>
							),
						},
						{
							path: 'reporting',
							element: (
								<Page
									id="reporting"
									header="Reporting"
									content="under construction"
								/>
							),
						},
					],
				},
			],
		},
	];

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
