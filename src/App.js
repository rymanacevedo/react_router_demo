import React, { useState } from 'react';
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
import QuizContext from './components/pages/AssignmentView/QuizContext';

function App() {
	const { user } = useAuth();
	const [message, setMessage] = useState({
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0,
	});

	const handleMessage = (messageType, reset) => {
		switch (messageType) {
			case 'FIVE_FAST_ANSWERS':
				if (reset) {
					setMessage({
						...message,
						FIVE_FAST_ANSWERS: 0,
					});
				} else {
					setMessage({
						...message,
						FIVE_FAST_ANSWERS: message.FIVE_FAST_ANSWERS + 1,
					});
					if (message.FIVE_FAST_ANSWERS === 5) {
						setMessage({
							...message,
							FIVE_FAST_ANSWERS: 0,
						});
					}
				}
				break;
			case 'FIVE_CONSEC_SI':
				// handle FIVE_CONSEC_SI case
				break;
			case 'SIX_DK_IN_ROUND':
				// handle SIX_DK_IN_ROUND case
				break;
			case 'FIVE_CONSEC_SC':
				// handle FIVE_CONSEC_SC case
				break;
			default:
			// handle default case
		}
	};

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
					<Route
						path="learning/assignment/:assignmentKey"
						element={
							<QuizContext.Provider value={{ message, handleMessage }}>
								<AssignmentView />
							</QuizContext.Provider>
						}
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
					<Route
						path="courses"
						element={
							<Page
								id={'courses'}
								header={'Courses'}
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
