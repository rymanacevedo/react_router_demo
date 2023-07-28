import { FormEvent, useState } from 'react';
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
	const [disabledButton, setDisableButton] = useState(true);

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

		dispatch(createFolder({ name: name.trim(), description })).then(
			({ payload }) => {
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
			},
		);
	};

	const handleClose = () => {
		onClose();
		setDisableButton(true);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} isCentered={true}>
			<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
			<ModalContent>
				<ModalHeader>
					<Text
						fontSize="lg"
						fontWeight="semibold"
						color="ampSecondaryText"
						as="h3">
						Create New Folder
					</Text>
					<Text fontSize="xs" fontWeight="normal">
						Required
						<Text as="span" color="ampError.600">
							*
						</Text>
					</Text>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit}>
						<Text as="label" fontWeight="semibold" display="block" mb={6}>
							Folder Name
							<Text as="span" color="ampError.600">
								*
							</Text>
							<Input
								placeholder="Name"
								name="name"
								onChange={(e) =>
									setDisableButton(e.target.value.trim().length <= 0)
								}
							/>
						</Text>
						<Text as="label" display="block" fontWeight="semibold" mb={6}>
							Folder Description
							<Textarea placeholder="Description" name="description" />
						</Text>
						<Button
							type="submit"
							variant="ampOutline"
							marginRight={4}
							isDisabled={disabledButton}>
							Create
						</Button>
						<Button variant="ampOutline" border="none" onClick={handleClose}>
							Cancel
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewFolderModal;
