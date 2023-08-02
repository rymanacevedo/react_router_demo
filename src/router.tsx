import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { appLoader } from './App';
import { AuthProvider } from './hooks/useAuth';
import { logoutAction, logoutLoader } from './routes/Logout';
import { authLayoutLoader } from './components/login/AuthLayout';
import { loginAction, loginLoader } from './components/login/LoginForm';
import { mfaAction, mfaLoader } from './components/login/MultiFactor';
import { forgotPasswordAction } from './components/login/ForgotPassword';
import { forgotUsernameAction } from './routes/ForgotUsername';
import { signupAction, signupLoader } from './routes/SignUp';
import { registerAction } from './routes/Register';
import DialogProvider from './components/DialogProvider';
import { ProgressMenuContextProvider } from './hooks/useProgressMenuContext';
import { QuizProvider } from './hooks/useQuizContext';
import ProtectedRoute, { protectedRouteLoader } from './routes/ProtectedRoute';
import Page from './components/pages/Page';
import { learningLoader } from './routes/LearningView';
import { assignmentReviewLoader } from './components/pages/AssignmentReviewView/AssignmentReviewView';
import { reviewLoader } from './components/pages/Review';
import { assignmentViewLoader } from './components/pages/AssignmentView/AssignmentView';
import { keepAliveAction, keepAliveLoader } from './routes/KeepAlive';
import { reviewViewLoader } from './components/ui/Review/ReviewView';
import TimedAssessment, {
	timedAssessmentLoader,
} from './routes/TimedAssessment';
import { successLoader } from './routes/Success';
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
import { timedAssessmentModuleIntroLoader } from './routes/TimedAssessmentModuleIntro';
import { questionAnswerLoader } from './components/ui/TimedAssessment/AmpBoxWithQuestionAndAnswer';

const routesJSX = (
	<Route
		path="/"
		id="root"
		loader={appLoader}
		lazy={async () => {
			const Module = await import('./App');
			return { Component: Module.default };
		}}>
		<Route
			loader={logoutLoader}
			action={logoutAction}
			id="logout"
			path="/logout"
		/>
		<Route
			path="/keep-alive"
			loader={keepAliveLoader}
			action={keepAliveAction}
		/>
		<Route path="/api/refresher" action={refresherAction} />
		<Route path="/api/timedAssessment" action={timedAssessmentAction} />
		<Route path="/feedback" action={questionFeedbackAction} />
		<Route
			path="/authenticate"
			lazy={async () => {
				const Module = await import('./routes/Authenticate');
				return { Component: Module.default };
			}}
		/>
		<Route
			shouldRevalidate={() => false}
			loader={authLayoutLoader}
			lazy={async () => {
				const Module = await import('./components/login/AuthLayout');
				return { Component: Module.default };
			}}>
			<Route
				path="login"
				loader={loginLoader}
				action={loginAction}
				lazy={async () => {
					const Module = await import('./components/login/LoginForm');
					return { Component: Module.default };
				}}
			/>
			<Route
				loader={mfaLoader}
				action={mfaAction}
				path="mfa"
				lazy={async () => {
					const Module = await import('./components/login/MultiFactor');
					return { Component: Module.default };
				}}
			/>
			<Route
				path="forgot-password"
				action={forgotPasswordAction}
				lazy={async () => {
					const Module = await import('./components/login/ForgotPassword');
					return { Component: Module.default };
				}}
			/>
			<Route
				action={forgotUsernameAction}
				path="forgot-username"
				lazy={async () => {
					const Module = await import('./routes/ForgotUsername');
					return { Component: Module.default };
				}}
			/>
			<Route path="signup/:abbrevName/:userAltKey" loader={preSignUpLoader} />
			<Route
				path="signup"
				action={signupAction}
				loader={signupLoader}
				lazy={async () => {
					const Module = await import('./routes/SignUp');
					return { Component: Module.default };
				}}
			/>
			<Route
				action={registerAction}
				path="register"
				lazy={async () => {
					const Module = await import('./routes/Register');
					return { Component: Module.default };
				}}
			/>
			<Route
				path="success"
				loader={successLoader}
				lazy={async () => {
					const Module = await import('./routes/Success');
					return { Component: Module.default };
				}}
			/>
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
				path="authoring/folder/:folderId/new"
				element={<NewCourseContentView />}
			/>
			<Route
				path="authoring/course/:uid"
				element={<CourseContentView />}
				loader={courseContentLoader}
			/>
			<Route
				path="authoring/folder/:folderId"
				element={<FolderDetailsView />}
				loader={folderDetailsLoader}
			/>
			<Route
				path="authoring/folder/:folderId/:page"
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
			<Route
				loader={learningLoader}
				path="learning"
				lazy={async () => {
					const Module = await import('./routes/LearningView');
					return { Component: Module.default };
				}}>
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
				lazy={async () => {
					const Module = await import(
						'./components/pages/AssignmentReviewView/AssignmentReviewView'
					);
					return { Component: Module.default };
				}}
			/>
			<Route
				loader={reviewViewLoader}
				path="learning/review/:assignmentKey/:questionId"
				lazy={async () => {
					const Module = await import('./components/ui/Review/ReviewView');
					return { Component: Module.default };
				}}
			/>
			<Route
				path="learning/moduleIntro/:assignmentKey"
				lazy={async () => {
					const Module = await import('./components/pages/ModuleIntroView');
					return { Component: Module.default };
				}}
			/>
			<Route
				loader={reviewLoader}
				path="learning/review/:assignmentKey"
				lazy={async () => {
					const Module = await import('./components/pages/Review');
					return { Component: Module.default };
				}}
			/>
			<Route
				loader={assignmentViewLoader}
				path="learning/assignment/:assignmentKey"
				lazy={async () => {
					const Module = await import(
						'./components/pages/AssignmentView/AssignmentView'
					);
					return { Component: Module.default };
				}}
			/>
			<Route
				path="learning/assignment/:assignmentKey/outro"
				lazy={async () => {
					const Module = await import('./components/pages/ModuleIntroView');
					return { Component: Module.default };
				}}
			/>
			<>
				{['learning/assignment/:assignmentKey/tour', 'tour'].map((path) => (
					<Route
						key={path}
						path={path}
						lazy={async () => {
							const Module = await import('./components/pages/TourView');
							return { Component: Module.default };
						}}
					/>
				))}
			</>

			<Route
				loader={timedAssessmentModuleIntroLoader}
				path="learning/timedAssessment/moduleIntro/:assignmentUid"
				lazy={async () => {
					const Module = await import('./routes/TimedAssessmentModuleIntro');
					return { Component: Module.default };
				}}
			/>

			<Route
				loader={timedAssessmentLoader}
				path="learning/timedAssessment"
				element={<TimedAssessment />}
				lazy={async () => {
					const Module = await import('./routes/TimedAssessment');
					return { Component: Module.default };
				}}>
				<Route
					path=":assignmentUid"
					lazy={async () => {
						const Module = await import(
							'./components/ui/TimedAssessment/QuestionCards'
						);
						return { Component: Module.default };
					}}>
					<Route
						path="submission"
						lazy={async () => {
							const Module = await import(
								'./components/ui/TimedAssessment/Submission'
							);
							return { Component: Module.default };
						}}
					/>
					<Route
						loader={questionAnswerLoader}
						path=":questionId"
						lazy={async () => {
							const Module = await import(
								'./components/ui/TimedAssessment/AmpBoxWithQuestionAndAnswer'
							);
							return { Component: Module.default };
						}}
					/>
				</Route>
			</Route>

			<Route
				path="learning/timedAssessment/:assignmentUid/results"
				lazy={async () => {
					const Module = await import('./routes/TimedAssessmentResults');
					return { Component: Module.default };
				}}
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
