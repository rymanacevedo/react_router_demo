import { Flex, IconButton, Link, Text } from '@chakra-ui/react';
import {
	IdCardIcon,
	ListBulletIcon,
	ChevronRightIcon,
} from '@radix-ui/react-icons';
import { Link as RouterLink } from 'react-router-dom';
import CoursesSortDropdownMenu from './CoursesSortDropdownMenu';

interface CourseFilterProps {
	handleListView: () => void;
	listView: boolean;
	sortOrder: string;
	breadCrumb?: string;
}

const CourseFilter = ({
	handleListView,
	listView,
	sortOrder,
	breadCrumb,
}: CourseFilterProps) => {
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
				<CoursesSortDropdownMenu currentSortOrder={sortOrder} />
				<Flex alignItems="center" gap={6}>
					<Flex
						border="1px solid"
						borderColor="ampNeutral.200"
						padding={2}
						borderRadius="xl">
						<IconButton
							aria-label="Course Card View"
							variant={listView ? 'ghost' : 'ampSolid'}
							icon={<IdCardIcon />}
							onClick={handleListView}
						/>
						<IconButton
							aria-label="Course List View"
							variant={listView ? 'ampSolid' : 'ghost'}
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
