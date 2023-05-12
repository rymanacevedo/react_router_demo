import React from 'react';
import './css/App.css';
import LoginWrapper from './components/login/LoginWrapper';
import LoginForm from './components/login/LoginForm';
import { Route, Routes } from 'react-router-dom';
import Page from './components/pages/Page';
import LearningView from './components/pages/LearningView';
import MultiFactor from './components/login/MultiFactor';
import SignUp from './components/login/SignUp';
import Register from './components/self-registration/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import ForgotPassword from './components/login/ForgotPassword';
import ForgotUsername from './components/login/ForgotUsername';
import ModuleIntroView from './components/pages/ModuleIntroView';
import AssignmentView from './components/pages/AssignmentView/AssignmentView';
import AssignmentReviewView from './components/pages/AssignmentReviewView/AssignmentReviewView';
import TourView from './components/pages/TourView';
import Review from './components/pages/Review';

function App() {
	const { user } = useAuth();

	return (
		<>
			<Routes>
				<Route path="/" element={<LoginWrapper />}>
					<Route index path="login" element={<LoginForm />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
					<Route path="forgot-username" element={<ForgotUsername />} />
					<Route path="mfa" element={<MultiFactor />} />
					<Route
						path="signup/:abbrevName/:userAltKey"
						element={<SignUp />}></Route>
					<Route path="signup" element={<SignUp />} />
					<Route path="register" element={<Register />} />
				</Route>

				<Route path="/app" element={<ProtectedRoute isAllowed={!!user} />}>
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
						element={<ModuleIntroView outro />}
					/>

					{['learning/assignment/:assignmentKey/tour', 'tour'].map((path) => (
						<Route path={path} element={<TourView />} key={path} />
					))}
					{/* <Route
						path="learning/assignment/:assignmentKey/tour"
						element={<TourView />}
					/> */}

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
			</Routes>
		</>
	);
}

export default App;
