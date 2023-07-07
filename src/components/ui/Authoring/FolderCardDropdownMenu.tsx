import {
	IconButton,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

const FolderCardDropdownMenu = () => {
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
			<MenuList zIndex={3}>
				<MenuItem type="submit" name="intent" value="copyNew">
					Duplicate
				</MenuItem>
				<MenuItem>Add Courses</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default FolderCardDropdownMenu;
