import { Flex, Button, useDisclosure, Text, Link } from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CoursesSortDropdownMenu from './CoursesSortDropdownMenu';
import {
	folderListOrder,
	setFolderListOrder,
} from '../../../lib/authoring/cookies';
import NewFolderModal from './NewFolderModal';

const FolderFilters = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();

	const handleChangeFoldersOrder = (sortOrder: string) => {
		setFolderListOrder(sortOrder);
		navigate('/authoring/folders');
	};

	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="flex-start" gap={6}>
				<Link as={RouterLink} variant="navLink" to="/authoring">
					All
				</Link>
				<Text borderBottom="2px solid">Folders</Text>
			</Flex>
			<Flex alignItems="center" gap={3}>
				<Button variant="ampOutline" leftIcon={<PlusIcon />} onClick={onOpen}>
					New Folder
				</Button>
				<CoursesSortDropdownMenu
					sortOrder={folderListOrder()}
					setSortOrder={handleChangeFoldersOrder}
				/>
			</Flex>
			<NewFolderModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};

export default FolderFilters;
