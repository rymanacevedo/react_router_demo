import { Center, Flex, Text } from '@chakra-ui/react';

const DropItem = () => {
	return (
		<>
			<Text fontSize="lg" fontWeight="normal" mb={4}>
				Storing Memories Permanently
			</Text>
			<Flex
				bgColor="ampWhite"
				border="1.5px dashed"
				borderColor="ampTertiaryText"
				borderRadius="md"
				maxH="200px"
				h="60px"
				mb={12}
				paddingLeft={4}
				paddingRight={6}
				py={2.5}
				w="398px">
				<Center w="100%">
					<Text
						color="ampTertiaryText"
						fontSize="xs"
						fontWeight="semibold"
						border="2px solid #FBE8AB">
						Drag a selection here
					</Text>
				</Center>
			</Flex>
		</>
	);
};

export default DropItem;
