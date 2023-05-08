import setupKFState from './utils/initKFState';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ampTheme } from './css/theme';
import './css/index.css';
import App from './App';
import './i18n';
import DialogProvider from './components/DialogProvider';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { QuizProvider } from './hooks/useQuizContext';
import { ProgressMenuContextProvider } from './hooks/useProgressMenuContext';
import Fonts from './components/ui/Fonts';

// Init KF.state
setupKFState();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ChakraProvider theme={ampTheme}>
		<Fonts />
		<BrowserRouter basename="/main">
			<AuthProvider>
				<DialogProvider>
					<ProgressMenuContextProvider>
						<QuizProvider>
							<App />
						</QuizProvider>
					</ProgressMenuContextProvider>
				</DialogProvider>
			</AuthProvider>
		</BrowserRouter>
	</ChakraProvider>,
);
