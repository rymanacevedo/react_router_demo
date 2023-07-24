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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CoursesSortDropdownMenu from './CoursesSortDropdownMenu';
import {
	selectCoursesBulkEditingEnabled,
	enableCoursesBulkEditing,
	setSelectedCourses,
	enableBulkEditingFolderModal,
	setSelectedFolders,
	bulkDeleteCourses,
	selectBulkDeleteStatus,
} from '../../../store/slices/authoring/bulkEditingSlice';
import { AppDispatch } from '../../../store/store';

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
	const dispatch = useDispatch<AppDispatch>();
	const bulkEditingEnabled = useSelector(selectCoursesBulkEditingEnabled);
	const bulkDeleteStatus = useSelector(selectBulkDeleteStatus);
	const toast = useToast();

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
		}
	}, [bulkDeleteStatus]);

	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="flex-start" gap={6}>
				{breadCrumb ? (
					<Link as={RouterLink} variant="navLink" to="/authoring">
						All
					</Link>
				) : (
					<Text borderBottom="2px solid" fontWeight="normal">
						All
					</Text>
				)}
				<Flex alignItems="center" gap={1}>
					<Link as={RouterLink} variant="navLink" to="/authoring/folders">
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
							onClick={() => dispatch(enableBulkEditingFolderModal(true))}
							fontWeight="normal"
							height="100%"
							variant="outline">
							Add to Folder
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
							variant="outline">
							Delete
						</Button>
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
				<CoursesSortDropdownMenu
					sortOrder={sortOrder()}
					setSortOrder={setSortOrder}
				/>
				<Flex alignItems="center" gap={6}>
					<Flex
						border="1px solid"
						borderColor="ampNeutral.200"
						padding={2}
						borderRadius="xl">
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
		</Flex>
	);
};

export default CourseFilter;
