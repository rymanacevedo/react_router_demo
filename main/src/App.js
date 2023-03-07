import React, { useState } from 'react';
import './css/App.css';
import LoginWrapper from './components/login/LoginWrapper';
import LoginForm from './components/login/LoginForm';

import { Route, Routes } from 'react-router-dom';
import Page from './components/pages/Page';
import LearningView from './components/pages/LearningView';
import AssignmentView from './components/pages/AssignmentView';
import MultiFactor from './components/login/MultiFactor';
import SignUp from './components/login/SignUp';
import Register from './components/self-registration/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import ForgotPassword from './components/login/ForgotPassword';
import ForgotUsername from './components/login/ForgotUsername';
import DataServiceExceptionComponent from './components/ui/DataServiceExceptionComponent';
import DialogContext from './components/DialogProvider';
import ModuleIntroView from './components/pages/ModuleIntroView';

function App() {
	const { user, logout } = useAuth();
	const [showAlert, setShowAlert] = useState(false);

	const handleCloseAlert = () => {
		setShowAlert(false);
		if (user) {
			logout();
		}
	};

	return (
		<>
			<DialogContext.Provider value={{ showAlert, setShowAlert }}>
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
							path="learning/moduleIntro/:assignmentKey"
							element={<ModuleIntroView />}
						/>
						<Route
							path="learning/assignment/:assignmentKey"
							element={<AssignmentView />}
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
			</DialogContext.Provider>
			<DataServiceExceptionComponent
				isOpen={showAlert}
				onClose={() => handleCloseAlert(false)}
			/>
		</>
	);
}

export default App;
