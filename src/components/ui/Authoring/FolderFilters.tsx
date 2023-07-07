import {
	Flex,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Text,
	Input,
	Textarea,
	Link,
} from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link as RouterLink, Form } from 'react-router-dom';

const FolderFilters = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="flex-start" gap={6}>
				<Link as={RouterLink} variant="navLink" to="/authoring">
					All
				</Link>
				<Text borderBottom="2px solid">Folders</Text>
			</Flex>
			<Flex alignItems="center" gap={6}>
				<Button variant="ampOutline" leftIcon={<PlusIcon />} onClick={onOpen}>
					New Folder
				</Button>
			</Flex>
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
		</Flex>
	);
};

export default FolderFilters;
