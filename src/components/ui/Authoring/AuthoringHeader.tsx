import { Heading, Flex, Button, Box } from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';

interface AuthoringHeaderProps {
	filterComponent?: React.ReactNode;
}

const AuthoringHeader = ({ filterComponent }: AuthoringHeaderProps) => {
	return (
		<Box>
			<Flex justifyContent="space-between" marginBottom={10}>
				<Heading>Courses</Heading>
				<Button
					as={ReactRouterLink}
					to="/authoring/new"
					leftIcon={<PlusIcon />}
					style={{ textDecoration: 'none' }}>
					New Course
				</Button>
			</Flex>
			{filterComponent}
		</Box>
	);
};

export default AuthoringHeader;
