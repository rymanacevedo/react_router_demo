import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Draggable } from 'react-beautiful-dnd';
import RichContentComponent from './RichContentComponent';
type OptionType = {
	publishedOptionId: string | number | null;
	optionRc: string | null;
};

type DragItemProps = {
	index: number;
	option: OptionType;
	keyToUse: string;
	draggableId: string;
};

const DragItem = ({ index, option, keyToUse }: DragItemProps) => {
	return (
		<Draggable key={keyToUse} draggableId={keyToUse} index={index}>
			{(provided) => (
				<Flex
					bgGradient="linear(to-b, ampWhite 74.71%, #E5E5E6 100% )"
					border="1.5px solid rgba(37, 124, 181, 0.60)"
					borderRadius="md"
					//maxH="200px"
					minH="48px"
					h="auto"
					mb={4}
					paddingLeft={4}
					paddingRight={6}
					py={2.5}
					w="366px"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<HStack>
						<Icon
							w={6}
							h={6}
							color="ampSecondary.500"
							as={DragHandleDots2Icon}
						/>
						<Text as="div" color="ampSecondary.500" fontSize="lg">
							{<RichContentComponent content={option.optionRc} />}
						</Text>
					</HStack>
				</Flex>
			)}
		</Draggable>
	);
};

export default DragItem;
