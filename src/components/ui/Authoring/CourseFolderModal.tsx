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
import { addCoursesToFolder } from '../../../services/authoring';
import {
	selectFoldersState,
	resetFoldersState,
	setSelectedFolders,
	setSubmittingCourses,
} from '../../../store/slices/authoring/foldersSlice';

const CourseFolderModal = () => {
	const user = requireUser();
	const dispatch = useDispatch();
	const [folders, setFolders] = useState<any>(null);
	const {
		showFolderSelectionModal,
		submittingCourses,
		selectedCourses,
		selectedFolders,
	} = useSelector(selectFoldersState);
	const toast = useToast();

	const addFolders = async () => {
		const {
			data: { items: folderList },
		} = await getFolderList(user, 1, 5);
		setFolders(folderList);
	};

	useEffect(() => {
		if (showFolderSelectionModal) {
			addFolders();
		}
	}, [showFolderSelectionModal]);

	const handleClose = () => {
		dispatch(resetFoldersState());
	};

	const handleCheckboxChange = (values: string[]) => {
		dispatch(setSelectedFolders([...values.map((value) => ({ uid: value }))]));
	};

	const handleAddCoursesToFolder = async () => {
		dispatch(setSubmittingCourses(true));

		await Promise.all(
			selectedFolders.map(async (folder) => {
				const body = {
					items: [...selectedCourses],
				};

				const { response } = await addCoursesToFolder(user, folder.uid, body);

				if (response.status === 201) {
					dispatch(resetFoldersState());
					toast({
						title: 'Succesfully Added Course To Folder',
						status: 'success',
						duration: 4000,
					});
				} else {
					dispatch(resetFoldersState());
					toast({
						title: 'Error Adding Course To Folders',
						status: 'error',
						duration: 4000,
					});
				}
			}),
		);
	};

	return (
		<Modal
			isOpen={showFolderSelectionModal}
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
