import {
	IconButton,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

const CourseCardDropdownMenu = () => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				icon={<DotsVerticalIcon />}
				border="none"
				variant="ghost"
				display="flex"
				zIndex={2}
				right="0px"
				size="xs"
				paddingTop={1}
				paddingBottom={1}>
				{' '}
			</MenuButton>
			<MenuList>
				<MenuItem>Duplicate</MenuItem>
				<MenuItem>Delete</MenuItem>
				<MenuItem>Move</MenuItem>
				<MenuItem>Add to Folder</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default CourseCardDropdownMenu;
