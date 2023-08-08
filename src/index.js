import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import { ampTheme } from './css/theme';
import './css/index.css';
import './i18n';
import Fonts from './components/ui/Fonts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider theme={ampTheme}>
				<ThemeProvider theme={ampTheme}>
					<Fonts />
					<RouterProvider router={router} />
				</ThemeProvider>
			</ChakraProvider>
		</ReduxProvider>
	</StrictMode>,
);
