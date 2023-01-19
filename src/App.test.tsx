import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ampTheme } from './css/theme';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import DialogProvider from './components/DialogProvider';
import App from './App';

jest.mock('react-i18next');

beforeEach(() => {
	useTranslation.mockReturnValue({ t: (key: any) => key });
});

test('renders cookiesMessage', () => {
	render(
		<ChakraProvider theme={ampTheme}>
			<BrowserRouter basename="/main">
				<AuthProvider>
					<DialogProvider>
						<App />
					</DialogProvider>
				</AuthProvider>
			</BrowserRouter>
		</ChakraProvider>,
	);

	const linkElement = screen.getByText(/cookiesMessage/i);
	expect(linkElement).toBeInTheDocument();
});
