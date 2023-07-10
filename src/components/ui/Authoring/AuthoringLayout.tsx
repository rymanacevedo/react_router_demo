import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

const AuthoringLayout = ({ children }: { children: ReactNode }) => {
	return (
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
	);
};

export default AuthoringLayout;
