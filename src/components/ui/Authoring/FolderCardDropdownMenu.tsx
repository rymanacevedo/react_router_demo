import {
	IconButton,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Text,
} from '@chakra-ui/react';
import { Form, useNavigate } from 'react-router-dom';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import {
	enableCoursesBulkEditing,
	setSelectedFolders,
} from '../../../store/slices/authoring/bulkEditingSlice';

interface FolderCardDropdownMenuProps {
	uid: string;
}

const FolderCardDropdownMenu = ({ uid }: FolderCardDropdownMenuProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<DotsVerticalIcon />}
				border="none"
				variant="ghost"
				display="flex"
				zIndex={2}
				right="0px"
				size="xs"
				paddingTop={1}
				paddingBottom={1}>
				{' '}
			</MenuButton>
			<MenuList zIndex={3}>
				<MenuItem onClick={onOpen}>Delete</MenuItem>
				<MenuItem>Duplicate</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(enableCoursesBulkEditing(true));
						dispatch(setSelectedFolders([uid]));
						navigate('/authoring?addToFolder=true');
					}}>
					Add Courses
				</MenuItem>
			</MenuList>
			<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
				<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
				<ModalContent>
					<ModalHeader>
						<Text as="h3">Are you sure you’d like to delete this folder?</Text>
					</ModalHeader>
					<ModalBody>This will permanently delete the folder.</ModalBody>
					<ModalFooter justifyContent="flex-start" gap={2}>
						<Form method="delete">
							<input name="folderUid" defaultValue={uid} hidden />
							<Button
								type="submit"
								name="intent"
								value="deleteFolder"
								onClick={onClose}>
								Delete
							</Button>
						</Form>
						<Button variant="ampOutline" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Menu>
	);
};

export default FolderCardDropdownMenu;
