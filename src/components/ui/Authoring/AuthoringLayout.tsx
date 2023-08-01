import { Children, PropsWithChildren, ReactNode } from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import ScrollToTop from './ScrollToTop';

interface AuthoringLayoutProps {
	stacked?: boolean;
	hasNavigation?: ReactNode; // ie, the first child is to be formatted differently
}

const AuthoringLayout = ({
	stacked = false,
	hasNavigation = false,
	children,
}: PropsWithChildren<AuthoringLayoutProps>) => {
	let stack = Children.toArray(children);
	let navigation = hasNavigation && stack.shift();
	return (
		<>
			<ScrollToTop />
			<Box bg="ampNeutral.100" minHeight="100vh" paddingX="6" paddingY="6">
				{stacked ? (
					<VStack gap="6">
						{navigation && (
							<Container
								maxW="1440"
								bg="ampWhite"
								borderRadius="xl"
								paddingY={4}
								paddingX={6}>
								{navigation}
							</Container>
						)}
						{stack.map((child) => {
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
					<>
						{navigation && (
							<Container
								maxW="1440"
								bg="ampWhite"
								borderRadius="xl"
								paddingY={4}
								paddingX={6}>
								{navigation}
							</Container>
						)}
						<Container
							maxW="1440"
							bg="ampWhite"
							borderRadius="xl"
							paddingY="16"
							paddingX="24">
							{stack}
						</Container>
					</>
				)}
			</Box>
		</>
	);
};

export default AuthoringLayout;
