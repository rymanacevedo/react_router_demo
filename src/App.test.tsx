import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ampTheme } from './css/theme';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import DialogProvider from './components/DialogProvider';
import App from './App';

test('renders welcomeMessage', async () => {
	render(
		<ChakraProvider theme={ampTheme}>
			<MemoryRouter initialEntries={['/login?abbrevName=automation_10']}>
				<AuthProvider>
					<DialogProvider>
						<App />
					</DialogProvider>
				</AuthProvider>
			</MemoryRouter>
		</ChakraProvider>,
	);

	const welcomeText = screen.getByText(/welcomeMsg/i);
	expect(welcomeText).toBeInTheDocument();
});
