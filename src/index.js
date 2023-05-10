import setupKFState from './utils/initKFState';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ampTheme } from './css/theme';
import './css/index.css';
import { router } from './App';
import './i18n';
import { RouterProvider } from 'react-router-dom';
import Fonts from './components/ui/Fonts';

// Init KF.state
setupKFState();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ChakraProvider theme={ampTheme}>
		<Fonts />
		<RouterProvider router={router} />
	</ChakraProvider>,
);
