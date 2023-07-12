import { useEffect, useState } from 'react';
import { Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react';
import {
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useToast,
} from '@chakra-ui/react';
import { getFolderList } from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { CheckIcon } from '@radix-ui/react-icons';
import {
	useFolderState,
	useFolderDispatch,
} from '../../providers/AuthoringFolderProvider';
import { addCoursesToFolder } from '../../../services/authoring';

const CourseFolderModal = () => {
	const user = requireUser();
	const data = useFolderState();
	const [folders, setFolders] = useState<any>(null);
	const folderDispatch = useFolderDispatch();
	const toast = useToast();

	const addFolders = async () => {
		const {
			data: { items: folderList },
		} = await getFolderList(user, 1, 5);
		setFolders(folderList);
	};

	useEffect(() => {
		if (data?.showFolderSelectionModal === true) {
			addFolders();
		}
	}, [data?.showFolderSelectionModal]);

	const handleClose = () =>
		folderDispatch({
			type: 'RESET',
		});

	const handleCheckboxChange = (values: string[]) =>
		folderDispatch({
			type: 'ADD_SELECTED_FOLDERS',
			payload: values.map((value) => ({ uid: value })),
		});

	const handleAddCoursesToFolder = async () => {
		folderDispatch({
			type: 'SET_SUBMITTING_COURSES',
			payload: true,
		});
		if (data) {
			await Promise.all(
				data.selectedFolders.map(async (folder) => {
					const body = {
						items: [...data.selectedCourses],
					};

					const { response } = await addCoursesToFolder(user, folder.uid, body);

					if (response.status === 201) {
						folderDispatch({
							type: 'RESET',
						});
						toast({
							title: 'Succesfully Added Course To Folder',
							status: 'success',
							duration: 4000,
						});
					} else {
						folderDispatch({
							type: 'RESET',
						});
						toast({
							title: 'Error Adding Course To Folders',
							status: 'error',
							duration: 4000,
						});
					}
				}),
			);
		}
	};

	return (
		<Modal
			isOpen={data ? data.showFolderSelectionModal : false}
			onClose={handleClose}
			isCentered={true}>
			<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
			<ModalContent>
				<ModalHeader>
					<Text marginBottom={4}>Select one or more folders</Text>
				</ModalHeader>
				<ModalBody>
					<CheckboxGroup onChange={handleCheckboxChange}>
						<Flex flexDirection="column" gap={4}>
							{folders?.map((folder: any) => (
								<Checkbox
									icon={<CheckIcon />}
									variant="multiSelectAuthoringBox"
									value={folder.uid}>
									{folder.name}
								</Checkbox>
							))}
						</Flex>
					</CheckboxGroup>
				</ModalBody>
				<ModalFooter justifyContent="flex-start" gap={2}>
					<Button
						variant="ampOutline"
						onClick={handleAddCoursesToFolder}
						isLoading={data ? data.submittingCourses : false}>
						Add
					</Button>
					<Button
						paddingX={0}
						border="none"
						variant="ampOutline"
						onClick={handleClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CourseFolderModal;
