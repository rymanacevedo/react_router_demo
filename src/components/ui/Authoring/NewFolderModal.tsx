import { FormEvent } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalOverlay,
	Button,
	Text,
	Input,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useRevalidator, useNavigate } from 'react-router-dom';
import { createFolder } from '../../../store/slices/authoring/foldersSlice';
import {
	addCoursesToFolder,
	resetBulkEditingState,
} from '../../../store/slices/authoring/bulkEditingSlice';
import { AppDispatch } from '../../../store/store';

interface NewFolderModalProps {
	isOpen: boolean;
	onClose: () => void;
	addCourses?: boolean;
}

const NewFolderModal = ({
	isOpen,
	onClose,
	addCourses,
}: NewFolderModalProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const toast = useToast();
	const { revalidate } = useRevalidator();
	const navigate = useNavigate();

	const handleSubmitToast = (statusCode: number) => {
		if (statusCode === 201) {
			toast({
				title: 'Sucessfully Created Folder',
				status: 'success',
				duration: 4000,
			});
		} else {
			toast({
				title: 'Erorr Creating Folder',
				status: 'error',
				duration: 4000,
			});
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { value: name } = e.currentTarget.elements.namedItem(
			'name',
		) as HTMLInputElement;
		const { value: description } = e.currentTarget.elements.namedItem(
			'description',
		) as HTMLInputElement;

		dispatch(createFolder({ name, description })).then(({ payload }) => {
			onClose();
			const { statusCode, folderUid } = payload as {
				statusCode: number;
				folderUid: string | null;
			};
			if (addCourses) {
				if (folderUid)
					dispatch(addCoursesToFolder(folderUid)).then(() => {
						navigate(`/authoring/folder/${folderUid}`);
						dispatch(resetBulkEditingState());
					});
			} else {
				handleSubmitToast(statusCode);
			}
			revalidate();
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
			<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
			<ModalContent>
				<ModalHeader>
					<Text as="h3">Create New Folder</Text>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit}>
						<Text as="label" display="block" mb={6}>
							Folder Name
							<Input placeholder="Name" name="name" />
						</Text>
						<Text as="label" display="block" mb={6}>
							Folder Description
							<Textarea placeholder="Description" name="description" />
						</Text>
						<Button type="submit" marginRight={4}>
							Create
						</Button>
						<Button variant="ampOutline" onClick={onClose}>
							Cancel
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewFolderModal;