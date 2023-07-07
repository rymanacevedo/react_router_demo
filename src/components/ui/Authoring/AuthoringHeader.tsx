import { Heading, Flex, Button, Box } from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';

interface AuthoringHeaderProps {
	filterComponent?: React.ReactNode;
}

const AuthoringHeader = ({ filterComponent }: AuthoringHeaderProps) => {
	return (
		<Box>
			<Flex justifyContent="space-between" marginBottom={10}>
				<Heading>Courses</Heading>
				<Button leftIcon={<PlusIcon />}>New Course</Button>
			</Flex>
			{filterComponent}
		</Box>
	);
};

export default AuthoringHeader;
