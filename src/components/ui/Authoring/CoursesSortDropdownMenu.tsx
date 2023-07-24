import { Button, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Link as RouterLink } from 'react-router-dom';

interface CoursesSortDropdownMenuProps {
	currentSortOrder: string;
}

const CoursesSortDropdownMenu = ({
	currentSortOrder,
}: CoursesSortDropdownMenuProps) => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				variant="outline"
				height="100%"
				borderRadius="xl"
				fontWeight="normal"
				rightIcon={<ChevronDownIcon />}>
				Sort
			</MenuButton>
			<MenuList zIndex={3}>
				<MenuItem
					as={RouterLink}
					to="/authoring?sort=a"
					isDisabled={currentSortOrder === 'a'}>
					Alphabetical (A-Z)
				</MenuItem>
				<MenuItem
					as={RouterLink}
					to="/authoring?sort=c"
					isDisabled={currentSortOrder === 'c'}>
					Recently Created
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default CoursesSortDropdownMenu;
