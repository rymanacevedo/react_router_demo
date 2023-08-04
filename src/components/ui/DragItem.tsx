import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

type Task = {
	id: number;
	title: string;
};
const DragItem = ({ id, title }: Task) => {
	return (
		<Flex
			bgGradient="linear(to-b, ampWhite 74.71%, #E5E5E6 100% )"
			border="1.5px solid rgba(37, 124, 181, 0.60)"
			borderRadius="md"
			maxH="200px"
			h="48px"
			mb={4}
			paddingLeft={4}
			paddingRight={6}
			py={2.5}
			w="366px"
			data-taskId={id}>
			<HStack>
				<Icon w={6} h={6} color="ampSecondary.500" as={DragHandleDots2Icon} />
				<Text color="ampSecondary.500" fontSize="lg">
					{title}
				</Text>
			</HStack>
		</Flex>
	);
};

export default DragItem;
