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
import ForgotPassword, {
	forgotPasswordAction,
} from './components/login/ForgotPassword';
import ForgotUsername, { forgotUsernameAction } from './routes/ForgotUsername';
import SignUp, { signupAction, signupLoader } from './routes/SignUp';
import Register, { registerAction } from './routes/Register';
import DialogProvider from './components/DialogProvider';
import { ProgressMenuContextProvider } from './hooks/useProgressMenuContext';
import { QuizProvider } from './hooks/useQuizContext';
import ProtectedRoute, { protectedRouteLoader } from './routes/ProtectedRoute';
import Page from './components/pages/Page';
import LearningView, { learningLoader } from './routes/LearningView';
import AssignmentReviewView, {
	assignmentReviewLoader,
} from './components/pages/AssignmentReviewView/AssignmentReviewView';
import ModuleIntroView from './components/pages/ModuleIntroView';
import Review, { reviewLoader } from './components/pages/Review';
import AssignmentView, {
	assignmentViewLoader,
} from './components/pages/AssignmentView/AssignmentView';
import TourView from './components/pages/TourView';
import { keepAliveAction, keepAliveLoader } from './routes/KeepAlive';
import ReviewView, {
	reviewViewLoader,
} from './components/ui/Review/ReviewView';
import TimedAssessment, {
	timedAssessmentLoader,
} from './routes/TimedAssessment';
import Success, { successLoader } from './routes/Success';
import { questionFeedbackAction } from './routes/QuestionFeedback';
import { preSignUpLoader } from './routes/SignUpLoader';
import AssignmentList, {
	assignmentListLoader,
} from './components/ui/AssignmentList';
import { refresherAction } from './routes/Refresher';
import AuthoringView, {
	authoringLoader,
} from './components/pages/Authoring/AuthoringView';
import CourseProgress from './components/ui/CourseProgress';
import { Flex } from '@chakra-ui/react';
import TimedAssessmentResults from './routes/TimedAssessmentResults';
import FolderView, {
	folderActions,
	folderLoader,
} from './components/pages/Authoring/FoldersView';
import NewCourseContentView from './components/pages/Authoring/NewCourseContentView';
import { timedAssessmentAction } from './routes/api/TimedAssessmentAction';
import CourseContentView, {
	courseContentLoader,
} from './components/pages/Authoring/CourseContentView';
import FolderDetailsView, {
	folderDetailsLoader,
} from './components/pages/Authoring/FolderDetailsView';
import TimedAssessmentModuleIntro from './routes/TimedAssessmentModuleIntro';

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
		<Route path="/api/refresher" action={refresherAction} />
		<Route path="/api/timedAssessment" action={timedAssessmentAction} />
		<Route path="/feedback" action={questionFeedbackAction} />
		<Route path="/authenticate" element={<Authenticate />} />
		<Route
			shouldRevalidate={() => false}
			loader={authLayoutLoader}
			element={<AuthLayout />}>
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
			<Route
				path="forgot-password"
				element={<ForgotPassword />}
				action={forgotPasswordAction}
			/>
			<Route
				action={forgotUsernameAction}
				path="forgot-username"
				element={<ForgotUsername />}
			/>
			<Route path="signup/:abbrevName/:userAltKey" loader={preSignUpLoader} />
			<Route
				path="signup"
				action={signupAction}
				loader={signupLoader}
				element={<SignUp />}
			/>
			<Route action={registerAction} path="register" element={<Register />} />
			<Route path="success" loader={successLoader} element={<Success />} />
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
				element={<AuthoringView />}
				loader={authoringLoader}
			/>
			<Route
				path="authoring/:page"
				element={<AuthoringView />}
				loader={authoringLoader}
			/>
			<Route
				path="authoring/folders"
				element={<FolderView />}
				loader={folderLoader}
				action={folderActions}
			/>
			<Route
				path="authoring/folders/:page"
				element={<FolderView />}
				loader={folderLoader}
				action={folderActions}
			/>
			<Route path="authoring/new" element={<NewCourseContentView />} />
			<Route
				path="authoring/course/:uid"
				element={<CourseContentView />}
				loader={courseContentLoader}
			/>
			<Route
				path="authoring/folder/:id"
				element={<FolderDetailsView />}
				loader={folderDetailsLoader}
			/>
			<Route
				path="authoring/folder/:id/:page"
				element={<FolderDetailsView />}
				loader={folderDetailsLoader}
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
			<Route loader={learningLoader} path="learning" element={<LearningView />}>
				<Route
					loader={assignmentListLoader}
					path=":selectedCourseKey"
					element={
						<Flex>
							<AssignmentList />
							<CourseProgress />
						</Flex>
					}
				/>
			</Route>
			<Route
				path="learning/assignmentReview/:assignmentKey"
				loader={assignmentReviewLoader}
				element={<AssignmentReviewView />}
			/>
			<Route
				loader={reviewViewLoader}
				path="learning/review/:assignmentKey/:questionId"
				element={<ReviewView />}
			/>
			<Route
				path="learning/moduleIntro/:assignmentKey"
				element={<ModuleIntroView />}
			/>
			<Route
				loader={reviewLoader}
				path="learning/review/:assignmentKey"
				element={<Review />}
			/>
			<Route
				loader={assignmentViewLoader}
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
				path="learning/timedAssessment/moduleIntro/:assignmentUid"
				element={<TimedAssessmentModuleIntro />}
			/>

			<Route
				loader={timedAssessmentLoader}
				path="learning/timedAssessment/:assignmentUid"
				element={<TimedAssessment />}
			/>

			<Route
				path="learning/timedAssessment/:assignmentUid/results"
				element={<TimedAssessmentResults />}
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

export const router = createBrowserRouter(routes, {
	basename: '/main',
	future: {
		v7_normalizeFormMethod: true,
	},
});
