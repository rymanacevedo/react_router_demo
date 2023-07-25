import { Children, PropsWithChildren } from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import ScrollToTop from './ScrollToTop';

interface AuthoringLayoutProps {
	stacked?: boolean;
}

const AuthoringLayout = ({
	stacked = false,
	children,
}: PropsWithChildren<AuthoringLayoutProps>) => {
	return (
		<>
			<ScrollToTop />
			<Box bg="ampNeutral.100" minHeight="100vh" paddingX="6" paddingY="6">
				{stacked ? (
					<VStack gap="6">
						{Children.map(children, (child) => {
							return (
								<Container
									maxW="1440"
									bg="ampWhite"
									borderRadius="xl"
									paddingY="16"
									paddingX="24">
									{child}
								</Container>
							);
						})}
					</VStack>
				) : (
					<Container
						maxW="1440"
						bg="ampWhite"
						borderRadius="xl"
						paddingY="16"
						paddingX="24">
						{children}
					</Container>
				)}
			</Box>
		</>
	);
};

export default AuthoringLayout;
