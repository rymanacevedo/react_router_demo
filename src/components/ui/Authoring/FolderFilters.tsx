import { Flex, Button, Text, Link } from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link as RouterLink, Form } from 'react-router-dom';

const FolderFilters = () => {
	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="flex-start" gap={6}>
				<Link as={RouterLink} variant="navLink" to="/authoring">
					All
				</Link>
				<Text borderBottom="2px solid">Folders</Text>
			</Flex>
			<Flex alignItems="center" gap={6}>
				<Button variant="ampOutline" leftIcon={<PlusIcon />}>
					New Folder
				</Button>
			</Flex>
		</Flex>
	);
};

export default FolderFilters;
