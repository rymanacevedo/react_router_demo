import setupKFState from './utils/initKFState';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ampTheme } from './css/theme';
import './css/index.css';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
import DialogProvider from './components/DialogProvider';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { QuizProvider } from './hooks/useQuizContext';

// Init KF.state
setupKFState();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ChakraProvider theme={ampTheme}>
		<BrowserRouter basename="/main">
			<AuthProvider>
				<DialogProvider>
					<QuizProvider>
						<App />
					</QuizProvider>
				</DialogProvider>
			</AuthProvider>
		</BrowserRouter>
	</ChakraProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
