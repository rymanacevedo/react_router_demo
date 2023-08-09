import { Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

interface CoursesSearchControlProps {
	onChange: (text: string) => void;
	onClose: () => void;
}

const CoursesSearchControl = ({
	onChange,
	onClose,
}: CoursesSearchControlProps) => {
	const {
		isOpen: isSearchOpen,
		onOpen: onSearchOpen,
		onClose: onSearchClose,
	} = useDisclosure();

	const handleCancel = () => {
		onSearchClose();
		onClose();
	};

	return isSearchOpen ? (
		<Flex
			paddingY={0}
			border="1px solid"
			borderColor="ampNeutral.200"
			borderRadius="md"
			alignItems="center"
			gap={1}
			paddingRight={0}>
			<Input
				variant="ghost"
				height="100%"
				paddingRight={0}
				onChange={(e) => onChange(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === 'Escape') {
						handleCancel();
					}
				}}
				autoFocus={true}
			/>
			<Button variant="ghost" paddingY={2} paddingX={0} onClick={handleCancel}>
				<Cross1Icon width="1rem" height="1rem" fill="ampNeutral.400" />
			</Button>
		</Flex>
	) : (
		<Button variant="outline" height="100%" padding={2} onClick={onSearchOpen}>
			<MagnifyingGlassIcon
				width="1.5rem"
				height="1.5rem"
				fill="ampNeutral.400"
			/>
		</Button>
	);
};

export default CoursesSearchControl;

// END
