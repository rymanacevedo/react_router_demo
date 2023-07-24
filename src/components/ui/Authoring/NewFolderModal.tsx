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
} from '@chakra-ui/react';
import { Form } from 'react-router-dom';

interface NewFolderModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const NewFolderModal = ({ isOpen, onClose }: NewFolderModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
			<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
			<ModalContent>
				<ModalHeader>
					<Text as="h3">Create New Folder</Text>
				</ModalHeader>
				<ModalBody>
					<Form method="post">
						<Text as="label" display="block" mb={6}>
							Folder Name
							<Input placeholder="Name" name="name" />
						</Text>
						<Text as="label" display="block" mb={6}>
							Folder Description
							<Textarea placeholder="Description" name="description" />
						</Text>
						<Button
							type="submit"
							name="intent"
							value="createFolder"
							onClick={onClose}
							marginRight={4}>
							Create
						</Button>
						<Button variant="ampOutline" onClick={onClose}>
							Cancel
						</Button>
					</Form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewFolderModal;
