import { User } from '../../services/user';
import { Button, IconButton, MenuButton, Text } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

type Props = {
	largerThan992: boolean;
	user: User;
};
export default function CustomMenuButton({ largerThan992, user }: Props) {
	return largerThan992 ? (
		<MenuButton
			as={Button}
			_hover={{}}
			color={'ampWhite'}
			padding="25px"
			height="60px"
			id="header-composite-profile-button"
			rightIcon={<ChevronDownIcon />}>
			{' '}
			<Text
				display={['none', 'none', 'none', 'flex', 'flex', 'flex']}
				textDecoration="none"
				fontWeight="bold">
				{' '}
				{`${user.firstName} ${user.lastName}`}{' '}
			</Text>{' '}
		</MenuButton>
	) : (
		<MenuButton
			as={IconButton}
			icon={<HamburgerMenuIcon />}
			_hover={{}}
			color={'ampWhite'}
			padding="25px"
			height="75px"
			id="header-composite-profile-button">
			{' '}
			<Text
				display={['none', 'none', 'none', 'flex', 'flex', 'flex']}
				textDecoration="none"
				fontWeight="bold">
				{' '}
				{`${user.firstName} ${user.lastName}`}{' '}
			</Text>{' '}
		</MenuButton>
	);
}
