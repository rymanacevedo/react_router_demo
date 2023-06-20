import { Box } from '@chakra-ui/react';

export default function Triangle({ isSelected }: { isSelected: boolean }) {
	return (
		<Box
			position={'absolute'}
			top={0}
			right={0}
			width={'0px'}
			height={'0px'}
			borderStyle={'solid'}
			borderWidth={isSelected ? '0px 9px 9px 0px' : '0px 12px 12px 0px'}
			borderColor={'transparent #2D5172 transparent transparent'}
		/>
	);
}
