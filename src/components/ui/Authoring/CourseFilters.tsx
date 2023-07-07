import { Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { IdCardIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Link as RouterLink } from 'react-router-dom';

interface CourseFilterProps {
	handleListView: () => void;
	listView: boolean;
}

const CourseFilter = ({ handleListView, listView }: CourseFilterProps) => {
	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Flex alignItems="flex-start" gap={6}>
				<Text borderBottom="2px solid" fontWeight="normal">
					All
				</Text>
				<Link as={RouterLink} variant="navLink" to="/authoring/folders">
					Folders
				</Link>
			</Flex>
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
	);
};

export default CourseFilter;
