import { Box, Flex, IconButton } from '@chakra-ui/react';
import { IdCardIcon, ListBulletIcon } from '@radix-ui/react-icons';

interface CourseFilterProps {
	handleListView: () => void;
	listView: boolean;
}

const CourseFilter = ({ handleListView, listView }: CourseFilterProps) => {
	return (
		<Flex marginBottom={6} justifyContent="space-between">
			<Box>All</Box>
			<Flex>
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
