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
import { useDispatch, useSelector } from 'react-redux';
import { getFolderList } from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { CheckIcon } from '@radix-ui/react-icons';
import { selectFoldersState } from '../../../store/slices/authoring/foldersSlice';
import {
	addCoursesToFolder,
	enableBulkEditingFolderModal,
	selectBulkEditingFolderModalEnabled,
	setSelectedFolders,
	selectFolders,
	resetBulkEditingState,
} from '../../../store/slices/authoring/bulkEditingSlice';
import { AppDispatch } from '../../../store/store';

const CourseFolderModal = () => {
	const user = requireUser();
	const dispatch = useDispatch<AppDispatch>();
	const [folders, setFolders] = useState<any>(null);

	const { submittingCourses } = useSelector(selectFoldersState);

	const selectedFolders = useSelector(selectFolders);
	const toast = useToast();
	const bulkEditingFolderModalEnabled = useSelector(
		selectBulkEditingFolderModalEnabled,
	);

	const addFolders = async () => {
		const {
			data: { items: folderList },
		} = await getFolderList(user, 1, 5);
		setFolders(folderList);
	};

	useEffect(() => {
		if (bulkEditingFolderModalEnabled) {
			addFolders();
		}
	}, [bulkEditingFolderModalEnabled]);

	const handleClose = () => {
		dispatch(enableBulkEditingFolderModal(false));
	};

	const handleCheckboxChange = (values: string[]) => {
		dispatch(setSelectedFolders(values));
	};

	const handleAddCoursesToFolder = async () => {
		await Promise.all(
			Object.keys(selectedFolders).map(async (folderUid: string) => {
				const { payload } = (await dispatch(addCoursesToFolder(folderUid))) as {
					payload: {
						status?: number;
					};
				};

				if (payload.status === 201) {
					toast({
						title: 'Succesfully Added Course To Folder',
						status: 'success',
						duration: 4000,
					});
				} else {
					toast({
						title: 'Error Adding Course To Folders',
						status: 'error',
						duration: 4000,
					});
				}
			}),
		);
		dispatch(resetBulkEditingState());
	};

	return (
		<Modal
			isOpen={bulkEditingFolderModalEnabled}
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
						isLoading={submittingCourses}>
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
