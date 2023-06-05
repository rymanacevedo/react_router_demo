import { Box, Text } from '@chakra-ui/react';

export default function Overlay({
	isOpen,
	text,
}: {
	isOpen: boolean | undefined;
	text: string;
}) {
	return (
		<>
			{isOpen ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					position="absolute"
					top={0}
					left={0}
					w="100%"
					h="100%"
					zIndex={100}
					backgroundColor="rgba(0, 0, 0, 0.7)">
					<Text color="white">{text}</Text>
				</Box>
			) : null}
		</>
	);
}
