import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import App, { appLoader } from './App';
import { AuthProvider } from './hooks/useAuth';
import Logout, { logoutAction, logoutLoader } from './routes/Logout';
import Authenticate from './routes/Authenticate';
import AuthLayout, { authLayoutLoader } from './components/login/AuthLayout';
import LoginForm, {
	loginAction,
	loginLoader,
} from './components/login/LoginForm';
import MultiFactor, {
	mfaAction,
	mfaLoader,
} from './components/login/MultiFactor';
import ForgotPassword from './components/login/ForgotPassword';
import ForgotUsername from './components/login/ForgotUsername';
import SignUp from './components/login/SignUp';
import Register from './components/self-registration/Register';
import DialogProvider from './components/DialogProvider';
import { ProgressMenuContextProvider } from './hooks/useProgressMenuContext';
import { QuizProvider } from './hooks/useQuizContext';
import ProtectedRoute, { protectedRouteLoader } from './routes/ProtectedRoute';
import Page from './components/pages/Page';
import LearningView from './components/pages/LearningView';
import AssignmentReviewView from './components/pages/AssignmentReviewView/AssignmentReviewView';
import ModuleIntroView from './components/pages/ModuleIntroView';
import Review from './components/pages/Review';
import AssignmentView from './components/pages/AssignmentView/AssignmentView';
import TourView from './components/pages/TourView';
import { keepAliveAction, keepAliveLoader } from './routes/KeepAlive';

const routesJSX = (
	<Route path="/" id="root" loader={appLoader} element={<App />}>
		<Route
			loader={logoutLoader}
			action={logoutAction}
			id={'logout'}
			path="/logout"
			element={<Logout />}
		/>
		<Route
			path="/keep-alive"
			loader={keepAliveLoader}
			action={keepAliveAction}
		/>
		<Route path="/authenticate" element={<Authenticate />} />
		<Route loader={authLayoutLoader} element={<AuthLayout />}>
			<Route
				path="login"
				loader={loginLoader}
				action={loginAction}
				element={<LoginForm />}
			/>
			<Route
				loader={mfaLoader}
				action={mfaAction}
				path="mfa"
				element={<MultiFactor />}
			/>
			<Route path="forgot-password" element={<ForgotPassword />} />
			<Route path="forgot-username" element={<ForgotUsername />} />
			<Route path="signup/:abbrevName/:userAltKey" element={<SignUp />} />
			<Route path="signup" element={<SignUp />} />
			<Route path="register" element={<Register />} />
		</Route>

		<Route
			loader={protectedRouteLoader}
			element={
				<AuthProvider>
					<DialogProvider>
						<ProgressMenuContextProvider>
							<QuizProvider>
								<ProtectedRoute />
							</QuizProvider>
						</ProgressMenuContextProvider>
					</DialogProvider>
				</AuthProvider>
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

			<>
				{['learning/assignment/:assignmentKey/tour', 'tour'].map((path) => (
					<Route key={path} path={path} element={<TourView />} />
				))}
			</>

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

export const router = createBrowserRouter(routes, {
	basename: '/main',
	future: {
		v7_normalizeFormMethod: true,
	},
});