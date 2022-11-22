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
				<Route path="/" element={<LoginWrapper />}>
					<Route index path="login" element={<LoginForm />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
					<Route path="forgot-username" element={<ForgotUsername />} />
					<Route path="mfa" element={<MultiFactor />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="register" element={<Register />} />
				</Route>
<<<<<<< HEAD:src/App.js
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
<<<<<<< HEAD:src/App.js
					<Route index element={<SignUp />} />
				</Route>
<<<<<<< HEAD:src/App.js
				<Route path="/signup" element={<LoginWrapper />}>
>>>>>>> 03b8c1f30 (lint fix):main/src/App.js
					<Route index element={<SignUp />} />
				</Route>
=======
					<Route index element={<SignUp />} />
				</Route>
				<Route path="/signup" element={<LoginWrapper />}>
					<Route index element={<SignUp />} />
				</Route>
>>>>>>> 03b8c1f30 (lint fix):main/src/App.js

				<Route path="/register" element={<Register />} />
=======
				<Route path="/register" element={<LoginWrapper />}>
					<Route index element={<Register />} />
				</Route>
>>>>>>> 5a1bf56e7 (WIP lint fix):main/src/App.js
				<Route path="/" element={<ProtectedRoute isAllowed={!!user} />}>
=======

				{/*<Route*/}
				{/*	path="/signup/:abbrevName/:userAltKey"*/}
				{/*	element={<LoginWrapper />}>*/}
				{/*	<Route index element={<SignUp />} />*/}
				{/*</Route>*/}

				{/*<Route path="/signup" element={<LoginWrapper />}>*/}
				{/*	<Route index element={<SignUp />} />*/}
				{/*</Route>*/}

				{/*<Route path="/register" element={<LoginWrapper />}>*/}
				{/*	<Route index element={<Register />} />*/}
				{/*</Route>*/}

				<Route path="/app" element={<ProtectedRoute isAllowed={!!user} />}>
>>>>>>> 5fb45f968 (updated routing so that protected content goes to /app):main/src/App.js
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
