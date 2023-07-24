import { Button, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface CoursesSortDropdownMenuProps {
	sortOrder: string;
	setSortOrder: (value: string) => void;
}

const CoursesSortDropdownMenu = ({
	sortOrder,
	setSortOrder,
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
					onClick={() => setSortOrder('a')}
					isDisabled={sortOrder === 'a'}>
					Alphabetical (A-Z)
				</MenuItem>
				<MenuItem
					onClick={() => setSortOrder('c')}
					isDisabled={sortOrder === 'c'}>
					Recently Created
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default CoursesSortDropdownMenu;
