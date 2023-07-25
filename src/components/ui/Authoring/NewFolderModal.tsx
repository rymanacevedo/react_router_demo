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
import { useRevalidator } from 'react-router-dom';
import { createFolder } from '../../../store/slices/authoring/foldersSlice';
import { AppDispatch } from '../../../store/store';

interface NewFolderModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const NewFolderModal = ({ isOpen, onClose }: NewFolderModalProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const toast = useToast();
	const { revalidate } = useRevalidator();

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
			const { statusCode } = payload as {
				statusCode: number;
			};

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
