import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import ScrollToTop from './ScrollToTop';

const AuthoringLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<ScrollToTop />
			<Box bg="ampNeutral.100" minHeight="100vh" paddingX={6} paddingY={6}>
				<Container
					maxW={1440}
					bg="ampWhite"
					borderRadius="xl"
					paddingY={16}
					paddingX={24}>
					{children}
				</Container>
			</Box>
		</>
	);
};

export default AuthoringLayout;
