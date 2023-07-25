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
	useToast,
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { AppDispatch } from '../../../store/store';
import { useRevalidator } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	copyCourse,
	deleteCourse,
	selectCourseActionStatus,
} from '../../../store/slices/authoring/coursesViewSlice';
import { addCourseToFolder } from '../../../store/slices/authoring/foldersSlice';
import {
	enableBulkEditingFolderModal,
	setSelectedCourses,
} from '../../../store/slices/authoring/bulkEditingSlice';

interface CourseCardDropdownMenuProps {
	uid: string;
	isPublished: boolean;
	folderUid?: string;
}

const CourseCardDropdownMenu = ({
	uid,
	isPublished,
	folderUid,
}: CourseCardDropdownMenuProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { copyCourseStatus, deleteCourseStatus } = useSelector(
		selectCourseActionStatus,
	);
	const dispatch = useDispatch<AppDispatch>();
	const revalidator = useRevalidator();
	const toast = useToast();

	const handleAddToFolder = () => {
		dispatch(setSelectedCourses([uid]));
		dispatch(enableBulkEditingFolderModal(true));
	};

	const handleCourseDelete = async () => {
		await dispatch(deleteCourse(uid));

		const deleteError = deleteCourseStatus.status === 'failed';

		toast({
			title: deleteError ? 'Error Deleting Course' : 'Course Deleted',
			status: deleteError ? 'error' : 'success',
			duration: 4000,
		});

		if (!deleteError) {
			revalidator.revalidate();
		}

		onClose();
	};

	const handleCopyCourse = async (shareQuestions: boolean) => {
		await dispatch(
			copyCourse({
				courseUid: uid,
				shareQuestions,
			}),
		).then(async (copiedCourse: any) => {
			if (folderUid) {
				const courseUid = copiedCourse.payload.uid;
				await dispatch(addCourseToFolder({ folderUid, courseUid }));
			}
		});

		const copyError = copyCourseStatus.status === 'failed';

		toast({
			title: copyError ? 'Error Copying Course' : 'Course Copied',
			status: copyError ? 'error' : 'success',
			duration: 4000,
		});

		if (!copyError) {
			revalidator.revalidate();
		}
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
				<MenuItem onClick={() => handleCopyCourse(false)}>
					Copy and create new
				</MenuItem>
				<MenuItem onClick={() => handleCopyCourse(true)}>
					Copy and share questions
				</MenuItem>
				{!isPublished && <MenuItem onClick={onOpen}>Delete</MenuItem>}
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
						<Button onClick={handleCourseDelete}>Delete</Button>
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
