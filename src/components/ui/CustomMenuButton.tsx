// @ts-nocheck
import { User } from '../../services/user';
import { Button, IconButton, MenuButton, Text } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

type Props = {
	largerThan992: boolean;
	user: User;
};
export default function CustomMenuButton({ largerThan992, user }: Props) {
	return (
		<MenuButton
			as={largerThan992 ? Button : IconButton}
			icon={<HamburgerMenuIcon />}
			_hover={{}}
			color={'ampWhite'}
			padding="25px"
			height="75px"
			id="header-composite-profile-button"
			rightIcon={largerThan992 ? <ChevronDownIcon /> : null}>
			<Text
				display={['none', 'none', 'none', 'flex', 'flex', 'flex']}
				textDecoration="none"
				fontWeight="bold">
				{`${user.firstName} ${user.lastName}`}
			</Text>
		</MenuButton>
	);
}
