import {
	Button,
	Text,
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
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Form } from 'react-router-dom';
import { useFolderDispatch } from '../../providers/AuthoringFolderProvider';

interface CourseCardDropdownMenuProps {
	uid: string;
	isPublished: boolean;
}

const CourseCardDropdownMenu = ({
	uid,
	isPublished,
}: CourseCardDropdownMenuProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const folderDispatch = useFolderDispatch();

	const handleAddToFolder = () => {
		folderDispatch({
			type: 'ADD_SELECTED_COURSES',
			payload: [{ uid }],
		});
		folderDispatch({
			type: 'SHOW_FOLDER_SELECTION_MODAL',
			payload: true,
		});
	};

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
				<Form method="post">
					<input name="courseId" defaultValue={uid} hidden />
					<MenuItem type="submit" name="intent" value="copyNew">
						Copy and create new
					</MenuItem>
				</Form>
				<Form method="post">
					<input name="courseId" defaultValue={uid} hidden />
					<MenuItem type="submit" name="intent" value="copyShare">
						Copy and share questions
					</MenuItem>
				</Form>
				{!isPublished && <MenuItem onClick={onOpen}>Delete</MenuItem>}
				<MenuItem>Move</MenuItem>
				<MenuItem onClick={handleAddToFolder}>Add to Folder</MenuItem>
			</MenuList>
			<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
				<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
				<ModalContent>
					<ModalHeader>
						<Text as="h3">Are you sure you’d like to delete this course?</Text>
					</ModalHeader>
					<ModalBody>
						This will permanently delete the course and all its contents from
						your account.
					</ModalBody>
					<ModalFooter justifyContent="flex-start" gap={2}>
						<Form method="delete">
							<input name="courseId" defaultValue={uid} hidden />
							<Button
								type="submit"
								name="intent"
								value="delete"
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

export default CourseCardDropdownMenu;