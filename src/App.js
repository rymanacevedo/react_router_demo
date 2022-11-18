import React from 'react';
import './css/App.css';
import LoginWrapper from './components/login/LoginWrapper';
import LoginForm from './components/login/LoginForm';

import { Route, Routes } from 'react-router-dom';
import Page from './components/pages/Page';
import MultiFactor from './components/login/MultiFactor';
import SignUp from './components/login/SignUp';
import Register from './components/self-registration/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import ForgotPassword from './components/login/ForgotPassword';
import ForgotUsername from './components/login/ForgotUsername';

function App() {
	const { user } = useAuth();
	return (
		<>
			<Routes>
				<Route path="/login" element={<LoginWrapper />}>
					<Route index element={<LoginForm />} />
				</Route>
				<Route path="/ForgotPassword" element={<LoginWrapper />}>
					<Route index element={<ForgotPassword />} />
				</Route>
				<Route path="/ForgotUsername" element={<LoginWrapper />}>
					<Route index element={<ForgotUsername />} />
				</Route>

<<<<<<< HEAD:src/App.js
				<Route path="/MultiFactor" element={<MultiFactor />} />
				<Route path="/signup">
=======
				<Route path="/MultiFactor" element={<LoginWrapper />}>
					<Route index element={<MultiFactor />} />
				</Route>
				<Route
					path="/signup/:abbrevName/:userAltKey"
					element={<LoginWrapper />}>
					<Route index element={<SignUp />} />
				</Route>
				<Route path="/signup" element={<LoginWrapper />}>
>>>>>>> 03b8c1f30 (lint fix):main/src/App.js
					<Route index element={<SignUp />} />
				</Route>

				<Route path="/register" element={<Register />} />
				<Route path="/" element={<ProtectedRoute isAllowed={!!user} />}>
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
					<Route
						path="learning"
						element={
							<Page
								id={'learning-dash-main'}
								header={'Learning'}
								content={'under construction'}
							/>
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
