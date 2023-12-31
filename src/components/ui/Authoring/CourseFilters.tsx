import { useEffect } from 'react';
import {
	IdCardIcon,
	ListBulletIcon,
	ChevronRightIcon,
} from '@radix-ui/react-icons';
import {
	Flex,
	IconButton,
	Link,
	Text,
	Button,
	useToast,
	useDisclosure,
} from '@chakra-ui/react';
import {
	Link as RouterLink,
	useSearchParams,
	useNavigate,
	useRevalidator,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CoursesSortDropdownMenu from './CoursesSortDropdownMenu';
import NewFolderModal from './NewFolderModal';
import {
	selectCoursesBulkEditingEnabled,
	enableCoursesBulkEditing,
	setSelectedCourses,
	enableBulkEditingFolderModal,
	setSelectedFolders,
	bulkDeleteCourses,
	selectBulkDeleteStatus,
	addCoursesToFolder,
	selectFolders,
	selectSelectedCourses,
} from '../../../store/slices/authoring/bulkEditingSlice';
import { AppDispatch } from '../../../store/store';
import CoursesFilterButton from './CoursesFilterButton';
import CoursesFilterModal from './CoursesFilterModal';
import CoursesSearchControl from './CoursesSearchControl';
import { updateCourseListSearch } from '../../../store/slices/authoring/coursesViewSlice';

interface CourseFilterProps {
	handleListView: () => void;
	listView: boolean;
	breadCrumb?: string;
	sortOrder: () => string;
	setSortOrder: (value: string) => void;
}

const CourseFilter = ({
	handleListView,
	listView,
	breadCrumb,
	sortOrder,
	setSortOrder,
}: CourseFilterProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { revalidate } = useRevalidator();
	const [searchParams] = useSearchParams();
	const bulkEditingEnabled = useSelector(selectCoursesBulkEditingEnabled);
	const bulkDeleteStatus = useSelector(selectBulkDeleteStatus);
	const selectedFolders = useSelector(selectFolders);
	const selectedCourses = useSelector(selectSelectedCourses);
	const addingToFolderParam = searchParams.get('addToFolder') === 'true';
	const addingToFolder =
		Object.keys(selectedFolders).length > 0 && addingToFolderParam;
	const toast = useToast();
	const {
		isOpen: isNewFolderOpen,
		onOpen: onNewFolderOpen,
		onClose: onNewFolderClose,
	} = useDisclosure();
	const {
		isOpen: isFilterOpen,
		onOpen: onFilterOpen,
		onClose: onFilterClose,
	} = useDisclosure();

	useEffect(() => {
		if (bulkDeleteStatus.error) {
			toast({
				title: bulkDeleteStatus.error,
				status: 'error',
				duration: 4000,
			});
		} else if (bulkDeleteStatus.success) {
			toast({
				title: 'Successfully Deleted Courses',
				status: 'success',
				duration: 4000,
			});
			revalidate();
		}
	}, [bulkDeleteStatus]);

	const handleAddCoursesToSelectedFolder = async () => {
		const folderUid = Object.keys(selectedFolders)[0];
		const { payload } = (await dispatch(addCoursesToFolder(folderUid))) as {
			payload: {
				status?: number;
			};
		};

		if (payload.status === 201) {
			navigate(`/authoring/folder/${folderUid}`);
			toast({
				title: 'Succesfully Added Courses To Folder',
				status: 'success',
				duration: 4000,
			});
		} else {
			toast({
				title: 'Error Adding Courses To Folders',
				status: 'error',
				duration: 4000,
			});
		}
		dispatch(enableCoursesBulkEditing(false));
	};

	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="center" gap={6}>
				{breadCrumb ? (
					<Link
						borderBottom="2px solid"
						borderColor="transparent"
						as={RouterLink}
						variant="navLink"
						to="/authoring">
						All
					</Link>
				) : (
					<Text borderBottom="2px solid" fontWeight="normal">
						All
					</Text>
				)}
				<Flex alignItems="center" gap={1}>
					<Link
						as={RouterLink}
						variant="navLink"
						to="/authoring/folders"
						borderBottom="2px solid"
						borderColor="transparent">
						Folders
					</Link>
					{breadCrumb ? (
						<>
							<ChevronRightIcon />
							<Text borderBottom="2px solid" fontWeight="normal">
								{breadCrumb}
							</Text>
						</>
					) : null}
				</Flex>
			</Flex>
			<Flex gap={3}>
				{bulkEditingEnabled ? (
					<>
						<Button
							onClick={() =>
								addingToFolder
									? handleAddCoursesToSelectedFolder()
									: dispatch(enableBulkEditingFolderModal(true))
							}
							fontWeight="normal"
							height="100%"
							variant="outline"
							isDisabled={selectedCourses.length <= 0}>
							Add to Folder
						</Button>
						{addingToFolder ? null : (
							<>
								<Button
									onClick={onNewFolderOpen}
									fontWeight="normal"
									height="100%"
									variant="outline"
									isDisabled={selectedCourses.length <= 0}>
									Add to New Folder
								</Button>
								<Button
									onClick={() =>
										dispatch(bulkDeleteCourses()).then(() => {
											dispatch(enableCoursesBulkEditing(false));
											dispatch(setSelectedCourses([]));
											dispatch(setSelectedFolders([]));
										})
									}
									fontWeight="normal"
									height="100%"
									variant="outline"
									isDisabled={selectedCourses.length <= 0}>
									Delete
								</Button>
							</>
						)}
						<Button
							marginRight={6}
							onClick={() => {
								dispatch(enableCoursesBulkEditing(false));
								dispatch(setSelectedCourses([]));
							}}
							fontWeight="normal"
							height="100%"
							variant="outline">
							Cancel
						</Button>
					</>
				) : (
					<Button
						onClick={() => dispatch(enableCoursesBulkEditing(true))}
						fontWeight="normal"
						height="100%"
						variant="outline">
						Select
					</Button>
				)}
				<CoursesSearchControl
					onChange={(text: string) => {
						dispatch(updateCourseListSearch({ criteria: text.trim() || null }));
						navigate('/authoring');
					}}
					onClose={() => {
						dispatch(updateCourseListSearch({ criteria: null }));
						navigate('/authoring');
					}}
				/>
				<CoursesFilterButton onClick={onFilterOpen} />
				<CoursesSortDropdownMenu
					sortOrder={sortOrder()}
					setSortOrder={setSortOrder}
				/>
				<Flex alignItems="center" gap={6}>
					<Flex
						border="1px solid"
						borderColor="ampNeutral.200"
						padding={2}
						borderRadius="md">
						<IconButton
							aria-label="Course Card View"
							variant={listView ? 'ghost' : 'ampSolid'}
							height="24px"
							width="30px"
							icon={<IdCardIcon />}
							onClick={handleListView}
						/>
						<IconButton
							aria-label="Course List View"
							variant={listView ? 'ampSolid' : 'ghost'}
							height="24px"
							width="30px"
							onClick={handleListView}
							icon={<ListBulletIcon />}
						/>
					</Flex>
				</Flex>
			</Flex>
			<NewFolderModal
				isOpen={isNewFolderOpen}
				onClose={onNewFolderClose}
				addCourses={true}
			/>
			<CoursesFilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
		</Flex>
	);
};

export default CourseFilter;
